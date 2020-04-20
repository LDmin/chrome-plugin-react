import { extend } from "umi-request";

const umiRequest = extend({
  getResponse: true,
});

// 用于页面存数据 key-value
const storage: AnyObject = {};

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { action } = request;

  switch (action) {
    case "setStorage":
      let key = request?.payload?.key;
      const value = request?.payload?.value;
      if (key === undefined || key === null) {
        console.log("setStorage: key is invalid");
        sendResponse(false);
        break;
      }
      storage[key] = value;
      sendResponse(true);
      break;
    case "getStorage":
      key = request?.payload?.key;
      if (key === undefined || key === null) {
        console.log("getStorage: key is invalid");
        sendResponse(null);
        break;
      }
      sendResponse(storage[key]);
      return true;
    case "ludongmin-fetch":
      (async () => {
        const req: LdmFetchRequest = request.payload;
        let res: RequestResponse | null = null;
        let message: string = "";
        try {
          res = await umiRequest(req.url, req.options);
        } catch (e) {
          message = JSON.stringify(e);
        }
        sendResponse({
          messageFrom: "background",
          message,
          response: res,
        } as LdmFetchResponse);
      })();
      break;
  }

  // 必须return true才能支持异步
  return true;
});
