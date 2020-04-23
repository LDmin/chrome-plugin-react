import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

function renderApp() {
  const app = document.createElement("div");
  app.id = "ludongmin-root";
  document.body.appendChild(app);
  ReactDOM.render(<App />, app);
}

renderApp();
