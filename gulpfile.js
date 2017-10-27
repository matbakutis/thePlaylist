const gulp = require('gulp');
const less = require('gulp-less');
const minify = require('gulp-minify');

gulp.task('less-css', ()=>{
	gulp.src('./style/*.less')
		.pipe(less())
		.pipe(gulp.dest('./public/styles/'))
});

gulp.task('watch', ()=>{
	gulp.watch(['./public/styles/*.less'], ['less-css']);
});

gulp.task('compress', ()=>{
  gulp.src('./*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'-minified.js'
        },
        exclude: ['tasks']
    }))
    .pipe(gulp.dest('./public/build'))
});

gulp.task('default', ['less-css', 'watch']);