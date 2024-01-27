import axios from 'axios';
import validation from '../JS/validation'
import cookie from './cookie'
let origin = `${import.meta.env.VITE_BASE_URL}`;
axios.defaults.withCredentials = true;

let returnData = { status: 500, data: undefined }

const fetch = {
    // homepage page
    getGardenDesigner: async () => {
        // let returnData={status:false,data:undefined}
        try {
            let url = `${origin}/api/users/garden_designer`
            let res = await axios.get(url)

            if (res.data.page == 0 || res.data.page == undefined || res.data.page == null) {
                validation.function_Status('get all garden designer', false, "cannot get all garden designer from back-end!!!")
            } else {
                validation.function_Status('get all garden designer', true,)
                returnData.status = res.status == 200
                returnData.data = res.data
            }
            return returnData

        } catch (error) {
            validation.function_Status('get all garden designer', false, error)
            return returnData
        }
    },
    getAllReview: async () => {
        // let returnData={status:false,data:undefined}
        try {
            let url = `${origin}/api/products/all/reviews?page=1`
            let res = await axios.get(url)

            if (res.data.page == 0 || res.data.page == undefined || res.data.page == null) {
                validation.function_Status('get all reviews', false, "cannot get all latest product reviews from back-end!!!")
            } else {
                validation.function_Status('get all reviews', true,)
                returnData.status = res.status == 200
                returnData.data = res.data
            }
            return returnData

        } catch (error) {
            validation.function_Status('get all reviews', false, error)
            return returnData
        }
    },
    // Image provider
    getImage: async (endpoint, id) => {
        try {
            let url = `${origin}/api/image/${endpoint}/${id}`
            let res = await axios.get(url)

            if (res.data.page == 0 || res.data.page == undefined || res.data.page == null) {
                validation.function_Status('get all icon garden designer', false, "cannot get all icon garden designer from back-end!!!")
            } else {
                validation.function_Status('get all icon garden designer', true,)
                returnData.status = res.status == 200
                returnData.data = res.data
                console.log(returnData)
            }
            return returnData

        } catch (error) {
            validation.function_Status('get all icon garden designer', false, error)
            return returnData
        }
    },

    // product shop page
    getAllProduct: async (page = 1, searchItem = "", type = [], min, max, rating = 0, tag = [], sort_name = undefined, sort = undefined) => {
        let returnData={status:false,data:undefined}
        try {
            // let productList =[]

            let url = `${origin}/api/products?page=${page}`
            if (searchItem.length !== 0) url = url + `&product=${searchItem}`;
            if (type.length !== 0) url = url + `&type=${type}`;
            if (min > 0) url = url + `&min_price=${min}`;
            if (max !== Infinity&&max!=undefined) url = url + `&max_price=${max}`;
            if (rating !== 0) url = url + `&rating=${rating}`;
            if (tag !== "") url = url + `&tag=${tag}`;
            if (sort_name !== undefined) url = url + `&sort_name=${sort_name}`;
            if (sort !== undefined) url = url + `&sort=${sort}`;

            console.log(url)

            let res = await axios.get(url)

            if (res.data.page == 0 || res.data.page == undefined || res.data.page == null) {
                validation.function_Status('get all product', false, "cannot get all product from back-end!!!")
            } else {
                validation.function_Status('get all product', true,)
                returnData.status = res.status == 200
                returnData.data = res.data
            }
            return returnData

        } catch (error) {
            validation.function_Status('get all product', false, error)
            return returnData
        }

    },
    getProductDetail: async(productId)=>{
        let returnData={status:false,data:undefined}
        try {
            let url = `${origin}/api/products/${productId}`
            let res = await axios.get(url)

            if (res.data == {} || res.data === null) {
                validation.function_Status('get product detail id ' + productId, false, "cannot get product detail from back-end!!!")
            } else {
                validation.function_Status('get product detail id ' + productId, true,)
                returnData.status = res.status == 200
                returnData.data = res.data
            }
            return returnData
        } catch (error) {
            validation.function_Status('get product detail id ' + productId, false, error)
            return returnData
        }
        
    },
    // authentication
    login: async (email = undefined, password = undefined) => {
        let returnData ={
            msg:"",
            status:undefined
        }
        if (email != undefined || password != undefined) {
            try {
                let url = `${origin}/api/authentication`
                let userInfo = { "email_phone": email, "password": password }
                let res = await axios.post(url, userInfo)
                // console.log(res.data)
                cookie.encrypt(res.data, "information")
                // cookie.decrypt("information")
                validation.function_Status("login", true)
                returnData.status=true
                return returnData
            } catch (error) {
                validation.function_Status("login", false, error)
                console.log(error) 

                console.log(error.response.status) 
                // error 404
                if(error.response.status==404||error.response.status==401){
                    returnData.msg=error.response.data.error
                    returnData.status=false
                }else{
                // error
                    console.log("another error")
                }
                return returnData
            }

        } else {
            validation.function_Status("login", false, "cannot login!!!" + '\n' + "because email or password is wrong format")
            return false
        }
    },
    getRefresh: async () => {
        let information = cookie.decrypt("information")
        let returnData = { status: 500, data: undefined }
        // console.log(information.email)
        if (information !== undefined) {
            try {
                let url = `${origin}/api/authentication/refresh`

                let userInfo = { "email_phone": information.email }

                let res = await axios.post(url, userInfo)
                validation.function_Status("refresh", true)

                returnData.data = res.data
                returnData.status = res.status

                return returnData
            } catch (error) {
                validation.function_Status("refresh", false, error)
                return false
            }
        }
        return -1
    },
}
export default fetch