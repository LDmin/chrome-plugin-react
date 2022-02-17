import { extend } from 'umi-request'
import moment from 'moment'
import { DATE_FORMAT, TIME_FORMAT, NAMESPACE } from '../constant'

const umiRequest = extend({
  getResponse: true,
})

// chrome.storage.onChanged.addListener((changes) => {

// })

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // tslint:disable-next-line: prettier
  // tslint:disable-next-line: whitespace
  ;(async () => {
    const { action } = request

    switch (action) {
      case NAMESPACE + 'fetch':
        const req: LdmFetchRequest = request.payload
        let res: RequestResponse | null = null
        let message: string = ''
        try {
          res = await umiRequest(req.url, req.options)
        } catch (e) {
          message = JSON.stringify(e)
        }
        sendResponse({
          messageFrom: 'background',
          message,
          response: res,
        } as LdmFetchResponse)
        break

      case 'chrome.notifications.create':
        const method: string = request.payload
        chrome.notifications.create(
          Math.random() + '', // id
          {
            type: 'progress',
            iconUrl: './assets/icon16.png',
            title: '通知主标题',
            message: '通知副标题',
            contextMessage: '好开心呀，终于会使用谷歌扩展里面的API了！',
            eventTime: Date.now() + 999000,
            progress: 20,
          },

          (id) => {
            console.log(id)
          }
        )
    }
  })()

  // 必须return true才能支持异步
  // tslint:disable-next-line: align
  return true
})
