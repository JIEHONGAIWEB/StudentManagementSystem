//本模板主要完成的是，进行数据的获取，然后先存入自己的数据库中
/**
 * 本模板的功能实现的是：
 * 1、通过爬虫请求，请求到别人的页面的信息
 * 2、通过对字符的处理得到数据进行存储
 * @type {[type]}
 */
const http = require("http");
const cheerio = require("cheerio");
const designsDbConne = require("./designsDbConne");

http.get("http://chuangzaoshi.com/operate",(res)=>{

	let html ='';

	res.on("data",(data)=>{
		html += data;
	});
	res.on("end",()=>{
		
		/**
		 * 注意：getInfo函数的调用
		 * 1:将获取到的数据，使用getInfo()函数进行数据的处理(例如：字符空格的去除)
		 */
		let parentStr = getInfo(html);

		//测试是否得到了数据
		// console.log(parentStr);
		
		/** 
		 * 数据库的连接并且进行数据的添加
		 * 1:这部分的操作是在getInfo()函数调用完成后得到数据，才能给数据库添加数据
		*/
		 designsDbConne.add(parentStr,function(isSuccess){
				if(isSuccess){
					console.log("添加成功！");
				}else{
					console.log("添加失败！");
				}
		});

	});
	
});

function getInfo(html){
	/**
	 * 函数名称:getInfo
	 * 功能:实现对(爬虫请求到的数据)处理
	 */
	//测试数据是否获取到了
	// console.log(html);
	/**
	 * 通用调用cheerio对象的load()方法
	 * 1：转化成HTML的标签
	 * 2：函数的返回值:是处理完毕之后的数据father
	 */
	let $ = cheerio.load(html);

	let father = [];//最后需要得到的处理之后的数据

	/**
	 * 函数名：kongge
	 * 对每一个传进来的字符串进行处理==去除空格
	 * 返回值:去除空格之后的新的字符串
	 */
	function kongge(str){
		//用一个新的字符来保存处理之后的数据，然后返回
		let strNew="";

		for(let i =0;i<str.length;i++){
			//正则的方法进行匹配
		    let reg = /\s/;
		    if(reg.test(str.charAt(i))){
		        continue;
		    }else{
		      strNew += str.charAt(i);
		    }
		}
		  return strNew ; 
	}
	/**
	 * @重点
	 * 1:针对不同的网页中的标签进行不同的处理
	 * 2:找到自己需要的数据，进行保存
	 */
	
	//创建每一个panel对象
	
	//每一个标签元素的获取
	let title = $(".panel-title");
	//拿到每一个标签的数据，进行存储在了test中
	let test = [];

	title.each(function(){
		let txt = $(this).text();
		test.push(txt);
	});

	//标签分类的总数
 	let length = test.length;
 
	for(let i=0;i<length;i++){

		/**
		 * 创建我的JSON对象，进行存储所需数据
		 * @type {Object}
		 */
		let panel = {
			"panel_title":"",
			"panel_icon":"",
			"panel_body":[]
		};
	/**
	 * 一:第一大部分
	 */
		//单个的标签分类
		let titleTemp = $(".panel-title").eq(i).text();
		panel.panel_title =  kongge(titleTemp);
		let iconTemp = $("i").eq(i).attr("class");
		panel.panel_icon =  kongge(iconTemp);
		
	/**
	 * 二:第二大部分
	 * 
	 */
		//获取到标签,顺着父标签找到孩子标签
		let row = $(".row").eq(i).children();
		for(let j=0;j<row.length;j++){

			let tempBox = [];
			/**
			 * 对找到的每一个孩子的操作
			 */
			row.eq(j).each(function(){

				//每一个小的盒子数据对象的构建cell
				let cell = {
					"imgTitle_icon":"",
					"title":"",
					"info":"",
					"link":"",
					"eye_number":"",
					"praise":""
				};

				//图片头像数据
				let imgTitle = $(this).find(".card-icon").children().eq(0).attr("src");
				cell.imgTitle_icon=kongge(imgTitle);
				//连接地址的数据
				let linkValue = $(this).find(".card-heading").attr("title");
				cell.link=kongge(linkValue);
				//标题的数据
				let titleValue = $(this).find(".card-title").text();
				cell.title = kongge(titleValue);
				//简要信息的介绍数据
				let infoValue = $(this).find(".card-body").text();
				cell.info = kongge(infoValue);
				//浏览过的数据
				let eye_numberValue = $(this).find(".card-footer").find(".btn-view").children().find("span").text();
				cell.eye_number = kongge(eye_numberValue);
				//点赞人数的获取
				let praiseValue = $(this).find(".card-footer").find(".count").text();
				cell.praise = kongge(praiseValue);
				//将构建好的cell,存储在tempBox中
				tempBox.push(cell);

			});
			panel.panel_body.push(tempBox);
		}//end for j
		father.push(panel);
	}//end i
	return father;
}//end function











