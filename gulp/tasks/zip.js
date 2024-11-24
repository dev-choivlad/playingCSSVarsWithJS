import { deleteAsync } from "del";
import zipPlugin from "gulp-zip";

export const zip = () => {
	deleteAsync(`./${app.paths.rootFolder}.zip`);
	return app.gulp.src(`${app.paths.buildFolder}/**/*.*`, {}).pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "ZIP",
			message: "Error: <%= error.message %>"
		})
	)).pipe(zipPlugin(`${app.paths.rootFolder}.zip`))
	.pipe(app.gulp.dest("./"))
}