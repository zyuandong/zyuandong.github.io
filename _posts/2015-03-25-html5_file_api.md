---
title: HTML5 File API
category: Technology
tags: [web, HTML]
---

~~~
<input type='file' id="file">  
<input type="button" value="读取图像" onclick="readAsDataURL()">  
<div id="result"></div>
~~~

~~~
var result = document.getElementById('result');
var file = document.getElementById('file');
if(typeof FileReader == 'undefined'){
    result.innerHTML = "<p>sorry</p>";
}
function readAsDataURL(){
    var file = document.getElementById('file').files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
        var result = document.getElementById('result');
        result.innerHTML = '<img src="'+this.result+'"/>';
    };
}
~~~

~~~
$('#file').change(function(){
    var file = $(this).get(0).files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(){
        $('#result').append('<img src="'+this.result+'">');
    };
});
~~~