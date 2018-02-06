//动态的生成div标签数据
$.ajax({
	"url":"products",
	"dataType":"json",
	"async":false,
	"success":function(data){
		getInfo(data);
	}
});

//数据获取完毕
function getInfo(data){

	for(let i=0;i<8;i++){
			// 读取到了panel.title的数据
			$ulDom = $("<ul></ul>");
			$(".right_body").append($ulDom);
			$ulDom.attr("class","card");


			$h6Dom = $("<h6></h6>");
			$ulDom.append($h6Dom);

			$h6Dom.text(data[i]["panel_title"]);
			
			//读取到了panel.body的长度
			// console.log(data[i]["panel_body"].length);	
			for(let j=0;j<data[i]["panel_body"].length;j++){
				//读取到每一个自己需要的数据
				$liDom = $("<li></li>");
				$ulDom.append($liDom);
				$liDom.attr("class","cell_4");	

			}
			
		}
		for(let i=0;i<8;i++){
				
			for(let j=0;j<data[i]["panel_body"].length;j++){
				
				$(".card").eq(i).find("li").eq(j).append("<img /> <span>"+data[i]["panel_body"][j][0]["title"]+"</span> <p>"+ data[i]["panel_body"][j][0]["info"] +"</p> <span>"+data[i]["panel_body"][j][0]["eye_number"]+"</span> <span>"+data[i]["panel_body"][j][0]["praise"]+"</span>");
				$(".card").eq(i).find("li").find("img").eq(j).attr("src","http://www.chuangzaoshi.com/"+data[i]["panel_body"][j][0]["imgTitle_icon"]);
					

			}
			
		}

}
//动态的添加div标签才是重点
