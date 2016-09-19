var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    server = require('gulp-express'),
    install = require("gulp-install");

gulp.task('default', ['watch']);

gulp.task('jshint',  ['build'], function() {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build',function() {
    gulp.src(['package.json']).pipe(install({
      args: ['dev', '--no-shrinkwrap' ]} 
    ));
});

gulp.task('watch', ['run'],function() {  
  gulp.watch('**/*.js', ['jshint']);
});

gulp.task('run', ['jshint'],function() {
    server.run(['index.js']);
});
