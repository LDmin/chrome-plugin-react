import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

function sendMessage<D = any>(
  action: string,
  params: any
): Promise<LdmFetchResponse<D>> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action, payload: params }, (response) => {
      resolve(response);
    });
  });
}

function injectCustomJs(jsPath = "inject.bundle.js") {
  const temp = document.createElement("script");
  temp.setAttribute("type", "text/javascript");
  temp.src = chrome.extension.getURL(jsPath);
  document.body.appendChild(temp);
}

chrome.storage.local.get((storedState) => {
  const app = document.createElement("div");
  app.id = "ludongmin-root";
  document.body.appendChild(app);
  ReactDOM.render(<App />, app);
  injectCustomJs(); // 注入自定义JS
});

window.addEventListener(
  "message",
  (e) => {
    // 接收inject.js message
    const { cmd, data, messageId }: MessageData<LdmFetchRequest> = e.data;
    if (data) {
      switch (cmd) {
        case "ludongmin-fetch-request":
          (async () => {
            const res: LdmFetchResponse = await sendMessage(
              "ludongmin-fetch",
              data
            );
            postMessage(
              {
                cmd: "ludongmin-fetch-response",
                messageId,
                data: res,
              },
              "*"
            );
          })();
          break;
      }
    }
  },
  false
);

// 接收来自后台的消息 popup 或者 background
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {});
