const net = require("net");
const parser = require("./parser");

class Request {
  constructor(options) {
    this.method = options.method || "GET";
    this.host = options.host;
    this.port = options.port || 80;
    this.path = options.path || "/";
    this.headers = options.headers || {};
    this.body = options.body || {};

    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    if (this.headers["Content-Type"] === "application/json") {
      this.bodyText = JSON.stringify(this.body);
    } else if (
      this.headers["Content-Type"] === "application/x-www-form-urlencoded"
    ) {
      this.bodyText = Object.keys(this.body)
        .map((v) => `${v}=${encodeURIComponent(this.body[v])}`)
        .join("&");
    }

    this.headers["Content-Length"] = this.bodyText.length;
  }

  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers)
  .map((v) => `${v}: ${this.headers[v]}`)
  .join("\r\n")}\r

${this.bodyText}
`;
  }

  send(connection) {
    return new Promise((resolve, reject) => {
      const parse = new ResponseParse();
      if (connection) {
        connection.write(this.toString());
      } else {
        connection = net.createConnection(
          { host: this.host, port: this.port },
          () => {
            connection.write(this.toString());
          }
        );
      }
      connection.on("data", (data) => {
        parse.receive(data.toString());
        if (parse.isFinished) {
          resolve(parse.response);
        }
        // console.log(parse.statusLine);
        // console.log(parse.headers);
        //resolve(data.toString());
        connection.end();
      });
      connection.on("error", (err) => {
        reject(err);
        connection.end();
      });
    });
  }
}

class ResponseParse {
  constructor() {
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_STATUS_BLOCK_END = 6;
    this.WAITING_BODY = 7;

    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = "";
    this.headers = {};
    this.headerName = "";
    this.headerValue = "";
    this.bodyParse = null;
  }

  get isFinished() {
    return this.bodyParse && this.bodyParse.isFinish;
  }

  get response() {
    this.statusLine.match(/HTTP\/1.1 ([0-9+]) ([\s\S]+)/);
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParse.content.join(""),
    };
  }

  receive(string) {
    for (let i = 0, len = string.length; i < len; i++) {
      this.receiveChart(string.charAt(i));
    }
  }

  receiveChart(chart) {
    if (this.current === this.WAITING_STATUS_LINE) {
      if (chart === "\r") {
        this.current = this.WAITING_STATUS_LINE_END;
      } else {
        this.statusLine += chart;
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (chart === "\n") {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_NAME) {
      if (chart === ":") {
        this.current = this.WAITING_HEADER_SPACE;
      } else if (chart === "\r") {
        this.current = this.WAITING_STATUS_BLOCK_END;
        if (this.headers["Transfer-Encoding"] === "chunked") {
          this.bodyParse = new TrunkeBodyParse();
        }
      } else {
        this.headerName += chart;
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) {
      if (chart === " ") {
        this.current = this.WAITING_HEADER_VALUE;
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (chart === "\r") {
        this.current = this.WAITING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue;
        this.headerName = "";
        this.headerValue = "";
      } else {
        this.headerValue += chart;
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (chart === "\n") {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_STATUS_BLOCK_END) {
      if (chart === "\n") {
        this.current = this.WAITING_BODY;
      }
    } else if (this.current === this.WAITING_BODY) {
      this.bodyParse.receiveChar(chart);
    }
  }
}

class TrunkeBodyParse {
  constructor() {
    this.WAITING_LENGTH = 0;
    this.WAITING_LENGTH_LINE_END = 1;
    this.READING_TRUNK = 2;
    this.WAITING_NEW_LENGTH = 3;
    this.WAITING_NEW_LENGTH_END = 4;
    this.length = 0;
    this.content = [];
    this.isFinish = false;
    this.current = this.WAITING_LENGTH;
  }

  receiveChar(char) {
    if (this.current === this.WAITING_LENGTH) {
      if (char === "\r") {
        if (this.length === 0) {
          this.isFinish = true;
        }
        this.current = this.WAITING_LENGTH_LINE_END;
      } else {
        this.length *= 16;
        this.length += parseInt(char, 16);
      }
    } else if (this.current === this.WAITING_LENGTH_LINE_END) {
      if (char === "\n") {
        this.current = this.READING_TRUNK;
      }
    } else if (this.current === this.READING_TRUNK) {
      this.content.push(char);
      this.length--;
      if (this.length === 0) {
        this.current = this.WAITING_NEW_LENGTH;
      }
    } else if (this.current === this.WAITING_NEW_LENGTH) {
      if (char === "\r") {
        this.current = this.WAITING_NEW_LENGTH_END;
      }
    } else if (this.current === this.WAITING_NEW_LENGTH_END) {
      if (char === "\n") {
        this.current = this.WAITING_LENGTH;
      }
    }
  }
}

void (async function () {
  let request = new Request({
    method: "POST",
    host: "127.0.0.1",
    port: "8088",
    path: "/",
    body: {
      name: "chuchen",
    },
    headers: {
      Foo2: "test",
    },
  });

  let response = await request.send();

  let dom = parser.parseHTML(response.body);
})();

// class Response {}
// const client = net.createConnection({ host: "127.0.0.1", port: 8088 }, () => {
//   console.log("connected to server!");
//   let request = new Request({
//     method: "POST",
//     host: "127.0.0.1",
//     port: "8088",
//     path: '/',
//     body: {
//       name: "chuchen",
//     },
//     headers: {
//       Foo2: 'test'
//     }
//   });
//   console.log(request.toString());
//   client.write(request.toString());
// });
// client.on("data", (data) => {
//   console.log(data.toString());
//   client.end();
// });
// client.on("end", () => {
//   console.log("disconnected from server");
// });
