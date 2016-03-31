/**
 * Created by mckim8686 on 2016-03-31.
 */
var run = require('gulp-run'),
  livereload = require('gulp-livereload'),
  injectReload = require('gulp-inject-reload'),
  rename = require("gulp-rename"),
  gulp = require('gulp');

gulp.task('default', ['pages', 'server', 'watch']);

gulp.task('run', function(){
  run('python wnd.py ./app/index-comp.html').exec();
});

gulp.task('pages', function(){
  return gulp.src('app/index.html')
    .pipe(injectReload())
    .pipe(rename('index-comp.html'))
    .pipe(gulp.dest('app/'))
    .pipe(livereload());
});

gulp.task('server', function() {
  //var server = child.spawn('npm',['start']);
  var server = run('python wnd.py ./app/index-comp.html').exec(function(e){
    gulp.start('server');
  });
});

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('app/**/*',['pages']);
  //gulp.watch(productionScripts, ['autoConcat']);
});