---
title: JavaScript loops
date: 2021-04-29
---

## for

## while

## do...while

## forEach

只能使用使用抛出异常的方式跳出 forEach

```javascript
let arr = [1,2,3,4,5];

try {
  arr.forEach(item => {
    // 跳出条件
    if (item === 2) {
      throw new Error('LoopTerminates')
    }
    // ...
    console.log(item)
  })  
} catch (e) {
  if (e.message !== 'LoopTerminates') throw e;
}
```

[JavaScript很简单？那你理解的forEach真的对吗？](https://mp.weixin.qq.com/s?src=11&timestamp=1619683622&ver=3037&signature=lt0X9FS*qSpWineMLVafbT29t15JugPe7UR6oUcNkR-8fd0xwNKxV*4h-mtgeF9UtbGwGyIBEe-zlUtML1cWmeYQN1Ewug4qDvqH7FZRNFUkXa9OGj4v383fFi*POHMe&new=1)

## for...in

## for...of

[Js中for in 和for of的区别](https://mp.weixin.qq.com/s?src=11&timestamp=1619683880&ver=3037&signature=7*qHANfmtUWzMBn8MQjxmeXLOm-Hs1ypRICgTyv44Sxfl38ip1K5lL4m7nvJzrpi9bJO07fpU94jSMA*jAf-PklsVr1soF9-8O3PCXJwCkDtdE5UgOQfmMy89ZNZGCT4&new=1)

## map

## every

## some

## break [label]

## continue [label]

