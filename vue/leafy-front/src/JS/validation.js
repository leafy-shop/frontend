import cryptoJs from 'crypto-js';
const key=`${import.meta.env.VITE_BASE_INFORMATION_KEY}`

 const ft ={
    scroll (type=undefined,class_name=undefined,amountMove=undefined){
        // console.log(type)
        // console.log(class_name)
        // type=undefined
        // amountMove=undefined
        if(class_name==undefined ||type==undefined){
            
            this.function_Status('scroll',false,'class_name and type must not undefined !'+'\n'+` type : ${type}`+'\n'+` class name : ${class_name}`)
            
        }else{
            const designerList = document.querySelector(`${class_name}`)
            const direction= type==="previous"?-1:1
            //สำหรับเคลื่อนที่ว่าจะไปตำแหน่งไหน ใส่เลขเองหรือตามขนาดของแทคนั้น
            const scrollAmount = amountMove==undefined?(designerList.clientWidth-32)*direction:amountMove*direction
            console.log("scroll Amout :"+scrollAmount)
            designerList.scrollBy({left:scrollAmount,behavior:"smooth"})
        }
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
    },
    clickingTest(text){
        console.log("clicking : "+text)
    },
    navigationTo(type){
        // let element = document.getElementsByClassName("wrapper_filter")
        // return navigate.scrollIntoView({behavior:'smooth'})
        if(type==undefined) return window.scrollTo({ top:0});
        else return window.scrollTo({ top:0,behavior: "smooth"});
    },
    text(text,length){

    },
    encrypt(text=''){
        // console.log('Testing : '+JSON.stringify(obj))
        let encryptData = cryptoJs.AES.encrypt(text,key).toString(cryptoJs.enc.Utf8)
        // this.set(cookieName,encryptData)
        // console.log(encryptData)
        return encryptData
      },
      decrypt(text){
        // let cookieValue=this.get(cookieName)
        if(text==undefined){
          this.function_Status('Decrypt',false,'text is null')
          return ''
        }else{
          let decryptData = cryptoJs.AES.decrypt(text,key).toString(cryptoJs.enc.Utf8)
          // console.log(decryptData)
          this.function_Status('Decrypt',true,'decrypt successfull!!')
          return decryptData
        }
      },
}

export default ft


