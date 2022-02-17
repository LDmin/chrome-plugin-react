import sendMessageToBackground from './sendMessageToBackground'
import { NAMESPACE } from 'src/constant'

export default () => {
  window.addEventListener(
    'message',
    (e) => {
      // 接收inject.js message
      const { cmd, data, messageId }: MessageData<LdmFetchRequest> = e.data
      if (data) {
        switch (cmd) {
          case NAMESPACE + 'fetch-request':
            // tslint:disable-next-line: whitespace
            ;(async () => {
              const res: LdmFetchResponse = await sendMessageToBackground(
                NAMESPACE + 'fetch',
                data
              )
              postMessage(
                {
                  cmd: NAMESPACE + 'fetch-response',
                  messageId,
                  data: res,
                },
                '*'
              )
            })()
            // tslint:disable-next-line: align
            break
        }
      }
    },
    false
  )
}
