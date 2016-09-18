// grab our gulp packages
var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    server = require('gulp-express'),
    install = require("gulp-install");

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build', ['jshint'],function() {
    gulp.src(['package.json']).pipe(install());
});


gulp.task('watch', ['run'],function() {  
  gulp.watch('**/*.js', ['jshint']);
});

gulp.task('run', ['build'],function() {
    server.run(['index.js']);
});
