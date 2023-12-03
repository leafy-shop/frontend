 const ft ={
    scroll (type=undefined,class_name=undefined){
        console.log(type)
        type=undefined
        if(class_name==undefined ||type==undefined){
            
            this.function_Status('scroll',false,'class_name and type must not undefined !')
            
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
    function_Status (ft_name='',useable=false,message=''){
        if(!useable){
            console.log(`Warning function : ${ft_name}`,'\n',`Status : ${useable}`,'\n',`Message : ${message}`)
            return false
        }else {
            console.log(`function : ${ft_name}`,'\n',`Status : ${useable}`,'\n',`Message : ${message}`)
            return true
        }

       
        
    },
    number(number,positive=false){
        let returnStatus=false
        // console.log(isNaN(number))
        // console.log(typeof())
        if(!isNaN(number)){
            // console.log(isNaN(number))
            if(positive==true){
                if(number>0){
                    
                    this.function_Status("check number",true,`Number is positive : ${number}`)
                    returnStatus=true
                }else{
                    this.function_Status("check number",false,`Number is not positive : ${number}`)
                    returnStatus=false
                }
                
            }else{
                this.function_Status("check number",true,`Data is Number`)
                returnStatus=true
            }
            
        }else{
            // have problem here
            this.function_Status("check number",false,`Number is not number : ${number}`)
            returnStatus=false
            
        }
        return returnStatus
    }
}

export default ft


