import { extend } from 'umi-request'
import moment from 'moment'
import { DATE_FORMAT, TIME_FORMAT, NAMESPACE } from '../constant'

const umiRequest = extend({
  getResponse: true,
})

// 储存定时任务
const todoTasks: Tasks<Todo> = {}

function handleTask(task: TaskValue) {
  if (task.type === 'notification') {
    const todo = todoTasks[task.id].value
    chrome.notifications.create(todo.id, {
      type: 'basic',
      iconUrl: './assets/icon16.png',
      title: todo.title,
      message: todo.message,
      contextMessage: todo.contextMessage,
    })
  }
}

// create task
function createTask<V extends TaskValue>(tasks: Tasks<V>, task: V) {
  const endms = moment(
    `${task.end} ${task.time}`,
    `${DATE_FORMAT} ${TIME_FORMAT}`
  ).valueOf()
  const nowms = moment().valueOf()

  // 判断任务是否过期
  if (endms < nowms) return
  if (task.start) {
    // tasks[k] = setTimeout(createTask, endms - nowms, k, v)
  } else {
    tasks[task.id] = {
      task: setTimeout(handleTask, endms - nowms, task),
      value: task,
    }
  }
  console.log('tasks update: ', tasks)
}

// 检查todos，创建定时任务
chrome.storage.sync.get({ todos: [] }, (items) => {
  const todos: Todos = items['todos']
  if (!todos.length) return
  todos.forEach((item) => createTask<Todo>(todoTasks, item))
})

chrome.storage.onChanged.addListener((changes) => {
  if (changes.todos) {
    const { newValue }: ChromeStorageChange<Todos> = changes.todos
    if (newValue) {
      // 更新和删除
      for (const [k, v] of Object.entries(todoTasks)) {
        const todo: Todo | undefined = newValue.find((t) => t.id === k)
        if (todo) {
          // 更新值
          v.value = todo
        } else {
          // 删除todos里没存在的值
          clearTimeout(v.task)
          delete todoTasks[k]
        }
      }
      newValue.map((todo) => {
        // 如果tasks不存在就创建
        if (!todoTasks[todo.id]) {
          createTask<Todo>(todoTasks, todo)
        }
      })
      console.log(todoTasks)
    }
  }
})

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
