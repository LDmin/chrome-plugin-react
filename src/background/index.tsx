// 用于页面存数据 key-value
const storage = {};

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
    case "WebAppRequest":
      fetch(request.payload?.url, request?.payload?.fetchOptions)
        .then((res) => {
          if (request?.payload?.requestType === "json") {
            return res.json();
          }
          if (request?.payload?.requestType === "text") {
            return res.text();
          }
          return res;
        })
        .then((res) => sendResponse(res));

      break;
  }
});

// chrome.webRequest.onBeforeRequest.addListener(
//   function (details) {
//     // TODO 同步最新订单(点击购买进行中)
//     const url = details.url
//     const orderIdIndex = url.search("orderId")
//     if (orderIdIndex > 0 && details.type === 'image') {
//       const start = orderIdIndex + 10
//       const end = start + 16
//       const orderId = url.slice(start, end)
//       const orderLinks = `https://trade.aliexpress.com/order_detail.htm?orderId=${parseInt(orderId)}`
//       getAliOrderDetail(orderLinks).then((result) => {
//         const {
//           orderData
//         } = result
//         ajaxRequest(API_PATHS.aliOrderSync, 'post', {
//           orderData
//         }, function (response) {
//           if (response.errorno === 0) {
//             // sendMessageToContentScript({action: 'toast', message: "Order placed successfully. Order numbers synced."})
//           }
//         })
//       })
//     }
//   }, {
//   urls: ["https://gj.mmstat.com/ae.pc_click.statweb_ae_click*"]
// },
//   ["blocking"]
// );
