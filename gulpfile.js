const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");

gulp.task("resources", function() {
  return gulp.src(["src/**", "!src/**/*.js"])
    .pipe(gulp.dest("bin"));
});

gulp.task("javascript", function() {
  return gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("bin"));
});

gulp.task("default", gulp.parallel("javascript", "resources"));
