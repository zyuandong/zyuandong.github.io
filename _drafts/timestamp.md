---
title: 时间戳转换
category: 前端技术
tags: JavaScript
---

## 时间戳

是一种时间表示方式，定义为从格林威治时间1970年01月01日00时00分00秒起至现在的总秒数

目前相当一部分操作系统使用32位二进制数字表示时间。此类系统的Unix时间戳最多可以使用到格林威治时间2038年01月19日03时14分07秒（二进制：01111111 11111111 11111111 11111111）。其后一秒，二进制数字会变为10000000 00000000 00000000 00000000，发生溢出错误，造成系统将时间误解为1901年12月13日20时45分52秒。这很可能会引起软件故障，甚至是系统瘫痪。使用64位二进制数字表示时间的系统（最多可以使用到格林威治时间292,277,026,596年12月04日15时30分08秒）则基本不会遇到这类溢出问题。

## 普通日期格式转为时间戳

1. 获取当前时间戳

`var timestamp1 = Date.parse(new Date());`
获取的时间戳是把毫秒改成000显示

`var timestamp2 = (new Date()).valueOf();`

`var timestamp3 = new Date().getTime();`
第2、3种都是获取了当前毫秒的时间戳

2. 获取指定日期的时间戳
`var timestamp = (new Date("2000/01/01 09:00:00")).getTime();`


## 时间戳转为普通日期格式

1.Date toLocaleString方法

```
function getLocalTime(nS) {     
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
}
```

parseInt() 函数可解析一个字符串，并返回一个整数。

js中时间操作单位是毫秒。

toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。

replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。

replace(/:\d{1,2}$/,' ')验证替换以：开始有一位或二位数字的结束字符串，就是秒；替换为空

所以我们可以利用正则表达式改变我们想要的日期格式。

2.Date 属性方法

```
function add0(m){return m<10?'0'+m:m }
function format(shijianchuo)
{
//shijianchuo是整数，否则要parseInt转换
var time = new Date(shijianchuo);
var y = time.getFullYear();
var m = time.getMonth()+1;
var d = time.getDate();
var h = time.getHours();
var mm = time.getMinutes();
var s = time.getSeconds();
return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}
```

三.封装的时间格式器
```
/** 
 * 时间戳格式化函数 
 * @param  {string} format    格式 
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间 
 * @return {string}           格式化的时间字符串 
 */
function date(format, timestamp){  
    var a, jsdate=((timestamp) ? new Date(timestamp*1000) : new Date()); 
    var pad = function(n, c){ 
        if((n = n + "").length < c){ 
            return new Array(++c - n.length).join("0") + n; 
        } else { 
            return n; 
        } 
    }; 
    var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
    var txt_ordin = {1:"st", 2:"nd", 3:"rd", 21:"st", 22:"nd", 23:"rd", 31:"st"}; 
    var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  
    var f = { 
        // Day 
        d: function(){return pad(f.j(), 2)}, 
        D: function(){return f.l().substr(0,3)}, 
        j: function(){return jsdate.getDate()}, 
        l: function(){return txt_weekdays[f.w()]}, 
        N: function(){return f.w() + 1}, 
        S: function(){return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'}, 
        w: function(){return jsdate.getDay()}, 
        z: function(){return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0}, 
        
        // Week 
        W: function(){ 
            var a = f.z(), b = 364 + f.L() - a; 
            var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1; 
            if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){ 
                return 1; 
            } else{ 
                if(a <= 2 && nd >= 4 && a >= (6 - nd)){ 
                    nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31"); 
                    return date("W", Math.round(nd2.getTime()/1000)); 
                } else{ 
                    return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0); 
                } 
            } 
        }, 
        
        // Month 
        F: function(){return txt_months[f.n()]}, 
        m: function(){return pad(f.n(), 2)}, 
        M: function(){return f.F().substr(0,3)}, 
        n: function(){return jsdate.getMonth() + 1}, 
        t: function(){ 
            var n; 
            if( (n = jsdate.getMonth() + 1) == 2 ){ 
                return 28 + f.L(); 
            } else{ 
                if( n & 1 && n < 8 || !(n & 1) && n > 7 ){ 
                    return 31; 
                } else{ 
                    return 30; 
                } 
            } 
        }, 
        
        // Year 
        L: function(){var y = f.Y();return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0}, 
        //o not supported yet 
        Y: function(){return jsdate.getFullYear()}, 
        y: function(){return (jsdate.getFullYear() + "").slice(2)}, 
        
        // Time 
        a: function(){return jsdate.getHours() > 11 ? "pm" : "am"}, 
        A: function(){return f.a().toUpperCase()}, 
        B: function(){ 
            // peter paul koch: 
            var off = (jsdate.getTimezoneOffset() + 60)*60; 
            var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off; 
            var beat = Math.floor(theSeconds/86.4); 
            if (beat > 1000) beat -= 1000; 
            if (beat < 0) beat += 1000; 
            if ((String(beat)).length == 1) beat = "00"+beat; 
            if ((String(beat)).length == 2) beat = "0"+beat; 
            return beat; 
        }, 
        g: function(){return jsdate.getHours() % 12 || 12}, 
        G: function(){return jsdate.getHours()}, 
        h: function(){return pad(f.g(), 2)}, 
        H: function(){return pad(jsdate.getHours(), 2)}, 
        i: function(){return pad(jsdate.getMinutes(), 2)}, 
        s: function(){return pad(jsdate.getSeconds(), 2)}, 
        //u not supported yet 
        
        // Timezone 
        //e not supported yet 
        //I not supported yet 
        O: function(){ 
            var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4); 
            if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t; 
            return t; 
        }, 
        P: function(){var O = f.O();return (O.substr(0, 3) + ":" + O.substr(3, 2))}, 
        //T not supported yet 
        //Z not supported yet 
        
        // Full Date/Time 
        c: function(){return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()}, 
        //r not supported yet 
        U: function(){return Math.round(jsdate.getTime()/1000)} 
    }; 
        
    return format.replace(/[\]?([a-zA-Z])/g, function(t, s){ 
        if( t!=s ){ 
            // escaped 
            ret = s; 
        } else if( f[s] ){ 
            // a date function exists 
            ret = f[s](); 
        } else{ 
            // nothing special 
            ret = s; 
        } 
        return ret; 
    }); 
}```

调用方法 能够很方便的将时间戳转换成日期的格式，如：

```
date('Y-m-d','1350052653');//很方便的将时间戳转换成了2012-10-11 
date('Y-m-d H:i:s','1350052653');//得到的结果是2012-10-12 22:37:33
```
