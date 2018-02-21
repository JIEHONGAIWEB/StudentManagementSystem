const mongoose = require("mongoose");
const chuangzaoshi = mongoose.createConnection("localhost","chuangzaoshi");

//1、创建自己的模板
//模板的创建非常的重要，应该怎么创建？？

let designsSchema = new mongoose.Schema(
[ { panel_title: String,panel_icon: String,panel_body: Object},
	
  { panel_title: String,panel_icon: String,panel_body: Object},

  { panel_title: String,panel_icon: String,panel_body: Object},
  { panel_title: String,panel_icon: String,panel_body: Object},

  { panel_title: String,panel_icon: String,panel_body: Object},
  { panel_title: String,panel_icon: String,panel_body: Object},

  { panel_title: String,panel_icon: String,panel_body: Object},
  { panel_title: String,panel_icon: String,panel_body: Object}

 ]
	);
//2、进行关联
let designsModel = chuangzaoshi.model("products",designsSchema);

//3、实际的操作（增删改查）
module.exports = {
	//进行数据库的添加操作
	"add":function(data,func){
		//这里的data 就是最后的数组[]最大的数组
		let designsEntity = new designsModel(data);
		designsEntity.save((err,data)=>{
			if(err){
				func(false);
			}else{
				func(true);
			}
		});
	},
	//进行数据库中的内容进行查找
	"find":function(func){
		designsModel.findOne((err,data)=>{
			if(err){
				func(data);
			}else{
				func(data);
			}
		});
	}


};