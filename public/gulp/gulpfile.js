"use strict";

// Load plugins
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync");
// const cp = require("child_process");
const cssnano = require("cssnano");
// const del = require("del");
// const eslint = require("gulp-eslint");
const gulp = require("gulp");
// const imagemin = require("gulp-imagemin");
// const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const pump = require('pump');
const minify = require('gulp-minify');
const paths = {
  proxy:'http://patka.local.com',
  scripts: {
    src: '../dev-js/**/*.js',
    dest: '../js/'
  },
  scss: {
    src: '../scss/*.scss',
    watch:'../scss/**/*.scss',
    dest: '../css/'
  },
  views: {
    src: '../../app/views/**/*.php'
  }
};

const server = browserSync.create();

// BrowserSync
function serve(done) {
  server.init({
    proxy : paths.proxy,
    port: 3000
  });
  done();
}

// BrowserSync Reload
function reload(done) {
  server.reload();
  done();
}

function errorHandler(error){
  console.log(error.message);
  gulp.watch(paths.scss.watch, gulp.series(css));
}

function errorHandlerJS(error){
  console.log(error.message);
}
// CSS task

function css() {
  return gulp
    .src(paths.scss.src)
    .pipe(plumber(errorHandler))
    .pipe(sass({ outputStyle: "expanded" }))
    // .pipe(gulp.dest(paths.scss.dest))
    // .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest(paths.scss.dest))
    // ], errorHandler);
    .pipe(server.stream());
}

function js() {
  return gulp
    .src(paths.scripts.src)
    .pipe(plumber(errorHandlerJS))
    .pipe(minify({
      ext:{
            src:'-debug.js',
            min:'.js'
        },
      noSource:true
    }))
    .pipe(gulp.dest(paths.scripts.dest))
    // ], errorHandler);
    // .pipe(browsersync.stream());
}



// define complex tasks

//const build = gulp.series(clean, gulp.parallel(css, js));

function watchFiles(){
  gulp.watch(paths.scripts.src, gulp.series(js,reload));
  gulp.watch(paths.views.src, gulp.series(reload));
  gulp.watch(paths.scss.watch, gulp.series(css));
}


const dev = gulp.series(serve,watchFiles);

// export tasks;
exports.default = dev;
// export tasks
// // exports.images = images;
// exports.css = css;
// exports.js = js;
// exports.jekyll = jekyll;
// exports.clean = clean;
// exports.build = build;
// exports.watch = watch;
// exports.default = build;
