const Base = {}

/**
 * 获取指定的 querystring 中指定 name 的 value
 * @param {String} name
 * @param {String} querystring
 * @return {String|undefined}
 *
 * query('hello', '?hello=js') 结果是 js
 *
 */
Base.query = (name, querystring) => {
  let reg = new RegExp('(?:\\?|&)' + name + '=(.*?)(?:&|$)')
  let ret = reg.exec(querystring) || []

  return ret[1]
}

/**
 * 序列化对象，就是把对象转成 url 字符串
 * @param {Obj} data
 * @return {String}
 *
 * serialize({hello: 'js', hi: 'test'}) 结果是 ''
 */
Base.serialize = (data) => {
  let res = []
  if (!data) {
    return ''
  }
  if (data instanceof Object === false) {
    return 'not a object'
  }
  Object.keys(data).forEach(a => {
    res.push(encodeURIComponent(a) + '=' + encodeURIComponent(data[a]))
  })
  res = res.join('&')
  res = '?' + res
  return res
}

/**
 * 根据选择器查找 DOM
 * 就是模拟 $() ，当然，这里返回元素的 DOM 对象即可
 * @param {String} selector
 * @return {DOM|Null}
 */
Base.$ = (selector) => {
  return document.querySelector(selector)
}

/**
 * 删除 DOM 节点
 * @param {DOM} node
 * @return {DOM}
 */

Base.removeNode = (node) => {
  return node.parentNode.removeChild(node)
}

/**
 * 在 target 节点之后插入 node 节点
 * 类似 $().insertAfter()
 * @param {DOM} node
 * @param {DOM} target
 */
Base.insertAfter = (node, target) => {
  let parent = target.parentNode
  if (parent.lastChild === target) {
    parent.appendChild(node)
  } else {
    parent.insertBefore(node, target.nextSibling)
  }
}

/**
 * 添加类名
 * @param {DOM} node
 * @param {String|Array} className
 */
Base.addClass = (node, className) => {
  node.classList.add(className)
}

/**
 * 移除类名
 * @param {DOM} node
 * @param {String|Array} className
 */
Base.removeClass = (node, className) => {
  node.classList.remove(className)
}

/**
 * 获取绝对路径
 * @param {String} url
 * @return {String}
 *
 * getAbsoluteUrl('/jerojiang') => 'http://imweb.io/jerojiang'
 * 在当前页面获取绝对路径，这里要创建 A 元素，测试用例看你们的了
 */
Base.getAbsoluteUrl = (url) => {
  const a = document.createElement('a')
  a.href = location.protocol + '//' + location.hostname + url
  return a.href
}

/**
 * 防抖动
 * 防抖动函数了啦，有做个这个习题，不清楚回去复习
 */
Base.debounce = (callback, time) => {
  var timer
  time = time || 300 // 给个默认值
  if ((typeof callback === 'function') === false) {
    return 'not a function'
  }
  return function () {
    // 没有 timmer 的时候就生成一个
    // 到时再触发 callback ，即调用一次
    // 以此达到减少调用次数的结果
    if (!timer) {
      timer = setTimeout(() => {
        callback()
        clearTimeout(timer)
        timer = null
      }, time)
    }
  }
}

/**
 *  根据所以移出数组的某一项
 * @param {Number} index
 * @param {Array} arr
 * @return {Array}
 *
 * removeItemByIndex(1, [1,2,3]) => [1, 3]
 */
Base.removeItemByIndex = (index, arr) => {
  if (index === null || index === ' ' || isNaN(index)) {
    return 'not a number'
  }
  if (arr instanceof Array === false) {
    return 'not an array'
  }
  arr.splice(index, 1)
  return arr
}
/**
 * 过滤函数
 * @param {String} str
 */
Base.filter = (str) => {
  let REGEXP_TAG = /<(script|style|iframe)[^<>]*?>.*?<\/\1>/ig // eslint-disable-line
  let REGEXP_ATTR_NAME = /(onerror|onclick)=([\"\']?)([^\"\'>]*?)\2/ig // eslint-disable-line
  return String(str)
    .replace(REGEXP_TAG, '')
    .replace(REGEXP_ATTR_NAME, '')
}
/**
 * 转义 HTML 特殊字符
 * @param {String} str
 */
Base.htmlEncode = (str) => {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

module.exports = Base
