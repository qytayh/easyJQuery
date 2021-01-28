class Jq{
    constructor(arg){
        let ele = document.querySelectorAll(arg)
        ele.forEach((el,index)=>{
            this[index] = el
        })
        this.length = ele.length
    }
    click(fn){
        for(let i = 0;i<this.length;i++){
            this[i].addEventListener("click",fn,false)
        }        
    }

}


function $(arg){
    return new Jq(arg)
}