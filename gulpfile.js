// Include gulp
    var gulp = require('gulp');
    var argv = require('yargs').argv;
    var takana = require('takana');
    var runSequence = require('run-sequence');

// Get/set variables
	var config = require('./gulp/_config');
	var bumpType = [argv.bump] || ['build'];

///
///	 Import modularized tasks
///

	// Imports Copy (copy assets and html)
		require('./gulp/copy')(gulp);

	// Imports Sass
		require('./gulp/sass')(gulp);
		
	// Imports Script
		require('./gulp/scripts')(gulp);

	// Imports Bump
		require('./gulp/bump')(gulp, bumpType);

	// Imports Serve
		require('./gulp/serve')(gulp);

///
///  Setup group tasks
///	
	
	// Creates a default build task
		gulp.task('default', function(cb) {
		    runSequence(['copy', 'sass', 'scripts'], cb);
		});

	// Creates a release build task (adds a version bump)
		gulp.task('release', function(cb) {
		    runSequence(['default', 'bump'], cb);
		});

	// Creates a watch task to watch files and build async
		gulp.task('watch', function () {
			runSequence(['default', 'serve']);
		    gulp.watch(config.copy, ['copy']);
		    gulp.watch(config.sass, ['sass']);
		    gulp.watch(config.scripts, ['scripts']);
		});