declare module '*.svg'
declare module '*.png'
declare module '*.jpg'

interface AnyObject {
  [key: string]: any
}

interface Window {
  min: {
    debugger: (timeout?: number) => void,
    fetch: <T = any>(url: string, options?: any) => Promise<LdmFetchResponse<T>>
    get: <T = any>(url: string, options?: any) => Promise<LdmFetchResponse<T>>
    post: <T = any>(url: string, data?: any) => Promise<LdmFetchResponse<T>>
    delete: <T = any>(url: string) => Promise<LdmFetchResponse<T>>
  }
}

interface MessageData<D = any> {
  cmd: string
  messageId?: string
  data?: D
}

interface LdmFetchRequest {
  url: string
  options?: RequestInit
  requestType?: 'json' | 'text'
}

interface RequestResponse<D = any> {
  data: D
  response: Response
}

interface LdmFetchResponse<D = any> {
  messageFrom: string
  message?: string
  response: RequestResponse<D>
}

interface TaskValue {
  id: string
  type: 'notification'
  /**
   * 如果start不为空，则是循环任务
   *
   * @type {string}
   * @memberof Todo
   */
  start?: string
  end: string
  time?: string
}

interface Todo extends TaskValue {
  title: string
  message?: string
  contextMessage?: string
  disabled?: boolean
}

type Todos = Todo[]

interface ChromeStorageChange<T = any> {
  newValue?: T
  oldValue?: T
}

interface Tasks<T = any> {
  [key: string]: {
    task: number
    value: T
  }
}
