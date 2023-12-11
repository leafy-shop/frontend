import axios from 'axios';
import validation from '../JS/validation'
let origin = `${import.meta.env.VITE_BASE_URL}`;
axios.defaults.withCredentials = true;


const ft={
    getAllProduct:async (page=1)=>{
        let returnData={status:false,data:undefined}
        try {
            let productList =[]
            let url = `${origin}/api/products?sort=desc&page=${page}`
            let res = await axios.get(url)

            if(res.data.page==0||res.data.page==undefined||res.data.page==null){
                validation.function_Status('get all product',false,"cannot get all product from back-end!!!")
            }else{
                validation.function_Status('get all product',true,)
                returnData.status=true
                returnData.data=res.data
            }
            return returnData

        } catch (error) {
            validation.function_Status('get all product',false,error)
            return returnData
        }
        
    },
    login:async (email=undefined,password=undefined)=>{
        if(email!=undefined||password!=undefined){
            try {
                let url = `${origin}/api/authentication`
                let userInfo={"email_phone":email,"password":password}
                let res =await axios.post(url,userInfo)
                console.log(res.data)
                validation.function_Status("login",true)
                return true
            } catch (error) {
                validation.function_Status("login",false,error)
                return false
            }
            
        }else{
            validation.function_Status("login",false,"cannot login!!!"+'\n'+"because email or password is wrong format")
            return false
        }

    }
}
export default ft