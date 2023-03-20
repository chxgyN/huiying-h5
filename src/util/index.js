// 管理js函数
export const debounce = (func, wait = 500) => {
  let timeout;
  return function (event) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.call(this, event);
    }, wait);
  };
}

export const throttle = (cb, wait = 1000 / 60) => {
  let last = 0;
  return function () {
    var now = new Date().getTime();
    if (now - last > wait) {
      cb.call(this);
      last = new Date().getTime();
    }
  }
}

export const preventScroll = function (prevent = true) {
  if (prevent) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
}