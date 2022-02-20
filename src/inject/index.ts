// const wait = require("wait-to-generate");
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

// 用于判断是否已完成注入js
$('body').attr(NAMESPACE + 'inject-finish', 'true')
