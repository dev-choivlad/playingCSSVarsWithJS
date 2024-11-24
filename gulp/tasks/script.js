import webpack from 'webpack-stream'
import { webpackConfig } from '../../webpack.config.js'

export const script = () =>
	app.gulp.src(app.paths.src.js, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumber(app.plugins.notify.onError({
				title: 'JS',
				message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(webpack({ config: webpackConfig(app.isDev) }))
		.pipe(app.gulp.dest(app.paths.build.js))
		.pipe(app.plugins.browserSync.stream())