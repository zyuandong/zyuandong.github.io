const { watch, src, dest, series, parallel } =  require('gulp');
const less = require('gulp-less');
const clean = require('gulp-clean');
const path = require('path');


const cleanTask = () => {
  return src('./assets/css/index.css', {allowEmpty: true, read: false})
    .pipe(clean());
}

const lessTask = () => {
  return src('./assets/less/index.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(dest('./assets/css/'));
}

const watchTask = () => {
  return watch(['./assets/**/*.less'], series(cleanTask, lessTask));  
}

exports.watch = watchTask;
exports.default = watchTask;