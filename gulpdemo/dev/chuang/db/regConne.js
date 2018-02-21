/**
 * 本模板实现的功能是连接数据库
 * 将注册的信息存储到数据库中
 * 
 */
const mongoose = require("mongoose");
const chuangzaoshi = mongoose.createConnection("localhost","chuangzaoshi");
//1:新建模板schema
let vipsSchema = new mongoose.Schema({
	"username":String,
	"userpass":String,
	"email":String,
	"phoneNumber":Number
});

//2、模板和数据库中的集合进行关联（model）
let vipsModel = chuangzaoshi.model("vips",vipsSchema);

//3、实际的操作（增删改查）
module.exports = {
	//3.1):进行数据库的添加操作
	"add":function(data,func){
		//4:实体的创建。
		//data表示要存储在数据中的数据
		let vipsEntity = new vipsModel(data);

		vipsEntity.save((err,data)=>{
			if(err){
				func(false);
			}else{
				func(true);
			}
		});
	},
	//3.2):进行数据库中的内容进行查找.登录的时候需要进行数据的匹配检查
	"find":function(condition,func){
		vipsModel.find(condition,(err,data)=>{
			if(err){
				func(false);
			}else{
				func(true);
			}
		});
	}


};