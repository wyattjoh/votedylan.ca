var gulp = require('gulp');
var uglify = require('gulp-uglify');
var path = require('path');

function rel(pathTo) {
  return path.join(__dirname, pathTo);
}

gulp.task('js', function() {
  gulp.src(rel('private/javascripts/*.js'))
    .pipe(uglify())
    .pipe(gulp.dest(rel('public/javascripts/')))
});

gulp.task('watch', function() {
  gulp.watch(rel('private/javascripts/*.js'), ['js']);
})

gulp.task('default', ['js', 'watch']);
