var gulp = require('gulp'), 
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    tinypng  = require('gulp-tinypng'),
    uglify = require('gulp-uglifyjs'),
    concat = require('gulp-concat');

gulp.task('sass', function () {
    gulp.src('./dist/sass/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('./app/css'))
}) ;

gulp.task('scripts', function() {
	return gulp.src([
		'dist/js/*.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});
gulp.task('tinypng', function() {
    gulp.src('./dist/img/**/*')
        .pipe(tinypng('6y4DGYwXT3RB7_L7aw791UtYP6a93QLR'))
        .pipe(gulp.dest('app/img/'));
});


gulp.task('watch', ['sass', 'scripts' ], function () {
  gulp.watch('./dist/sass/*.scss', ['sass']);
  gulp.watch('./dist/js/*.js', ['scripts']);
});

gulp.task('build', function () {
    gulp.src([
		'./dist/img/**/*.jpg',
		'./dist/img/**/*.png'

	])
        .pipe(tinypng('6y4DGYwXT3RB7_L7aw791UtYP6a93QLR'))
        .pipe(gulp.dest('app/img/'));
});

gulp.task('default', ['watch'] );