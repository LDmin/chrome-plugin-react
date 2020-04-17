window.ldm = {
  debugger: (timeout = 5) => {
    setTimeout(() => {
      debugger;
    }, timeout * 1000);
  },
};

const aaa: any = {};

const bbb = aaa?.bbb?.vvv;
