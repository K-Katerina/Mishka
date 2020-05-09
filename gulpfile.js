"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var jsmin = require("gulp-minify");
var htmlmin = require("gulp-htmlmin");
var jsconcat = require("gulp-concat");
var rename = require("gulp-rename");
var postcss = require("gulp-postcss");
var del = require("del");

var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy-static", function () {
  return gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/img/sprite.svg",
    "source/*.ico"
    ], {
      base: 'source'
    })
    .pipe(gulp.dest("build"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(htmlmin())
    .pipe(gulp.dest("build"));
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("js", function () {
  return gulp.src([
      "node_modules/svg4everybody/dist/svg4everybody.js",
      "node_modules/picturefill/dist/picturefill.js",
      "source/js/*.js"
    ])
    .pipe(jsconcat("bundle.js"))
    .pipe(jsmin({
      noSource: true,
      ext: {
        min: ".min.js"
      }
    }))
    .pipe(gulp.dest("build/js"))
});

gulp.task("images", function () {
  return gulp.src([
    "source/img/**/*.{png,jpg,svg}",
    "!source/img/sprite.svg"
    ])
    .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.mozjpeg({progressive: true}),
        imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", gulp.series("images", function () {
  return gulp.src("build/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
}));

gulp.task("build", gulp.series("clean", "copy-static", "webp", "html", "css", "js"));

gulp.task("start", gulp.series("build", function () {
  server.init({
    server: "build/",
    notify: false,
    ui: false,
    cors: true,
    open: true
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css")).on("change", server.reload);
  gulp.watch("source/js/**/*.js", gulp.series("js")).on("change", server.reload);
  gulp.watch("source/*.html", gulp.series("html")).on("change", server.reload);
}));
