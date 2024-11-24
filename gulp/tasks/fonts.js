import fs from "fs";
import fonter from "gulp-fonter-fix"; // Converts otf --> ttf & woff
import ttf2woff2 from "gulp-ttf2woff2";

const fontWeights = {
	thin: 100,
	extralight: 200,
	light: 300,
	regular: 400,
	medium: 500,
	semibold: 600,
	bold: 700,
	extrabold: 800,
	heavy: 800,
	black: 900,
}

export const otfToTtf = () => {
	// Searching fonts .otf
	return app.gulp.src(`${app.paths.srcFolder}/fonts/*.otf`, {})
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "FONTS",
			message: "Error: <%= error.message %>"
		})
	))
	// Converting into .ttf
	.pipe(fonter({ formats: ["ttf"] }))

	// Uploading to source folder
	.pipe(app.gulp.dest(`${app.paths.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
	// Searching fonts .ttf
	return app.gulp.src(`${app.paths.srcFolder}/fonts/*.ttf`, {})
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "FONTS",
			message: "Error: <%= error.message %>"
		})
	))
	// Converting into .woff
	.pipe(fonter({ formats: ["woff"] }))
	// Uploading to source folder
	.pipe(app.gulp.dest(`${app.paths.build.fonts}`))

	// Searching fonts .ttf
	.pipe(app.gulp.src(`${app.paths.srcFolder}/fonts/*.ttf`))
	// Converting into .woff2
	.pipe(ttf2woff2())
	// Uploading to source folder
	.pipe(app.gulp.dest(`${app.paths.build.fonts}`))

	// Searching fonts .woff and woff2
	.pipe(app.gulp.src(`${app.paths.srcFolder}/fonts/*.{woff,woff2}`))
	// Uploading to source folder
	.pipe(app.gulp.dest(`${app.paths.build.fonts}`))
}

export const fontStyle = () => {
	// Getting the path to the fonts style file
	let fontsFile = `${app.paths.srcFolder}/scss/fonts.scss`;

	// Checking if there are font static
	fs.readdir(app.paths.build.fonts, function(err, fontsFiles) {
		if (fontsFiles) {
			// Checking if there is a fonts style file
			if (!fs.existsSync(fontsFile)) {
				// If there is no a file, create it
				fs.writeFile(fontsFile, '', cb);
				let newFileOnly;

				fontsFiles.forEach((file) => {
					// Put fonts to a font style file
					const fileName = file.split('.')[0];

					if (newFileOnly !== fileName) {
						const fontName = fileName.split('-')[0] ? fileName.split('-')[0] : fileName;
						const fontWeight = fileName.split('-')[1] ? fileName.split('-')[1] : fileName;
						const fontWeightValue = fontWeights[fontWeight.toLowerCase()];

						fs.appendFile(
							fontsFile,
							`@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fileName}.woff2") format("woff2"), url("../fonts/${fileName}.woff") format("woff");\n\tfont-weight: ${fontWeightValue};\n\tfont-style: normal;\n}\r\n`,
							cb
						)

						newFileOnly = fileName;
					}
				})
			} else {
				// If there is a file, delete
				console.log('File scss/fonts.scss already exists. To update a file, you need to delete it!');
			}
		}
	})

	return app.gulp.src(`${app.paths.srcFolder}`);
	function cb() { }
}
