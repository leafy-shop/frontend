import cryptoJs from 'crypto-js';
import ORDERSTATUS from './enum/order';
import ORDERSTATUSCOLOR from './enum/orderStatusColor';
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
            console.warn(`Warning function : ${ft_name}`,'\n',`Status : ${useable}`,'\n',`Message : ${message}`)
            return false
        }else {
            console.log(`function : ${ft_name}`,'\n',`Status : ${useable}`,'\n',`Message : ${message}`)
            return true
        }
    },
    number(number,positive=false){
        let returnStatus=undefined
        // console.log(isNaN(number))
        // console.log(typeof())
        if(!isNaN(number)){
            // console.log(isNaN(number))
            if(positive==true){
                if(number>0){
                    
                    this.function_Status("Data : "+number,true,`Number is positive : ${number}`)
                    returnStatus=true
                }else{
                    this.function_Status("Data : "+number,false,`Number is not positive : ${number}`)
                    returnStatus=false
                }
                
            }else{
                this.function_Status("Data : "+number,true,`Data is Number`)
                returnStatus=true
            }
            
        }else{
            // have problem here
            this.function_Status("Data : "+number,false,`Data is not number : ${number}`)
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
    text(text=''){
        let returnStatus=undefined
        if(text!=undefined){
            // console.log(text.length)
            // let regex = /^[a-z A-Z]+$/;
            let regex = /\d/;
            // let isText = String(text).toLowerCase().match(/[a-z]/g).length!=text.length?false:true //make new array for collect same data
            let isText = !regex.test(text)
            // this.function_Status(text,true,'ok')
            console.log(isText)
            if(isText){
                this.function_Status(text,true,'Valid text')
                return returnStatus=true
            }else{
                this.function_Status(text,false,'Invalid text')
                return returnStatus=false
            }

        }
        // else{
            
        //     this.function_Status(text,false,'please input your information!!')
        //     return returnStatus=false
        // }
    },
    textRange(text="",max,min){ //check lenght 10 - 11 only
        console.log(text)
        if(text!=undefined){
            if(max>=min&&text.length>=min&&text.length<=max){
                return true
            }else{
                return false
            }
        } else {
            return false
        }
    },
    email(text){
        if(text!=undefined){
            return String(text)
                .toLowerCase()
                .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
        }
    },
    encrypt(text=""){
        // console.log('Testing : '+JSON.stringify(obj))
        // let encryptData = cryptoJs.AES.encrypt(text,key).toString(cryptoJs.enc.Utf8)
        let encryptData = cryptoJs.AES.encrypt(text,key).toString()
        // this.set(cookieName,encryptData)
        console.log(encryptData)
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
    ratingStar(rating=0,parent="star_item",child="path"){
        let ratingFloor=Math.floor(rating)
        const star=document.getElementsByClassName(parent)
        
        //start from front
        for(let i=0;i<(ratingFloor);i++){
            // console.log(star[i])
                star[i].getElementsByTagName(child)[0].setAttribute('fill',"#FFCE3D")
        }
        //start from back
        for(let i=star.length-1;i>=0;i--){
            star[i].getElementsByTagName(child)[0].setAttribute('stroke',"#FFCE3D")
        }
    },
    getDateTime(date){
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()+2).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    calculateStatusStepColor(currentStatus){
        if(currentStatus!=undefined){
            let statusValue = Object.values(ORDERSTATUS)
            let indexCurrent =statusValue.indexOf(currentStatus)
            return ORDERSTATUSCOLOR[indexCurrent]
        }
    
    }
    
}

export default ft


