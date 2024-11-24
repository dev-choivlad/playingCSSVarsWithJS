import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css" // Compresses css
import webpcss from "gulp-webpcss" // Outputs webp img
import autoprefixer from "gulp-autoprefixer"
import groupCssMediaQueries from "gulp-group-css-media-queries"

const sass = gulpSass(dartSass);

export const scss = () => {
	return app.gulp.src(app.paths.src.scss, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SCSS",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(sass({
			outputStyle: "expanded"
		}))
		.pipe(app.plugins.if(
			app.isBuild,
			groupCssMediaQueries()
		))
		.pipe(app.plugins.if(
			app.isBuild,
			webpcss({
				webpClass: ".webp",
				noWebpClass: ".no-webp"
			})
		))
		.pipe(app.plugins.if(
			app.isBuild,
			autoprefixer({
				grid: true,
				overrideBrowsersList: ["last 3 versions"],
				cascade: true
			})
		))
		// Uncomment for an uncompressed duplicate of the css file
		//.pipe(app.gulp.dest(app.paths.build.css))
		.pipe(app.plugins.if(
			app.isBuild,
			cleanCss({
				compatibility: "ie8"
			})
		))
		.pipe(rename({ extname: ".min.css" }))
		.pipe(app.gulp.dest(app.paths.build.css))
		.pipe(app.plugins.browserSync.stream())
}