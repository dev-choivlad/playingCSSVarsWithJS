export const copy = () => {
	return app.gulp.src(app.paths.src.files)
		.pipe(app.gulp.dest(app.paths.build.files))
}