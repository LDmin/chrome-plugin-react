export default (callback) => {
  let oldHref = document.location.href;

  window.onload = function () {
    const bodyList = document.querySelector("body");
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;
          /* Changed ! your code here */
          callback(oldHref)
        }
      });
    });
    const config = {
      childList: true,
      subtree: true
    };
    observer.observe(bodyList, config);
  };
}