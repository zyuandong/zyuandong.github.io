---
title: JavaScript 拷贝
---

场景：修改操作

修改数据时，首先需要将待修改数据 A 回填表单，修改表单过后不提交数据，发现原数据 A 内容也被更改。

解决办法：

将数据 A 拷贝一份为 B，使用数据 B 回填表单。

拷贝方式：

B = {...A} 或者 B = JSON.parse(JSON.stringify(A))

区别：

解构只适用于简单结构的数据，当数据中的某个字段值为复杂类型时，解构不会影响此字段的引用关系，