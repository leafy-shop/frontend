 const ft ={
    scroll : (type=undefined,class_name=undefined)=>{
        if(class_name==undefined ||type==undefined){
            this.function_Status('scroll',false,'class_name and type must not undefined !')
            console.log(type)
        }else{
            const designerList = document.querySelector(`${class_name}`)
            const direction= type==="previous"?-1:1
            const scrollAmount = designerList.clientWidth*direction
            // console.log("scroll Amout :"+scrollAmount)
            designerList.scrollBy({left:scrollAmount,behavior:"smooth"})
        }
        // console.log(type)
        // console.log(n)
    },
    function_Status :(ft_name,useable,message)=>{
        if(useable==false){
            console.log(`Warning function : ${ft_name}`,'\n',`Status : ${useable}`,'\n',`Message : ${message}`)
        }else 
        if(useable==true){
            console.log(`function : ${ft_name}`,'\n',`Status : ${useable}`)
        }
       
        
    }
}

export default ft


