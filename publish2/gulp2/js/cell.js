class cell_Card{
        constructor(obj){
            let defalutObj = {
                //盒子默认的样式
                "width":223,
                "height":102,
                "marginLeft":0,
                "marginRight":0,
                "top":0,
                "left":0,
                "background":"white",
                "borderTop":"",

                //盒子内部图片的样式
                "infoImg":"",
                "imgWidth":35,
                "imgHeight":35,
                "imgPaddingTop":0,
                "imgMarginTop":0,
                "imgMarginBottom":0,
                //h6标题的信息
                "introTitle": "",

                //p标签的信息详情
                "introInfo":"",
                
                //观看人数
                "eyeNumber" : "",
                //点赞的人数
                "praise":""
                
            };

            for(let key in obj){
                defalutObj[key] = obj[key];
            }

            for(let key in defalutObj){
                this[key] = defalutObj[key];
            }
            
            this.myDom = null;
            this.createUI();
            this.initEvent();
        }
    
 

 }   
 cell_Card.prototype.createUI=function(){
/**
 * 方法的实现:初始化我的盒子的样式
 * @return {[type]} [description]
 */
        //解决父元素高度塌陷的问题
      
       
        this.myDom = $("<div></div>");
        this.myDom.appendTo(this.parentDom);
        this.myDom.css({
            "width":this.width,
            "height":this.height,
            "background":this.background,
            "position":"absolute",
            "left":this.left,
            "top":this.top,
            "marginLeft":this.marginLeft,
            "borderTop":this.borderTop
        });

        //这就是一系列添加标签操作
        this.myDom.append("<img />").append("<h6></h6>").append("<p></p>").append("<span></span>").append("<span></span>");
        
/**
 * 注意每一次传进来的数据都是需要设置清楚的
 */
        //给父元素设置样式来定义孩子的样式
        this.parentDom.css({
            "text-align":"center",

        });
        this.myDom.css({
            "marginRight":this.marginRight,
            "marginLeft":this.marginLeft
        });
        // 图片
        this.myDom.children().eq(0).attr("src","http:"+this.infoImg);
        this.myDom.children().eq(0).css({
            "width":this.imgWidth,
            "height":this.imgHeight,
            "paddingTop":this.imgPaddingTop,
            "imgMarginTop":this.imgMarginTop,
            "imgMarginBottom":this.imgMarginBottom,
            "margin":"0 auto ",
            "display":"block"
            


        });
        //介绍的标题
        this.myDom.children().eq(1).html(this.introTitle);
        this.myDom.children().eq(1).css({
            "text-overflow":"ellipsis",
            "white-space":"nowrap",
            "overflow":"hidden",
            "display":"block",
            "color":"#212121",
            "font-size":"14px",
            "font-weight":"400"
        });
        //介绍的信息 
        this.myDom.children().eq(2).html(this.introInfo);
        this.myDom.children().eq(2).css({
            "margin": "10px  10px",
            "height": "18px",
            "font-size": "12px",
            "text-align": "center",
            "text-overflow": "ellipsis",
            "white-space": "nowrap",
            "overflow":"hidden",
            "color": "#b0b0b0"
        });
        //价格
        
        this.myDom.children().eq(3).css({
            "margin":"  20px 10px",
            "text-align": "center",
            "color":" #ff6700"
        });
        this.myDom.children().eq(3).html(this.priceNow);

        //原先的价格
        this.myDom.children().eq(4).html(this.pricePre);
    }
cell_Card.prototype.initEvent = function(){
/**
 * 方法的实现:初始化我的盒子的鼠标滑过显示的事件
 * 效果实现：鼠标滑过的时候，出现盒子向上移动一点，然后出现盒子的阴影
 * @return {[type]} [description]
 */
    this.myDom.on("mouseover",function(){
            let count=0;
            this.style.boxShadow = "5px 5px 20px #ccc";
            let that = this;
            let time1 =  setInterval(()=>{
                    count++;
                    borderChange(that);
                    if(count == 3){
                        clearInterval(time1);
                    }
               },30) ;
    





    });

     this.myDom.on("mouseout",function(){
        let count=0;
        this.style.boxShadow = "none";

        let that = this;

            let time2 =  setInterval(()=>{
                    count++;
                    borderNone(that);
                    if(count == 3){
                        clearInterval(time2);
                    }
               },30) ;
    
     });

    function borderChange(that){
        $(that).css({
            "top":parseInt(that.style.top)-1
        });
               
    }
    function borderNone(that){
        $(that).css({
            "top":parseInt(that.style.top)+1
        });
   }

}
