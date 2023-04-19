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
// 先在全局注册 (混入已删除
export const preventScroll = function (prevent = true) {
  if (prevent) {
    console.log(1);
    // 给当前页面body元素的classli类名列表中 添加一个overflow-hidden(全局样式)定义在common.css中
    document.body.classList.add("overflow-hidden");
  } else {
    console.log(2);
    document.body.classList.remove("overflow-hidden");
  }
}