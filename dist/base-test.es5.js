'use strict'

var Base = require('../js/base')

describe('URL test', function () {
  test('query', function () {
    expect(Base.query('hello', '?hello=test')).toBe('test')
    expect(Base.query('hello', '?hello=')).toBe('')
    expect(Base.query('hello', '?hello2=test')).toBe(undefined)
    expect(Base.query('hello', '?hello=test&hello2=3')).toBe('test')
    expect(Base.query('hello', '?hello=&hello2=3')).toBe('')
    expect(Base.query('hello', '?')).toBe(undefined)
    expect(Base.query('hello-test', '?hello-test=test')).toBe('test')
    expect(Base.query('hello/test', '?hello/test=test')).toBe('test')
  })
  test('serialize', function () {
    expect(Base.serialize('kkk')).toBe('not a object')
    expect(Base.serialize({ 'key': 'nickname', 'value': 'hi' })).toBe('?key=nickname&value=hi')
    expect(Base.serialize()).toBe('')
    expect(Base.serialize(['f', 'b', 'c'])).toBe('?0=f&1=b&2=c')
    expect(Base.serialize({ 'key': 'sayhi', 'value': 'hi' })).not.toBe('?key=nickname&value=hi')
  })
  test('getAbsoluteUrl', function () {
    expect(Base.getAbsoluteUrl('/index')).toBe('about:///index')
    expect(Base.getAbsoluteUrl('/index')).not.toBe('about:///hello')
  })
})

describe('DOM test', function () {
  test('$', function () {
    document.body.innerHTML = '<div id="jquery">hey</div>'
    expect(Base.$('#jquery').id).toBe('jquery')
    expect(Base.$('#jquery').innerHTML).toBe('hey')
    expect(Base.$('#nothing')).toBeNull()
  })
  test('removeNode', function () {
    document.body.innerHTML = '<div id="p"><p id="c"></p></div>'
    var p = document.getElementById('p')
    expect(p.nodeName.toLowerCase()).toBe('div')
    var c = document.getElementById('c')
    Base.removeNode(c)
    expect(document.getElementById('c')).toBeNull()
    expect(document.getElementById('p')).not.toBeNull()
    expect(document.getElementById('a')).toBeNull()
    document.body.innerHTML = ''
    expect(document.getElementById('ab')).toBeNull()
  })
  test('insertAfter', function () {
    document.body.innerHTML = '<div id="p"><div id="c"></div></div>'
    var existNode = document.body.querySelector('#c')
    var newNode = document.createElement('div')
    newNode.id = 'n'
    Base.insertAfter(newNode, existNode)
    expect(existNode.nextSibling.id).toBe('n')
    var anotherNewNode = document.createElement('div')
    anotherNewNode.id = 'nn'
    Base.insertAfter(anotherNewNode, existNode)
    expect(existNode.nextSibling.id).toBe('nn')
  })
  test('addClass', function () {
    document.body.innerHTML = '<div class="hihihi"></div>'
    var existNode = document.body.querySelector('.hihihi')
    Base.addClass(existNode, 'yoyoyo')
    expect(existNode.className).toBe('hihihi yoyoyo')
    Base.addClass(existNode, [1, 2])
    expect(existNode.className).toBe('hihihi yoyoyo 1,2')
  })
  test('removeClass', function () {
    document.body.innerHTML = '<div class="hihihi gg 2,3"></div>'
    var existNode = document.body.querySelector('.gg')
    Base.removeClass(existNode, 'gg')
    expect(existNode.className).toBe('hihihi 2,3')
    Base.removeClass(existNode, 'hihihi')
    expect(existNode.className).toBe('2,3')
  })
})

describe('asynchronous test', function () {
  test('debounce', function (done) {
    var total = 0
    var totalWithoutArg = 0
    var debounce = Base.debounce(function () {
      total += 1
      expect(total).toBe(1)
      done()
    }, 300)
    var debounceWithoutArg = Base.debounce(function () {
      totalWithoutArg += 1
      expect(totalWithoutArg).toBe(1)
      done()
    })
    for (var i = 0; i < 10; i++) {
      debounce()
      debounceWithoutArg()
    }
    expect(total).toBe(0)
    expect(totalWithoutArg).toBe(0)
    setTimeout(function () {
      done()
      expect(total).toBe(10)
      expect(totalWithoutArg(10))
    }, 400)
    expect(Base.debounce('abc')).toBe('not a function')
  })
})

describe('array test', function () {
  test('removeItemByIndex', function () {
    expect(Base.removeItemByIndex(1, [1, 2, 3])).toEqual([1, 3])
    expect(Base.removeItemByIndex([1, 2, 3], [1, 2, 3])).toEqual('not a number')
    expect(Base.removeItemByIndex(1, 123)).toEqual('not an array')
  })
})

describe('XSS-input-defence test', function () {
  test('filter', function () {
    expect(Base.filter('<script>alert</script><a href="a.com" onclick="alert(1)">test</a>')).toBe('<a href="a.com" >test</a>')
  })
  test('htmlEncode', function () {
    expect(Base.htmlEncode('<script></script>')).toBe('&lt;script&gt;&lt;/script&gt;')
  })
})
