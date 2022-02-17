import { notification } from 'antd'
import $ from 'jquery'

$(() => {
  if (location.host !== 'blog.csdn.net') return

  notification.info({
    message: '正在处理不能选择的代码...',
    description: '',
  })

  $('#content_views pre code').css({
    'user-select': 'text',
  })

  notification.success({
    message: '完成处理，所有的代码均可选择！',
    description: '',
  })
})
