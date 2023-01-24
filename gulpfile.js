const SOURCE = "#src"
const BUILD = "build";

const PATH = {
  SRC: {
    HTML: SOURCE + "/**/*.html",
    SASS: SOURCE + "/sass/pages/**/*.sass",
    JS: SOURCE + "/js/**/*.js",
    IMG: SOURCE + "/img/**/*.{jpeg,jpg,png,svg,webp}",
    FONTS: SOURCE + "/fonts/**/*.{woff2,woff}"
  },

  WATCH: {
    SASS: SOURCE + "/**/*.sass"
  },

  APP: {
    ROOT: BUILD + "/",
    CSS: BUILD + "/css/",
    IMG: BUILD + "/img/",
    JS: BUILD + "/js/"
  }
}

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass")(require("sass"));
const browsersync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const csso = require("gulp-csso");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const webpack = require("webpack-stream");


gulp.task("htmlmin", () => {
  return gulp.src(PATH.SRC.HTML)
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(PATH.APP.ROOT))
})

gulp.task("css", () => {
    return gulp.src(PATH.SRC.SASS)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(postcss([autoprefixer()]))
      .pipe(csso())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(PATH.APP.CSS))
      .pipe(browsersync.stream())
  });

  gulp.task("minify-image", () => {
    return gulp.src(PATH.SRC.IMG)
      .pipe(imagemin([
        imagemin.mozjpeg({quality: 80, progressive: true}),
        imagemin.optipng({optimizationLevel: 3}),
      ]))
      .pipe(gulp.dest(PATH.APP.IMG))
  })

  gulp.task("js", () => {
    return gulp.src(PATH.SRC.JS)
      .pipe(webpack(require("./webpack.config.js")))
      .pipe(gulp.dest(PATH.APP.JS))
  })

  gulp.task("copy", () => {
    return gulp.src([
        // PATH.SRC.JS,
        PATH.SRC.FONTS
      ], {
        base: SOURCE
      })
      .pipe(gulp.dest(PATH.APP.ROOT))
  });

  gulp.task("clean", () => {
    return del(BUILD)
  });

  gulp.task("server", () => {
    browsersync.init({
      server: PATH.APP.ROOT,
      notify: false,
      open: true,
      cors: true,
      ui: false
    })

    gulp.watch(PATH.WATCH.SASS, gulp.series("css", "refresh"));
    gulp.watch(PATH.SRC.IMG, gulp.series("minify-image", "refresh"));
    gulp.watch(PATH.SRC.JS, gulp.series("js", "refresh"));
    gulp.watch(PATH.SRC.HTML, gulp.series("htmlmin"));
    gulp.watch(PATH.SRC.HTML).on("change", browsersync.reload);
  });

  gulp.task("refresh", (done) => {
    browsersync.reload();
    done();
  });

  gulp.task("build", gulp.series("clean", "htmlmin", "css", "js", "minify-image", "copy"));
  gulp.task("start", gulp.series("build", "server"));
