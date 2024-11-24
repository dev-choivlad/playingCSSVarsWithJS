export const bsync = (done) => {
	app.plugins.browserSync.init({
		server: {
			baseDir: `${app.paths.build.html}`
		},
		notify: false,
		open: false,
		cors: true,
		ui: false,
		logPrefix: "DevServer",
		host: "localhost",
		port: 1234
	})
}