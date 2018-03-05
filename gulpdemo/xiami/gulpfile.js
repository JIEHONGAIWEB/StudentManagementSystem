var gulp = require("gulp");
var	sass = require("gulp-sass");

//复制文件
//首页的信息，需要及时的复制到我需要发布的文件中
gulp.task("copyIndex",function(){
	gulp.src("page_xiami/*.html")
	.pipe(gulp.dest("xiami_server/public"));
});

//图片的信息，需要及时的复制到我需要发布的文件中
gulp.task("copyImg",function(){
	gulp.src("page_xiami/img/*")
	.pipe(gulp.dest("xiami_server/public/images"));
});

//js文件的修改，需要及时的复制到我需要发布的js文件中
gulp.task("copyJs",function(){
	gulp.src("page_xiami/js/*.js")
	.pipe(gulp.dest("xiami_server/public/javascripts"));
});
  

gulp.task("sass",function(){
	gulp.src("page_xiami/scss/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("xiami_server/public/stylesheets"));
});

gulp.task("copyJsonFile",function(){
	gulp.src("page_xiami/json/*.json")
	.pipe(gulp.dest("xiami_server/public/json"));
});

//实时监测文件的更新
gulp.task("watching",function(){
	gulp.watch("page_xiami/scss/*.scss",['sass']);
	gulp.watch('page_xiami/*.html',['copyIndex']);
	gulp.watch('page_xiami/js/*.js',['copyJs']);
	gulp.watch('page_xiami/json/*.json',['copyJsonFile']);
	gulp.watch('page_xiami/images/*',['copyImg']);


});
