var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglifyjs = require('gulp-uglifyjs'),
	rename = require('gulp-rename'),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del');


gulp.task('clean', function(){
	return del.sync('dist')
});

gulp.task('img', function(){
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img'))
});


gulp.task('css', function(){
	return gulp.src('app/css/libs.css')
		.pipe(rename({suffix: '.min'}))
		.pipe(cssnano())
		.pipe(gulp.dest('app/css'))
});

gulp.task('script', function(){
	return gulp.src(['app/libs/owl-carousel/owl-carousel/owl.carousel.js',
					'app/libs/mixitup/dist/mixitup.js'])
		.pipe(concat('libs.min.js'))
		.pipe(uglifyjs())
		.pipe(gulp.dest('app/js'))
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		}
	})
});

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(autoprefixer(['last 15 versions', 'ie 8', 'ie 7']))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))

});

gulp.task('build',['clean','img'], function(){
	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'))

	buildJs = gulp.src('app/js/**/*.js')
		.pipe(gulp.dest('dist/js'))

	buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist'))

	buildCss = gulp.src(['app/css/**/*.css',
						'!app/css/libs.css'])
		.pipe(gulp.dest('dist/css'))
});

gulp.task('watch', ['browser-sync'], function(){
	gulp.watch('app/sass/**/*.sass', ['sass'])
	gulp.watch('app/*.html', browserSync.reload)
	gulp.watch('app/js/**/*.js', browserSync.reload)
});

