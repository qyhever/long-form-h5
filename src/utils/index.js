if (!window.requestAnimationFrame) {
  window.requestAnimationFrame =
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (cb) {
      return window.setTimeout(cb, 1000 / 60)
    }
}
/**
 * easeout 缓动动画函数
 * @param  {Number}   position 当前值
 * @param  {Number}   dest     目标值
 * @param  {Number}   rate     缓动比率
 * @param  {Function} callback 缓动结束回调函数：当前位置 和 是否结束
 * @example easeout(window.pageYOffset, 0, 5, val => window.scrollTo(0, val))
 */
export const easeout = (position, dest, rate, callback) => {
  if (position === dest || typeof dest !== 'number') {
    return
  }
  dest = dest || 0
  rate = rate || 2
  function step () {
    position = position + (dest - position) / rate
    if (Math.abs(dest - position) < 1) {
      callback && callback(dest, true)
      return
    }
    callback && callback(position, false)
    requestAnimationFrame(step)
  }
  step()
}
