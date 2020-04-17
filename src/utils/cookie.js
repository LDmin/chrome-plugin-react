export function getCookie(cname, cookieStr = null) {
  const name = cname + "=";
  let ca;
  if (cookieStr) {
    ca = cookieStr.split(';');
  } else {
    ca = document.cookie.split(';');
  }
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

export function setCookie(cname, cvalue, seconds) {
  const d = new Date();
  d.setTime(d.getTime() + (seconds * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";";
}