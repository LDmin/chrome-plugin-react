import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

function injectCustomJs(jsPath = "inject.bundle.js") {
  const temp = document.createElement("script");
  temp.setAttribute("type", "text/javascript");
  temp.src = chrome.extension.getURL(jsPath);
  temp.onload = () => {
    // this.parentNode.removeChild(this);
  };
  document.body.appendChild(temp);
}

chrome.storage.local.get((storedState) => {
  const app = document.createElement("div");
  app.id = "ludongmin-root";
  document.body.appendChild(app);
  ReactDOM.render(<App />, app);
  injectCustomJs(); // 注入自定义JS
});
