import ghPages from "gh-pages";

export const ghp = () => {
	return app.gulp.src("../../dist/**/*")
		.pipe(ghPages())
}