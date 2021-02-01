class Jq{
    constructor(arg,root){
        if(typeof root === 'undefined'){
            this['prevObject']=[document]
        }else{
            this['prevObject'] = root;
        }
        if(typeof arg === 'function'){
            //dom结构加载完毕执行
            this.ready(arg)
        }else if(typeof arg === 'string'){
            let ele = document.querySelectorAll(arg)
            this.addElement(ele)
        }else{
            //传入原生节点
            if(typeof arg.length === 'undefined'){
                //传入一个对象
                this[0]=arg
                this.length=1
            }else{
                //传入多个对象节点
                this.addElement(arg)
            }
        }
        
        
    }
    end(){
        return this['prevObject']
    }
    eq(index){
        return new Jq(this[index],this)
    }
    get(index){
        //返回原生节点
        return this[index];
    }
    ready(arg){
        window.addEventListener('DOMContentLoaded',arg,false)
    }
    click(fn){
        for(let i = 0;i<this.length;i++){
            this[i].addEventListener("click",fn,false)
        }        
    }
    addElement(ele){
        ele.forEach((el,index)=>{
            this[index] = el
        })
        this.length = ele.length
    }
    on(eventName,fn){
        let reg = /\s+/g;
        eventName = eventName.replace(reg," ")
        let arr = eventName.split(' ')
        for(let i = 0;i<this.length;i++){
            for(let j=0;j<arr.length;j++){
                this[i].addEventListener(arr[j],fn,false)
            }
        }       
    }
    css(...arg){
        if(arg.length===1){
            if(typeof arg[0]==="string"){
                //字符串  获取样式
                if(arg[0] in $.cssHooks){
                    return $.cssHooks[arg[0]].get(this[0])
                }
                return this.getStyle(this[0],arg[0])
            }else{
                //传入的是对象
                for(let i=0;i<this.length;i++){
                    for(let j in arg[0]){
                        this.setStyle(this[i],j,arg[0][j])
                    }
                }
            }
        }else{
            //多个参数
            for(let i=0;i<this.length;i++){
                this.setStyle(this[i],arg[0],arg[1])
            }
        }
    }
    setStyle(ele,styleName,styleValue){
        if(typeof styleValue === "number" && !(styleValue in $.cssNumber)){
            styleValue = styleValue+'px'
        }
        if(styleName in $.cssHooks){
            $.cssHooks[styleName].set(ele,styleValue)
        }else{
            ele.style[styleName] = styleValue
        }
    }
    getStyle(ele,styleName){
        return window.getComputedStyle(ele,null)[styleName];
    }
}


function $(arg){
    return new Jq(arg)
}

//cssHooks
$.cssHooks = {}

//不需要加单位
$.cssNumber = {
    animationIterationCount: true,
    columnCount: true,
    fillOpacity: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    gridArea: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true,
    zoom: true
} 