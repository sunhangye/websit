/**
 * Created by sunhangye on 17/5/24.
 */
// 引入 gulp
var gulp = require('gulp');

// 引入组件
var htmlmin = require('gulp-htmlmin'), //html压缩
  imagemin = require('gulp-imagemin'),//图片压缩
  pngcrush = require('imagemin-pngcrush'),
  minifycss = require('gulp-minify-css'),//css压缩
  jshint = require('gulp-jshint'),//js检测
  uglify = require('gulp-uglify'),//js压缩
  concat = require('gulp-concat'),//文件合并
  rename = require('gulp-rename'),//文件更名
  autoprefixer = require('gulp-autoprefixer'),//补充前缀
  spriter = require('gulp-css-spriter'),//雪碧图合成,css内的url添加后缀?__spriter
  rev = require('gulp-rev-append'),//版本号自动更新
  ngAnnotate = require('gulp-ng-annotate'),//angular依赖
  ngmin = require('gulp-ngmin'),//angular依赖
  notify = require('gulp-notify');//提示信息
  browserSync = require('browser-sync').create();

// 压缩html
gulp.task('html', function () {
  var htmlOptions = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
  };
  return gulp.src('src/*.html')
    .pipe(rev())
    .pipe(htmlmin(htmlOptions))
    .pipe(gulp.dest('./dist'))
    .pipe(notify({message: 'html task ok'}));

});

// 压缩图片
gulp.task('img', function () {
  var imgOption = {
    optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
    progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
    interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
    multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
    svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
    use: [pngcrush()] //使用pngquant深度压缩png图片的imagemin插件
  };
  return gulp.src('img/**/*')
    .pipe(imagemin(imgOption))
    .pipe(gulp.dest('src/img/'))
});

// 合并、压缩、重命名css
gulp.task('css', function () {
  var cssOption = {
    advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
    compatibility: '*',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
    keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
    keepSpecialComments: '*'
    //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
  };
  return gulp.src(['css/**/*.css', '!css/all.css', '!css/all.min.css'])
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0'],
      cascade: true, //是否美化属性值 默认：true 像这样：
      remove: true //是否去掉不必要的前缀 默认：true
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('src/css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss(cssOption))
    .pipe(gulp.dest('src/css'))
    .pipe(gulp.dest('dist/css'))
});

// 检查js
/*gulp.task('lint', function () {
  return gulp.src(['js/!**!/!*.js', 'js/!*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(notify({message: 'lint task ok'}));
});*/

// 合并、压缩js文件
gulp.task('js', function () {
  var jsOption = {
    // mangle: {except: ['require', 'exports', 'module', '$']},
    compress: true//类型：Boolean 默认：true 是否完全压缩
    // preserveComments: 'all' //保留所有注释}//排除混淆关键字
  };
  return gulp.src(['js/**/*.js', '!js/all.js', '!js/all.min.js'])
    .pipe(concat('all.js'))
    .pipe(ngAnnotate())
    .pipe(ngmin({dynamic: false}))
    .pipe(gulp.dest('src/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'))
    .pipe(notify({message: 'js task ok'}));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      server: "./"
    }
  });


});

// 默认任务
gulp.task('default', function () {
  gulp.run('img', 'css', 'js', 'html', 'browser-sync');

  // 监听html文件变化
  gulp.watch('view/*.html', function () {
    gulp.run('html');
  });

  // Watch .css files
  gulp.watch(['css/**/*.css', '!css/all.css', '!css/all.min.css'], ['css']);

  // Watch .js files
  gulp.watch(['js/*.js', '!js/main.js'], ['js']);

  // Watch image files
  gulp.watch('img/*', ['img']);

});
