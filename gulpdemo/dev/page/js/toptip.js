//默认属性值（提示框的默认数据，方便调用者，即调用者不传输宽，高，背景颜色等，也是可以出现提示框的）
    let defaultObj = {
        "domObj":document.body,//
        "width":100,//提示框默认的宽度是100
        "height":30,//提示框默认的高度是30
        "bgcolor":"#f1f1f1",//默认背景颜色
        "color":"#600000",//默认字体颜色
        "fontSize":"14px",//默认字体大小
        "border":"1px solid black",//默认的边框样式
        "title":"暂时无提示信息",//默认的提示信息
        "isRadius":true,//默认带圆角
        "radiusSize":5//默认圆角的大小是5px
    };

    //给属性赋值（把传入的属性值和默认属性值进行合并）
    function assignAttribute(tooltipObj,obj) {
        //合并后的对象
        let tmpObj = {};
        //1、把默认属性值赋给tmpObj
        for(let key in defaultObj){
            tmpObj[key] = defaultObj[key];
        }
        //2、把传来的属性值赋给tmpObj
        for(let key in obj){
            tmpObj[key] = obj[key];
        }

        //给tooltip对象属性进行赋值；
        for(let key in tmpObj){
            tooltipObj[key] = tmpObj[key];
        }
    }
    //一、构造函数
    function ToolTip(obj){

    }

    //创建tooltip对象对应的dom元素
    ToolTip.prototype.createUI=function () {
        //给父元素增加定位
        this.domObj.style.position="relative";
        //1、创建div
        this.toolTipDom = document.createElement("div");
        this.toolTipDom.style.cssText="position:absolute";
    }

    //修改tooltip对象对应dom元素的样式属性,并改变父元素（不同的提示框的外观不一样）
    ToolTip.prototype.updateUI=function () {
        //1、修改dom元素的样式属性
        this.toolTipDom.style.left = (this.domObj.offsetWidth-this.width)/2+ "px";
        this.toolTipDom.style.top = (this.domObj.offsetHeight-this.height)/2+"px";
        this.toolTipDom.style.width = this.width+"px";
        this.toolTipDom.style.height =this.height+ "px";
        this.toolTipDom.style.backgroundColor=this.bgcolor;
        this.toolTipDom.style.color =this.color;
        this.toolTipDom.style.fontSize =this.fontSize;
        this.toolTipDom.style.border =this.border;
        if(this.isRadius){
            this.toolTipDom.style.borderRadius = this.radiusSize+"px";
        }
        this.toolTipDom.style.display = "block";
        this.toolTipDom.innerHTML = this.title;
        //2、修改dom元素的父元素
        this.domObj.appendChild(this.toolTipDom);
    }

    //隐藏提示框
    ToolTip.prototype.hiddenUI=function () {
        this.toolTipDom.style.display = "none";
    }

    //给需要提示框的元素绑定onmouseout事件
    ToolTip.prototype.initEvent=function(){
        this.domObj.onmouseout = (event)=>{
            let evt = event || window.event;
            //如果目的地是toolTipDom元素的话，说明是离开父元素进入了子元素，不删除提示框
            if(evt.toElement==this.toolTipDom){
                return; 	
            //把提示框隐藏起来
            this.hiddenUI();
        }
    }
    //二、对外开放一个函数，这个函数的目的是控制对构造函数的调用
    let instance;//这个表示单例对象
    exports.getInstance = function (obj) {
            if(!instance){//首次使用该对象，就需要创建
                //1、JavaScript对象
                //1）、创建JavaScript的对象
                instance=new ToolTip(obj);
                //2）修改JavaScript对象（instance）属性的值
                assignAttribute(instance,obj);
                //2、javascript对象对应的dom对象
                //1）、创建javascript对象对应的dom对象div
                instance.createUI();
                //2）、修改dom对象的外观样式
                instance.updateUI();
                //3）、给dom元素加上事件
                instance.initEvent();
            }else{//不是首次使用该对象，就不需要创建，只需要修改它的属性值即可
                //1、JavaScript对象
                //1）、修改JavaScript对象（instance）属性的值
                assignAttribute(instance,obj);
                //2、javascript对象对应的dom对象
                //1)、修改dom对象的外观样式
                instance.updateUI();
                //2）、给dom元素加上事件
                instance.initEvent();
            }
            return instance;
        }