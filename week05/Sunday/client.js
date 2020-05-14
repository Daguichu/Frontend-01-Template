const net = require("net");

class Request {
  constructor(options) {
    this.method = options.method || "GET";
    this.host = options.host;
    this.port = options.port || 80;
    this.path = options.path || '/';
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

  send(connection){
    return new Promise((resolve, reject) => {
      if(connection){
        connection.write(this.toString());
      }else {
        connection = net.createConnection({ host: this.host, port: this.port }, () => {
          connection.write(this.toString());
        })
      }
      connection.on('data', (data) => {
        resolve(data.toString());
        connection.end();
      })
      connection.on('error', (err) => {
        reject(err);
        connection.end();
      })
    }) 
  }
}

void async function(){
  let request = new Request({
    method: "POST",
    host: "127.0.0.1",
    port: "8088",
    path: '/',
    body: {
      name: "chuchen",
    },
    headers: {
      Foo2: 'test'
    }
  });
  
  let response = await request.send();
  console.log(response);
}();

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
