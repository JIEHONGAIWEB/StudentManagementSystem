class cell_Product{
         /**
         *  
         * 面向对象的实现，单例模式的每一个盒子的实现
         * 导航栏的属性：宽高,上边框,图片的展示,介绍的标题信息,介绍的详细信息,
         * 以前的价格,现在的价格,享受的活动
         */

        constructor(obj){
            let defalutObj = {
                "width":234,
                "height":300,
                "marginLeft":20,
                "top":0,
                "left":0,
                "background":"pink",
                "borderTop":"1px solid red",
                "infoImg":"img/1.png",
                "introTitle":"introTitle",
                "introInfo":"introInfo",
                "pricePre":"200",
                "priceNow":"100",
                "activeTag" : ""
            };
            for(let key in obj){
                defalutObj[key] = obj[key];
            }
            for(let key in defalutObj){
                this[key] = defalutObj[key];
            }
            this.myDom = null;
            this.createUI();
        }
 }
    cell_Product.prototype.createUI = function(){
    /**
     * 方法的实现:初始化我的盒子的样式
     * @return {[type]} [description]
     */
    
    
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
        //这就是父元素的一系列操作
        this.myDom.append("<img />").append("<h6></h6>").append("<p></p>").append("<span></span>").append("<span></span>");
        //
        // this.myDom.children().eq(0).attr("src","");
        // 每次传进来的时候就进行每一个元素的设置
        // 图片
        this.myDom.children().eq(0).attr("src",this.infoImg);
        //介绍的标题
        this.myDom.children().eq(1).html(this.introTitle);
        //介绍的信息 
        this.myDom.children().eq(2).html(this.introInfo);
        //价格
        this.myDom.children().eq(3).attr("class","666");
        this.myDom.children().eq(3).html(this.priceNow);

        //原先的价格
        this.myDom.children().eq(4).html(this.pricePre);

    }
   /**
    * 设置界面的调用
    * @param  {[type]} let i             [description]
    * @return {[type]}     [description]
    */
    for(let i =0;i<2;i++){

        let $top = i*330;

        for(let j = 0 ;j<4;j++){
            if(i == 1 && j ==3){
                break;
            }
            let $left = j*300;
            new cell_Product({
           
            "parentDom":$("#box"),
            "left":$left,
            "top":$top
                
         });
        }
    }



for(let i =0;i<2;i++){

        let $top = 666+i*330;

        for(let j = 0 ;j<4;j++){
            if(i == 1 && j ==3){
                break;
            }
            let $left = j*300;
            new cell_Product({
           
            "parentDom":$("#box2"),
            "left":$left,
            "top":$top,
            "background":"green",
            "infoImg":"img/3.png"
                
         });
        }
    }
      