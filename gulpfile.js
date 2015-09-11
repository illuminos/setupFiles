//Author : Ujwal Bharat

//strict mode has already been enforced on node.js

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	plumberNotifier = require('gulp-plumber-notifier'),
	connect = require('gulp-connect'),
	open = require('gulp-open'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer');

// Connect Server Task

gulp.task('webserver',function(){
	connect.server({
		livereload: true
	});
});

// Open files Task

gulp.task('open',function(){
	gulp.src('./index.html').
	pipe(open({uri: 'http://localhost:8080'}));
});

// Html tasks

gulp.task('html',function(){
	gulp.src('./*.html').
	pipe(connect.reload());
});

// Scripts Tasks
// Uglifies

gulp.task('scripts',function(){
	gulp.src('js/*.js').
	pipe(plumber()).
	pipe(plumberNotifier()).
	pipe(uglify()).
	pipe(gulp.dest('build/js'));
});


// Style Tasks
// Uglifies

gulp.task('styles',function(){
	gulp.src('scss/**/*.scss').
	pipe(plumber()).
	pipe(plumberNotifier()).
	//pipe(sourcemaps.init().
	pipe(sass({
		outputStyle:'expanded',
		includePaths: [
			'./node_modules/susy/sass/',
			'./node_modules/mappy-breakpoints/'
		]
	}).
	on('error',sass.logError)).
	pipe(autoprefixer({
		browsers: ['last 6 version'],
	})).
	//pipe(sourcemaps.write()).
	pipe(gulp.dest('build/css')).
	pipe(connect.reload());
});


// Watch Task
// Watches JS

gulp.task('watch',function(){
	gulp.watch('./*.html',['html']);
	gulp.watch('js/*.js',['scripts']);
	gulp.watch('scss/**/*.scss',['styles']);
});


//Default Task

gulp.task('default',['webserver','open','scripts','styles','watch']);

