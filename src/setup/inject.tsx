window.ldm = {
  debugger: (timeout = 5) => {
    setTimeout(() => {
      debugger;
    }, timeout * 1000);
  },
};
