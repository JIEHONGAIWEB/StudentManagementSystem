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
	//1:首先给左边的导航栏中添加4个ul
		for(let i = 0 ;i<4;i++){
			$leftUl = $("<ul></ul>");
			$(".left_nav").append($leftUl);
			$leftUl.attr("class","leftUl"+i);
		}
		$(".leftUl0").text("设计 Design");
		$(".leftUl1").text("前端 Develop");
		$(".leftUl2").text("产品 Product");
		$(".leftUl3").text("运营 Operate");

		$(".leftUl0").click(function(){
			window.location.href = "index.html";
		});
		$(".leftUl1").click(function(){
			window.location.href = "develops.html";
		});
		$(".leftUl2").click(function(){
			window.location.href = "products.html";
		});
		$(".leftUl3").click(function(){
			window.location.href = "operates.html";
		});

	//2、右边的内容区域的显示
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

		//每一个小图标的下边的获取，并且修改class名称
		for(let i = 1;i<8;i++){
			$icon = $("<i></i>");
			$("h6").eq(i-1).prepend($icon);
			$icon.attr("class",data[i]["panel_icon"].slice(3));
		}

		//3、右边内容区域的主要的信息数据的=显示
		for(let i=0;i<8;i++){
				
			for(let j=0;j<data[i]["panel_body"].length;j++){
				
				$(".card").eq(i).find("li").eq(j).append("<img /> <span>"+data[i]["panel_body"][j][0]["title"]+"</span> <p>"+ data[i]["panel_body"][j][0]["info"] +"</p> <span><i class='czs-eye-l'></i>"+data[i]["panel_body"][j][0]["eye_number"]+"</span> <span><i class='czs-thumbs-up-l'></i>"+data[i]["panel_body"][j][0]["praise"]+"</span>");
				$(".card").eq(i).find("li").find("img").eq(j).attr("src","http://www.chuangzaoshi.com/"+data[i]["panel_body"][j][0]["imgTitle_icon"]);
	            //需要做成单例的模式，需要进行设计
	            $(".card").eq(i).find("li").eq(j).find("img").mouseover(function(){
	            	console.log(data[i]["panel_body"][j][0]["link"]);
	            	
	            });
	             $(".card").eq(i).find("li").eq(j).find("span").eq(0).mouseover(function(){
	            	console.log(data[i]["panel_body"][j][0]["link"]);
	            	
	            });

			}
			
		}
		//4:左边导航循序生成li列表
		for(let i =0;i<8;i++){
			$icon2 = $("<i></i>");
			
			$leftLi = $("<li></li>");
			$(".leftUl2").append($leftLi);
			$(".leftUl2").find("li").eq(i).text(data[i]["panel_title"]);
			
			$leftLi.prepend($icon2);
			$icon2.attr("class",data[i+1]["panel_icon"].slice(3));
			
		}
		$(".leftUl2").css({
			
		});

}

