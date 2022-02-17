import * as uuid from 'uuid'
// const wait = require("wait-to-generate");
import wait from 'wait-to-generate'
import sleep from '../utils/sleep'
import $ from 'jquery'
import { NAMESPACE } from '../constant'

const messageResponse: AnyObject = {}

// 监听content-script.js message 用于交互
window.addEventListener(
  'message',
  async (e) => {
    const { cmd, data, messageId }: MessageData = e.data
    switch (cmd) {
      case NAMESPACE + 'fetch-response':
        if (messageId) {
          messageResponse[messageId] = data.response
        }
      default:
        break
    }
  },
  false
)

// 注入方法
window.min = {
  debugger: async (timeout = 5) => {
    console.log(`debugger倒计时：${timeout}s`)
    await sleep(1000)
    if (timeout > 1) {
      window.min.debugger(timeout - 1)
    } else {
      debugger
    }
  },
  // 请求相关
  fetch: async (url, options = {}) => {
    const messageId = uuid.v4()
    window.postMessage(
      {
        cmd: NAMESPACE + 'fetch-request',
        messageId,
        data: {
          url,
          options,
        },
      },
      '*'
    )

    try {
      const res = await wait(() => messageResponse[messageId])
      delete messageResponse[messageId]
      return res
    } catch (e) {
      return e
    }
  },
  get: (url, options = {}) =>
    window.min.fetch(url, { ...options, method: 'get' }),
  post: (url, data = {}) => window.min.fetch(url, { method: 'post', data }),
  delete: (url) => window.min.fetch(url, { method: 'delete' }),
  // 等待
  sleep,
  // jquery
  jquery: $,
}

// 用于判断是否已完成注入js
$('body').attr(NAMESPACE + 'inject-finish', 'true')
