import sendMessageToBackground from "./sendMessageToBackground";

export default () => {
  window.addEventListener(
    "message",
    (e) => {
      // 接收inject.js message
      const { cmd, data, messageId }: MessageData<LdmFetchRequest> = e.data;
      if (data) {
        switch (cmd) {
          case "ludongmin-fetch-request":
            (async () => {
              const res: LdmFetchResponse = await sendMessageToBackground(
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
};
