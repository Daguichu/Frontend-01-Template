const cssStandard = require("./cssStandard.json");

let iframe = document.createElement("iframe");

// let standards = [];

document.body.innerHTML = "";

document.body.appendChild(iframe);

function happen(element, event) {
  return new Promise((resolve, rejects) => {
    let handler = () => {
      resolve();
      element.removeEventListener(event, handler);
    };
    element.addEventListener(event, handler);
  });
}

void (async function () {
  for (let standard of cssStandard) {
    iframe.src = standard.url;
    console.log(standard.name);
    await happen(iframe, "load");
  }
})();
