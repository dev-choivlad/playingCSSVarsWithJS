import replace from "gulp-replace";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import browserSync from "browser-sync";
import newer from "gulp-newer" // Checks if the image has been updated or not
import ifPlagin from "gulp-if"

export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browserSync: browserSync,
	newer: newer,
	if: ifPlagin
}