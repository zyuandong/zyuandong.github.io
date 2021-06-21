---
title: 制作jQuery插件
category: 技术
tags: [JavaScript, jQuery]
monthLast: true
---

## 1. 分析插件框架

### 1.1. 创建闭包

查看 jQuery 插件，我们经常会看到下面这段熟悉的代码：

```javascript
(functino($) {
  // ......
})(jQuery);
```

这就是插件最常见的一个“外套”，它定义了一个函数，并把 `$` 当做形参，函数定义完成后就把 jQuery 传递进去，立即调用执行。这样我们就能在插件中使用 `$` 这个别名，并且插件里的代码只能为自己的插件服务，闭包外的方法则不能调用。

### 1.2. 配置接口

插件还会提供配置接口，方便使用者设置自己的配置，当然也需要设置默认的配置项，只需要通过 jQuery 的 extend 就可以使用自定义配置项，例如：

`$.extend({}, default, options);`

这里的 `default` 就相当于默认配置项， `options` 则是使用者的自定义配置项，若该项有值就会将默认项覆盖。

### 1.3. 扩展方法

jQuery 提供了两种扩展方法，`jQuery.extend()` 和 `jQuery.fn.extend()`，当然二者也是有区别的。

`jQuery.extend()` - 是对 jQuery 这个类的扩展。

比如常用的去掉字符串首尾空格的方法 `trim()`这样，我们可以通过 `$` 直接调用此方法，如 `$.trim(" Hello, World ")`。

我们就用这种方式扩展一个简单的方法：

```javascript
jQuery.extend({
  say: function () {
    alert('Hello, World');
  }
});
```

这样，我们就可以通过 `$.say();` 这样的方式打印出 `Hello, World` 这个字符串。

`jQuery.fn.extend()` - 其实，这也就是扩展 `jQuery.fn`的方法 ，即 `jQuery.prototype` ，扩展 jQuery 对象的方法。

意思就是 `jQuery.fn.extend` 扩展的方法，只能用到 jQuery 对象上。举例，假如还是扩展了一 `say()` 方法，我们的这样使用 `$("#id").say()`，要这样用 `$.say()` 是会报错误的。

总结一下，`jQuery.extend()` 主要是用来扩展全局函数或者选择器；而制作插件，常常使用的还是 `jQuery.fn.extend()` 方法。

## 2. 插件封装

接着，我们来封装一个轮播图的插件，将之前的理论知识运用到实际生产中。先设定好需要的功能：

- 每隔固定时间，图片就滚动切换；
- 图片切换时，对应的标记也能改变；
- 图片滚动方向默认为从右向左，允许自定义。

接着，我们先创建一个“外套”，包裹整个插件：

```javascript
(function ($) {})(jQuery);
```

还记得，我们需要给插件设置默认的配置项吧，默认配置有：

```javascript
(function ($) {
  var defaults = {
    width: 500,
    height: 200,
    direction: 'left', // 默认的滚动方向
    imgs: [
      {
        src: '', // 图片路径，需要依据自己的情况填写
        link: '' // 图片的链接地址
      },
      {
        src: '',
        link: ''
      }
    ]
  };
})(jQuery);
```

搭建好框架，设置好默认配置项，接着就需要给插件提供对外引用的接口了：

```javascript
(function ($) {
  var defaults = {
    width: 500,
    height: 200,
    direction: 'left', // 默认的滚动方向
    imgs: [
      {
        src: '', // 图片路径，需要依据自己的情况填写
        link: '' // 图片的链接地址
      },
      {
        src: '',
        link: ''
      }
    ]
  };

  // 扩展调用方法名
  $.fn.slideImg = function (options) {
    options = $.extend({}, defaults, options);
    return this.each(function () {
      init($(this), options);
    });
  };
})(jQuery);
```

新加的几行代码也就是插件对外的接口。 `slideImg` 是调用的方法名； `options` 是引用插件时传进来的外部参数； `return` 则开放了对外访问的接口，也很好的保持了 jQuery 级联操作的特性；`init()` 方法是插件的初始化，接下来，我们就一步步从初始化方法开始，完善我们的插件。

到这一步，插件的基本框架已经完成，剩下的工作主要是对插件核心功能的实现。

初始化方法主要是构建好轮播图的 HTML 框架，代码如下

```javascript
(function ($) {
  var defaults = {
    // 为展示方便，示例代码省略
  };

  // 扩展调用方法名
  $.fn.slideImg = function (options) {
    options = $.extend({}, defaults, options);
    return this.each(function () {
      init($(this), options);
    });
  };

  // 初始化方法
  function init(obj, options) {
    var imgs = "<div class='imgBox'>", // 展示图片的容器
      tips = "<div class='tipBox'>", // 展示图片对应标记的容器
      len = options.imgs.length; // 获取展示图片数目

    // 创建 HTML 结构
    for (var i = 0; i < len; i++) {
      if (options.imgs[i].link) {
        imgs += "<a href='" + options.imgs[i].link + "'>";
        imgs += "<img src='" + options.imgs[i].src + "'/>";
        imgs += '</a>';
      } else {
        imgs += "<img src='" + options.imgs[i].src + "'/>";
      }
      tips += "<a href='javascript:void(0)'></a>";
    }
    imgs += '</div>';
    tips += '</div>';

    // 将插件的 HMTL 结构插入 jQuery 对象中
    $(obj).append(imgs).append(tips);
    $('.tipBox a').eq(0).addClass('current');

    // 设置插件默认样式
    $(obj).css({
      width: options.width,
      height: options.height
    });

    $('.imgBox a').css({
      width: options.width,
      height: options.height
    });

    $('.imgBox img').css({
      width: options.width,
      height: options.height
    });

    $('.tipBox').css({
      left: (options.width - 11 * len - 10) / 2
    });

    // 根据滚动方向，调整图片排列方向
    if (options.direction == 'top' || options.direction == 'bottom') {
      $('.imgBox a').css({
        display: 'block'
      });
      $('.imgBox').css({
        width: '100%',
        height: options.height * len
      });
    } else {
      $('.imgBox').css({
        width: options.width * len,
        height: '100%'
      });
    }

    // 根据图片的滚动方向调用不同滚动方法
    var dir = options.direction;
    switch (dir) {
      case 'top': {
        setInterval(function () {
          autoSlideTop(options);
        }, 3000);
        break;
      }
      case 'right': {
        setInterval(function () {
          autoSlideRight(options);
        }, 3000);
        break;
      }
      case 'bottom': {
        setInterval(function () {
          autoSlideBottom(options);
        }, 3000);
        break;
      }
      case 'left': {
        setInterval(function () {
          autoSlideLeft(options);
        }, 3000);
        break;
      }
    }
  }
})(jQuery);
```

最后我们还剩下图片不同的滚动方法没有完成，下面给出的示例代码只是向左滚动的代码，举一反三，希望大家能自己实现其他方向的滚动方法。

```javascript
(function ($) {
  var defaults = {
    // 为展示方便，示例代码省略
  };

  // 扩展调用方法名
  $.fn.slideImg = function (options) {
    options = $.extend({}, defaults, options);
    return this.each(function () {
      init($(this), options);
    });
  };

  // 初始化方法
  function init(obj, options) {
    // 为展示方便，示例代码省略
  }

  var index = 0;

  function autoSlideLeft(options) {
    // 当展示最后一张时，会退回到第一张重新向左滚动
    if (
      $('.imgBox').position().left ==
      -options.width * (options.imgs.length - 1)
    ) {
      index = 0;
      $('.imgBox').animate({ left: '0' }, 1000);

      // 展示的当前图片与标记对应
      $('.tipBox a').each(function (i) {
        if (index == i) {
          $(this).addClass('current');
        } else {
          $(this).removeClass('current');
        }
      });
    } else {
      index++;
      $('.imgBox').animate({ left: '-=' + options.width }, 1000);
      $('.tipBox a').each(function (i) {
        if (index == i) {
          $(this).addClass('current');
        } else {
          $(this).removeClass('current');
        }
      });
    }
  }
})(jQuery);
```

至此，这个轮播图的插件也就完成了
