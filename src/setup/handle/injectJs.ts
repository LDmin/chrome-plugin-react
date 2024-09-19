export default (jsPath: string) => {
  const temp = document.createElement("script");
  temp.setAttribute("type", "text/javascript");
  temp.src = chrome.runtime.getURL(jsPath);
  document.body.appendChild(temp);
};
