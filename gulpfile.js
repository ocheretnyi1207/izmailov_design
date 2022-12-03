const SOURCE = "#src"
const BUILD = "build";

const PATH = {
  SRC: {
    HTML: SOURCE + "/**/*.html",
    SASS: SOURCE + "/sass/core/style.sass",
    JS: SOURCE + "/js/**/*.js",
    IMG: SOURCE + "/img/**/*.{jpeg,jpg,png,svg,webp}",
    FONTS: SOURCE + "/fonts/**/*.{woff2,woff}"
  },

  WATCH: {
    SASS: SOURCE + "/**/*.sass"
  },

  APP: BUILD + "/",
}

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass")(require("sass"));
const browsersync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");

gulp.task("css", () => {
    return gulp.src(PATH.SRC.SASS)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(PATH.APP))
      .pipe(browsersync.stream())
  });

  gulp.task("copy", () => {
    return gulp.src([
        PATH.SRC.IMG,
        PATH.SRC.HTML,
        PATH.SRC.JS,
        PATH.SRC.FONTS
      ], {
        base: SOURCE
      })
      .pipe(gulp.dest(BUILD))
  });

  gulp.task("clean", () => {
    return del(BUILD)
  });

  gulp.task("server", () => {
    browsersync.init({
      server: PATH.APP,
      notify: false,
      open: true,
      cors: true,
      ui: false
    })

    gulp.watch(PATH.WATCH.SASS, gulp.series("css", "refresh"));
    gulp.watch(PATH.SRC.IMG, gulp.series("copy"));
    gulp.watch(PATH.SRC.JS, gulp.series("copy"));
    gulp.watch(PATH.SRC.HTML, gulp.series("copy"));
    gulp.watch(PATH.SRC.HTML).on("change", browsersync.reload);
  });

  gulp.task("refresh", (done) => {
    browsersync.reload();
    done();
  });

  gulp.task("build", gulp.series("clean", "css", "copy"));
  gulp.task("start", gulp.series("build", "server"));
