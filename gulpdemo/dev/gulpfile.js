var gulp = require("gulp");
var	sass = require("gulp-sass");

//复制文件
//首页的信息，需要及时的复制到我需要发布的文件中
gulp.task("copyIndex",function(){
	gulp.src("page/*.html")
	.pipe(gulp.dest("chuang/public"));
});

//图片的信息，需要及时的复制到我需要发布的文件中
gulp.task("copyImg",function(){
	gulp.src("page/images/*")
	.pipe(gulp.dest("chuang/public/images"));
});

//js文件的修改，需要及时的复制到我需要发布的js文件中
gulp.task("copyJs",function(){
	gulp.src("page/js/*.js")
	.pipe(gulp.dest("chuang/public/javascripts"));
});
  

gulp.task("sass",function(){
	gulp.src("page/scss/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("chuang/public/stylesheets"));
});

gulp.task("copyJsonFile",function(){
	gulp.src("page/json/*.json")
	.pipe(gulp.dest("chuang/public/json"));
});

//实时监测文件的更新
gulp.task("watching",function(){
	gulp.watch("page/scss/*.scss",['sass']);
	gulp.watch('page/*.html',['copyIndex']);
	gulp.watch('page/js/*.js',['copyJs']);
	gulp.watch('page/json/*.json',['copyJsonFile']);
	gulp.watch('page/images/*',['copyImg']);


});
