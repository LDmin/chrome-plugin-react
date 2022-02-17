export default <D = any>(
  action: string,
  params: any
): Promise<LdmFetchResponse<D>> => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action, payload: params }, (response) => {
      resolve(response)
    })
  })
}
