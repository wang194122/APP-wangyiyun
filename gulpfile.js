const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
//scss --> css
gulp.task('sass', () =>
    gulp.src('src/sass/*.scss')            //路径修改
    .pipe(sass.sync().on('error', sass.logError))   
    .pipe(gulp.dest('./dist/css'))
);

gulp.task('sass:watch',()=>{
	gulp.watch("src/sass/*.scss",['sass'])
})
//js
gulp.task('default', () =>
    gulp.src('src/js/*.js')            //路径修改
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest('./dist/js'))
);
gulp.task('babel',()=>{
	gulp.watch("src/js/*.js",['default'])
})