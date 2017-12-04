let gulp = require('gulp');
let server = require('gulp-server-livereload');

gulp.task('run',() => {
gulp.src('src')
.pipe(server({
livereload: true,
directoryListing: false,
open: true,
clientConsole: true

}));
});