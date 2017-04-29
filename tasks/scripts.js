import gulp from 'gulp';
//gulp if
import gulpif from 'gulp-if';
//文件合并
import concat from 'gulp-concat';
import webpack from 'webpack';
//gulp 与webpack集成
import gulpWebpack from 'webpack-stream';
// vinyl-named用来保持输入和输出的文件名相同, 
//否则会自动生成一个hashvinyl-named用来保持输入和输出的文件名相同, 否则会自动生成一个hash.
import named from 'vinyl-named';
import livereload from 'gulp-livereload';
//处理所有错误的通用方法,在处理前注册plumber
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import {log,colors} from 'gulp-util';
import args from './util/args';

gulp.task('scripts',()=>{
  return gulp.src(['app/js/index.js'])
    .pipe(plumber({
      errorHandle:function(){

      }
    }))
    .pipe(named())
    .pipe(gulpWebpack({
      module:{
        loaders:[{
          test:/\.js$/,
          loader:'babel'
        }]
      }
    }),null,(err,stats)=>{
      log(`Finished '${colors.cyan('scripts')}'`,stats.toString({
        chunks:false
      }))
    })
    .pipe(gulp.dest('server/public/js'))
    .pipe(rename({
      basename:'cp',
      extname:'.min.js'
    }))
    .pipe(uglify({compress:{properties:false},output:{'quote_keys':true}}))
    .pipe(gulp.dest('server/public/js'))
    .pipe(gulpif(args.watch,livereload()))
})