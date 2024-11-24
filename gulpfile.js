import gulp from "gulp";
import { paths } from "./gulp/config/paths.js";

// Shared plugins import
import { plugins } from "./gulp/config/plugins.js";
global.app = {
	isBuild: process.argv.includes("--build"),
	isDev: !process.argv.includes("--build"),
	gulp: gulp,
	paths: paths,
	plugins: plugins,
}

// Tasks import
import { copy } from "./gulp/tasks/copy.js";
import { clean } from "./gulp/tasks/clean.js";
import { html } from "./gulp/tasks/html.js";
import { bsync } from "./gulp/tasks/bsync.js";
import { scss } from "./gulp/tasks/scss.js";
import { script } from "./gulp/tasks/script.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontStyle } from "./gulp/tasks/fonts.js";
import { svgsprite } from "./gulp/tasks/svgsprite.js";
import { zip } from "./gulp/tasks/zip.js";

// Fonts processing
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);

// Watchers
function watcher() {
	gulp.watch(paths.watch.files, copy);
	gulp.watch(paths.watch.html, html);
	gulp.watch(paths.watch.scss, scss);
	gulp.watch(paths.watch.js, script);
	gulp.watch(paths.watch.img, images);
}


const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, script, images));

// Tasks running flow
const dev = gulp.series(clean, mainTasks, gulp.parallel(watcher, bsync));
const build = gulp.series(clean, mainTasks)
const deployZip = gulp.series(clean, mainTasks, zip);

// Default tasks flow
gulp.task("default", dev);

export { dev, build, deployZip, svgsprite };