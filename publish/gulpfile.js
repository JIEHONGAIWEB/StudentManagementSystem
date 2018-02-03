var gulp = require("gulp");
var	sass = require("gulp-sass");



//复制文件
//首页的信息，需要及时的复制到我需要发布的文件中
gulp.task("copyIndex",function(){
	gulp.src("*.html")
	.pipe(gulp.dest("/Users/oliva/Desktop/publish"));
});
gulp.task("copyServer",function(){
	gulp.src("*.js")
	.pipe(gulp.dest("/Users/oliva/Desktop/publish"));
});
//js文件的修改，需要及时的复制到我需要发布的js文件中
gulp.task("copyJs",function(){
	gulp.src("js/*.js")
	.pipe(gulp.dest("/Users/oliva/Desktop/publish/js"));
});





//拷贝图片文件.jpg
//同时拷贝两个文件   gulp.src("/Users/oliva/Desktop/",直接写的就是第二个文件)
//过滤文件就是在文件的前面添加  ！  

gulp.task("sass",function(){
	gulp.src("scss/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("/Users/oliva/Desktop/publish/css"));
});

gulp.task("sass2",function(){
	gulp.src("scss/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("/Users/oliva/Desktop/gulpdemo/gulp/css"));
});


//实时监测文件的更新
gulp.task("watching",function(){
	gulp.watch("scss/*.scss",['sass']);
	gulp.watch("scss/*.scss",['sass2']);
	gulp.watch('*.html',['copyIndex']);
	gulp.watch('*.js',['copyServer']);

	gulp.watch('js/*.js',['copyJs']);

});
