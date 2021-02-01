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

}


function $(arg){
    return new Jq(arg)
}