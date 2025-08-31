export function postMessageToParent(message: any) {
  console.log('Sending message:', message)
  if (window.parent) {
    window.parent.postMessage(message, '*')
  }
}
