declare module '*.svg'
declare module '*.png'
declare module '*.jpg'

interface AnyObject {
  [key: string]: any
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

interface ChromeStorageChange<T = any> {
  newValue?: T
  oldValue?: T
}
