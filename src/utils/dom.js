const trim = function (string) {
  return (string || '').replace(/\s+/g, '')
}

export function hasClass (el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  }
  return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
}

export function addClass (el, cls) {
  if (!el) return
  let curClass = el.className
  const classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

export function removeClass (el, cls) {
  if (!el || !cls) return
  const classes = cls.split(' ')
  let curClass = ' ' + el.className + ' '

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

export function getScrollTop () {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
}

/**
 * 让任意元素滚动到指定位置
 * @param  {HTMLElement} el     [元素]
 * @param  {Number} from        [开始位置]
 * @param  {Number} to          [结束位置]
 * @param  {Number} duration    使用时间
 * @param  {Function} endCallback 完成后回调
 * @example scrollTo(window, window.pageYOffset, 0, 1000)
 */
export function scrollTo (el, from = 0, to, duration = 500, endCallback) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  function scroll (start, end, step) {
    if (start === end) {
      endCallback && endCallback()
      return
    }

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, step)
}

/**
 * 元素是否在可视区内
 * @param {HTMLElement} element dom元素
 * @param {Number} [y=0] 顶部padding距离
 * @return {Boolean} 结果
 */
export function elementInView (element, y = 0) {
  const rect = element.getBoundingClientRect()

  const yInView = rect.top < window.innerHeight && rect.bottom > y

  const xInView = rect.left < window.innerWidth && rect.right > 0

  return yInView && xInView
}
