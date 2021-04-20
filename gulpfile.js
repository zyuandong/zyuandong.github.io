const { watch, src, dest } =  require('gulp');
const less = require('gulp-less');
const path = require('path');


const watchTask = function() {
  watch(['./assets/**/*.less'], function() {
    return src('./assets/less/style.less')
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(dest('./assets/css'));
  });  
}

exports.default = watchTask