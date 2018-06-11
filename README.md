# elyongwj's js library

Here's elyongwj's js library.

Includes many functions and usecases about URL, DOM, asynchronous, array and XSS-input-defence.:blush:

## Installation
npm publish
You can install with npm:

`$ npm install elyongwj_js_library --save-dev`

## Usage

`$ import Base from 'elyongwj_js_library'`

## Functions

### URL functions

#### query(name,querystring)
* Function for gets the value of the specified name in the specified querystring

`Base.query('hello', '?hello=js') //return 'js'`

#### serialize(data)
* Function for turn the object into a url string

`Base.serialize({hello: 'js', hi: 'test'}) //return '?hello=js&hi=test'`

#### getAbsoluteUrl(url)
* Function for get absolute url

`Base.getAbsoluteUrl('/hhh') //return 'https://gitlab.com/hhh'`


### DOM functions

#### $(selector)
* Function for simulating jQuery

`Base.$(selector) //return {DOM|undefined}`

#### removeNode(node)
* Function for Deleting DOM node

`Base.removeNode(node) //return {DOM}`

#### insertAfter(node)
* Function for inserting the node node after the target node

`Base.insertAfter(node, target) //the node will be inserted in correct position`

#### addClass(node,className)
* Function for add class name

`Base.addClass(node, className) //the classname will be added in correct node`

#### removeClass(node,className)
* Function for remove class name

`Base.removeClass(node, className) //the classname will be deleted in correct node`


### asynchronous functions

#### debounce(callback,time)
* Function for avoiding shake

`Base.debounce(func(),300) //for example, func() will be executed once after actions of definition stop over 300ms`


### array functions

#### removeItemByIndex(index,arr)
* Function for remove item by index

`Base.removeItemByIndex(1, [1, 2, 3]) //return [1, 3]`


### XSS-input-defence functions

#### filter(string)
* function for XSS filter

`Base.filter('<script>alert</script><a href="a.com" onclick="alert(1)">test</a>') // return '<a href="a.com" >test</a>'`

#### htmlEncode(string)
* Function for htmlEncode

`Base.htmlEncode('<script></script>')  // return '&lt;script&gt;&lt;/script&gt;'`