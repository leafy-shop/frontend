import cryptoJs from 'crypto-js';
import Cookies from 'js-cookie';
import validation from './validation'
const key=`${import.meta.env.BASE_INFORMATION_COOKIE}`
const cookieName='information'
let cookie = {

    encrypt(obj={}){
      // console.log('Testing : '+JSON.stringify(obj))
      let encryptData = cryptoJs.AES.encrypt(JSON.stringify(obj),key).toString()
      this.set(cookieName,encryptData)
      // console.log(encryptData)
    },
    decrypt(){
      let cookieValue=this.get(cookieName)
      if(cookieValue==undefined){
        validation.function_Status('Decrypt',false,'cookie is null')
        return undefined
      }else{
        let decryptData = JSON.parse(cryptoJs.AES.decrypt(cookieValue,key).toString(cryptoJs.enc.Utf8))
        // console.log(decryptData)
        validation.function_Status('Decrypt',true,'its work!!')
        return decryptData
      }
    },
    get(cname){
        return Cookies.get(cname)
    },
    set(cname, cvalue){
      Cookies.set(cname,cvalue)
        // const d = new Date();
        // d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
        // let expires = "expires="+d.toUTCString();
        // document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;sameSite=Strict";
    },
    remove(cname) {
        Cookies.remove(cname)
        // const d = new Date();
        // d.setTime(0);
        // let expires = "expires="+d.toUTCString();
        // document.cookie = cname + "=expired" + ";" + expires + ";path=/";
    }
}

export default cookie