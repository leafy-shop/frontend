import cryptoJs from 'crypto-js';
import Cookies from 'js-cookie';
import validation from './validation'
const key=`${import.meta.env.VITE_BASE_INFORMATION_COOKIE}`
// const cookieName='information'
let cookie = {

    encrypt(obj={}, cookieName='information'){
      // console.log('Testing : '+JSON.stringify(obj))
      let encryptData = cryptoJs.AES.encrypt(JSON.stringify(obj),key).toString()
      this.set(cookieName,encryptData)
      // console.log(encryptData)
    },
    decrypt(cookieName='information'){
      let cookieValue=this.get(cookieName)
      // console.log(cookieValue)
      if(cookieValue==undefined){
        validation.function_Status('Decrypt',false,'cookie is null')
        return undefined
      }else{
        // console.log(key)
        let decryptData = JSON.parse(cryptoJs.AES.decrypt(cookieValue,key).toString(cryptoJs.enc.Utf8))
        // console.log(decryptData)
        validation.function_Status('Decrypt',true,'its work!!')
        return decryptData
      }
    },
    checkKeyPass(){
      let keyPass= this.get("information")
      if(keyPass!=undefined)return true;
      else return false
    }
    ,
    get(cname){
        return Cookies.get(cname)
    },
    set(cname, cvalue){
      Cookies.set(cname,cvalue, { expires: 1, sameSite: 'strict' })
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