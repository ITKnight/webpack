/**
 * Created by ITKNIGHT on 2017/1/11.
 */


var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    runsequence=require('run-sequence'),
    htmlmin=require('gulp-htmlmin'),
    less = require('gulp-less'),
    del = require('del'),
    postcss    = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps');

/*压缩js*/
gulp.task('js', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest('dist/js'))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('dist/js'));  //输出
});
/*压缩HTML*/
gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'));
});
/*清理*/
gulp.task('clean', function(cb) {
    return  del(['dist/'], cb)
});
/*执行LESS任务*/
gulp.task('less', function () {
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(minifycss())
        .pipe( sourcemaps.init() )
        .pipe( postcss([ require('precss'), require('autoprefixer') ]) )
        .pipe( sourcemaps.write('.') )
        .pipe(gulp.dest('dist/css'));
});

gulp.task('build', function(cb) {
    runsequence('clean','less','html','js', cb);

    gulp.watch("src/*.html",["html"]);
    gulp.watch("src/less/*.less",["less"]);
    gulp.watch("src/js/*.js",["js"]);
});

gulp.task('default', ['build'], function() {


});