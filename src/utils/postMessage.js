export default function postMessage(cmd, params) {
  window.postMessage({cmd: cmd, payload: params}, '*');
}
