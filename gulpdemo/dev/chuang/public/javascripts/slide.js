/**
 * 面向对象的实现轮播图
 * 轮播图的属性
 * 轮播图的方法
 * 轮播图的返回值
 * 
 */
 
/**
 * 实现轮播图的区域
 */
function slideShow (obj){
	
		//属性
		this.boxDom = obj.boxDom;
		this.width = obj.width;
		this.height = obj.height;

		//传进来的图片数组
		this.imgs = obj.imgs;

		//当前图片的下标
		this.ord = 0;//代表当前图片的序号，从0开始

		this.myTimer = null;
		this.timeSpace = obj.timeSpace;

		this.myDom = null;
		this.spanDom = null;

		//轮播图中的按钮
	    this.btnWidth = obj.btnWidth;
	    this.btnHeight = obj.btnHeight;
	    this.btnColor = obj.btnColor;//原始颜色
	    this.btnHighColor = obj.btnHighColor;//高亮颜色

		this.initUI();
		this.initEvent();
		this.autoPlay();
	}	
}


slideShow.prototype.initUI = function(){


	
	//一、创建所有的HTML元素，并设置css样式
		//1）创建img标签
		for(let i=0; i<this.imgs.length; i++){
			let imgDom = document.createElement("img");
			//1.1）设置样式
			imgDom.style.cssText = "position:absolute;width:" + this.width +"px; height:" + this.height +"px;";

			//1.2）添加到容器中
			this.boxDom.appendChild(imgDom);
		}

		//2)创建ul标签
		let ulDom = document.createElement("ul");
			//2.1)设置样式
				ulDom.cssText = "position:absolute;right:20px;bottom:10px;height:40px;";
		//3)创建li标签
		for(let i=0; i<this.imgs.length; i++){
			//3.1)创建li标签
			let liDom = document.createElement("li");
			//3.2)设置样式
			liDom.cssText = "float:left;margin-left:10px;border-radius:50%";
			liDom.style.width  = this.btnWidth + "px";
			liDom.style.height = this.btnHeight + "px";
			liDom.style.backgroundColor = this.btnColor;
			ulDom.appendChild(liDom);

		}
		//4)将ul标签，添加到容器中
		this.boxDom.appendChild(ulDom);

	//二、初始化界面
	//1)把每张图片的透明度进行初始化
	let imgDoms = this.boxDom.children;
		imgDoms[0].style.opacity = 1;
	for(let i=1; i<imgDoms.length; i++){
		imgDoms[i].style.opacity = 0;
	}
	//2)第一个按钮为高亮颜色
	let lis = this.boxDom.lastElementChild.children;
	lis[0].style.backgroundColor = this.btnHighColor;

};

//初始化事件
SlideShow.prototype.initEvent = function(){
	let that = this;

	this.boxDom.onmouseover = function (){
		window.clearInterval(that.myTimer);
	}

	this.boxDom.onmouseout = function (){
		//自动播放的事件
		that.autoPlay();
	}

	let lis = this.boxDom.lastElementChild.children;
	for(let i=0; i<lis.length; i++){
		lis[i].onclick = function (){
			//鼠标点击豆豆的时候，就跳转到哪个
			obj.goImg();
		}
	}
}

//自动变换图片
SlideShow.prototype.autoPlay = function(){
	this.myTimer = setInterval(()=>{
		//1、处理两个数据，一个是淡出的图片，另一个是淡入的图片
		let outord = this.ord;

		//2、改变序号
		this.ord++;
		//处理边界
		if(this.ord > this.imgs.length - 1){
			this.ord = 0;
		}
		//3、改变外观
		this.changeUI(outord,this.ord);


	},this.timeSpace);
}

//按照给定的进和出的序号，完成两张图片的淡入和淡出
SlideShow.prototype.changeUI = function(outord,inord){
	let currentOpacity = 1;
	let incOpacity = -0.1;
	let imgs = this.boxDom.children;
	let myTimer
}
