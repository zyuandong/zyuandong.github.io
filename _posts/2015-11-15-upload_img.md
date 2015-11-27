---
title: Node.js 图片上传
category: node.js
tags: [node.js, javascript]
---

```
var formidable = require('formidable'),
	fs = require('fs'),
	AVATAR_UPLOAD_FOLDER = '/avatar/',
	fn;

router.post('/uploadImg', function(req, res, next) {
    //创建上传表单
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置上传目录
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;
    //保留后缀
    form.keepExtensions = true;
    //文件大小 2M
    form.maxFieldsSize = 2 * 1024 * 1024;
    // 上传文件的入口文件
    form.parse(req, function(err, fields, files) {
    
        if (err) {
            console.log(err);
			req.flash('error', err);
            return res.redirect('/uploadImg');
        }
        
        var extName = '';  //后缀名
        switch (files.img.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;		 
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;		 
        }
    
        if(extName.length == 0){
            console.log('只支持png和jpg格式图片');
			req.flash('error', '只支持png和jpg格式图片');
            return res.redirect('/uploadImg');				   
        }

        var avatarName = Math.random() + '.' + extName;
		var newPath = form.uploadDir + avatarName;
        fs.renameSync(files.img.path, newPath);  //重命名

		console.log('上传成功');
		req.flash('success', '上传成功');
		res.redirect('/uploadImg');
    });
})
```