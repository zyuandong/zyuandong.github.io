---
layout: default
title: 认识JavaScript
---

# 认识JavaScript

## for-in循环

[for-in](http://www.nowamagic.net/librarys/veda/detail/1625)

+ 遍历对象 obj

for(var i in obj) {
	// i 为属性名
	// obj[i] 为具体的值
}

+ 遍历数组 array

不赞成用 `for-in` 遍历数组，如果数组对象已被自定义的功能增强，就可能发生逻辑错误。

for(var i in array) {
	// i 为数组下标
	// array[i] 为具体的值
}

## attachEvent 和 addEventListener

[attachEvent/addEventListener](http://blog.163.com/wangzhengquan85@126/blog/static/36082995201011812341235/)

## undefined和null

[undefined/null](http://www.jb51.net/article/24959.htm)

