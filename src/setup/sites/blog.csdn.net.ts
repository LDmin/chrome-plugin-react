import { message } from 'antd'
import $ from 'jquery'

$(() => {
  if (location.host !== 'blog.csdn.net') return

  message.info('正在处理不能选择的代码...')
  $('#content_views pre code').css({
    'user-select': 'text',
  })
  message.success('完成处理，所有的代码均可选择！')
})
