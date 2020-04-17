import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

chrome.storage.local.get((storedState) => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const [activeTab] = tabs;
    ReactDOM.render(<App />, document.getElementById("root"));
  });
});
