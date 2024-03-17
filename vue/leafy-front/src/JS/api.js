import axios from 'axios';
import validation from '../JS/validation'
import cookie from '../JS/cookie'
let origin = `${import.meta.env.VITE_BASE_URL}`;
axios.defaults.withCredentials = true;


const fetch = {
    // homepage page
    async getGardenDesigner(){
        let returnData = { status: false, data: undefined, msg:'' }

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
            if(error.code=="ERR_NETWORK"){//check back-end server error
                returnData.msg="Server Error try again later"
                returnData.status=false
                return returnData
            }
            else{

            }
        }
    },
     async getAllReview(){
        let returnData = { status: false, data: undefined, msg:'' }

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
            if(error.code=="ERR_NETWORK"){//check back-end server error
                returnData.msg="Server Error try again later"
                returnData.status=false
                return returnData
            }
            else{

            }
        }
    },
    // Image provider
    async getImage(endpoint, id,type){
        // let returnData = { status: false, data: undefined, msg:'' }
        let returnData = { status: false,data:undefined }

        try {
            let url = `${origin}/api/image/${endpoint}/${id}`
            url+=type!=undefined?`/${type}`:''
            let res = await axios.get(url)

            if (res.status == 200) {
                validation.function_Status('Image founded.', true,`type: ${type}`)
                returnData.status = true
                
                returnData.data=res.data
                
            } else {
                validation.function_Status('Cannot get image', false, res.message)
                
                // validation.msg=res.message
            }
            return returnData

        } catch (error) {
            validation.function_Status('Cannot get image', false, error)
            if(error.code=="ERR_NETWORK"){//check back-end server error
                returnData.msg="Server Error try again later"
                returnData.status=false
                
            }
            else{
                returnData.status=false
            }
            return returnData
        }
    },
    async addImage(data,endpoint, id,type){
        // let returnData = { status: false, data: undefined, msg:'' }
        let returnData = { status: false }
        const formData = new FormData();
        try {
            let url = `${origin}/api/image/${endpoint}/${id}`
            url+=type!=undefined?`/${type}`:''

            formData.append('file',data)

            let res = await axios.post(url,formData)

            if (res.status == 201) {
                validation.function_Status('Image updated.', true,`type: ${type}`)
                returnData.status = true
                // returnData.status = true
                // returnData.data = res.data
                // console.log(returnData)
            } else {
                validation.function_Status('Cannot update image', false, res.message)
                
                // validation.msg=res.message
            }
            return returnData

        } catch (error) {
            validation.function_Status('Cannot get image', false, error)
            if(error.code=="ERR_NETWORK"){//check back-end server error
                returnData.msg="Server Error try again later"
                returnData.status=false
            }
            else{
                returnData.status=false
            }
            return returnData
        }
    },
    async deleteImage(endpoint, id,type){
        // let returnData = { status: false, data: undefined, msg:'' }
        let returnData = { status: false }
        try {
            let url = `${origin}/api/image/${endpoint}/${id}`
            url+=type!=undefined?`/${type}`:''
            let res = await axios.delete(url)
            if (res.status == 200) {
                validation.function_Status('Image deleted.', true,`type: ${type}`)
                returnData.status = true
                // returnData.status = true
                // returnData.data = res.data
                // console.log(returnData)
            } else {
                validation.function_Status('Cannot delete image', false, res.message)
                
                // validation.msg=res.message
            }
            return returnData

        } catch (error) {
            validation.function_Status('Cannot delete image', false, error)
            if(error.code=="ERR_NETWORK"){//check back-end server error
                returnData.msg="Server Error try again later"
                returnData.status=false
                
            }
            else{
                returnData.status=false
            }
            return returnData
        }
    },
    async updateImage(data,endpoint, id,type){
        // let returnData = { status: false, data: undefined, msg:'' }
        let returnData = { status: false }
        
        let {status}=await this.getImage(endpoint, id,type)
    
        if (status) {
            let deleteRes=await this.deleteImage(endpoint, id,type)
            let addRes=await this.addImage(data,endpoint, id,type)
            if(deleteRes.status==true&&addRes.status==true){
                returnData.status=true
                validation.function_Status('updated image successful', true)
            }else{
                validation.function_Status('Cannot update image ', false)
            }
        } else {
            let addRes=await this.addImage(data,endpoint, id,type)
            // validation.msg=res.message
            validation.function_Status('updated image ', addRes.status)

            returnData.status=addRes.status
        }
        return returnData

    },
    
    // product shop page
     async getAllProduct(page = 1,limitP= 18, searchItem = "", type = [], min, max, rating = 0, tag = [], sort_name = undefined, sort = undefined, owner= undefined){
        let returnData = { status: false, data: undefined, msg:'' }
        console.log('startttttttttttttttt')
        console.log(owner)
        try {
            let url = `${origin}/api/products?page=${page}`
            if (searchItem.length !== 0) url += `&product=${searchItem}`;
            if (type.length !== 0) url += `&type=${type}`;
            if (min > 0) url += `&min_price=${min}`;
            if (max !== Infinity&&max!=undefined) url += `&max_price=${max}`;
            if (rating !== 0) url += `&rating=${rating}`;
            if (tag.length !== 0) url += `&tag=${tag}`;
            if (sort_name !== undefined ) url += `&sort_name=${sort_name}`;
            if (sort !== undefined) url += `&sort=${sort}`;
            if (owner != undefined) url += `&owner=${owner}`
            if (limitP!==undefined) url+=`&limit=${limitP}`

            console.log(url)

            let res = await axios.get(url)

            if (res.data.page == 0 || res.data.page == undefined || res.data.page == null) {
                validation.function_Status('get all product', false, "cannot get all product from back-end!!!")
            } else {
                validation.function_Status('get all product', true,)
                returnData.status = res.status == 200
                // returnData.status = true
                returnData.data = res.data
            }
            return returnData

        } catch (error) {
            validation.function_Status('get all product', false, error)
            if(error.code=="ERR_NETWORK"){//check back-end server error
                returnData.msg="Server Error try again later"
                returnData.status=false
                return returnData
            }
            else{

            }
        }

    },

    // get recommend product list
    // product shop page
    async getAllRecommendProduct(page = 1, limit=18){
        let returnData = { status: false, data: undefined, msg:'' }
        // console.log('startttttttttttttttt')
        // console.log(owner)
        try {
            let url = `${origin}/api/products?page=${page}&limit=${limit}&isRecommend=true`

            // console.log(url)

            let res = await axios.get(url)

            if (res.data.page == 0 || res.data.page == undefined || res.data.page == null) {
                validation.function_Status('get all product', false, "cannot get all product from back-end!!!")
            } else {
                validation.function_Status('get all product', true,)
                returnData.status = res.status == 200
                // returnData.status = true
                returnData.data = res.data
            }
            return returnData

        } catch (error) {
            validation.function_Status('get all product', false, error)
            if(error.code=="ERR_NETWORK"){//check back-end server error
                returnData.msg="Server Error try again later"
                returnData.status=false
                return returnData
            }
            else{

            }
        }

    },

    // product detail page
   async getProductDetail (productId){
        let returnData = { status: false, data: undefined, msg:'' }

        try {
            let url = `${origin}/api/products/${productId}`
            let res = await axios.get(url)

            if (res.data == {} || res.data === null) {
                validation.function_Status('get product detail id ' + productId, false, "cannot get product detail from back-end!!!")
            } else {
                validation.function_Status('get product detail id ' + productId, true,)
                returnData.status = res.status == 200
                // returnData.status = true
                returnData.data = res.data
            }
            return returnData
        } catch (error) {
            validation.function_Status('get product detail id ' + productId, false, error)
            if(error.code=="ERR_NETWORK"){//check back-end server error
                returnData.msg="Server Error try again later"
                returnData.status=false
                return returnData
            }
            else{

            }
        }
        
    },

   async getStore(owner){
        let returnData = { status: false, data: undefined, msg:'' }
        console.log(owner,'item owner')
        try {
            // let url = `${origin}/api/users/views/${owner}`
            let url = `${origin}/api/users/views/${owner}`
            let res = await axios.get(url)

            if (res.data == null || res.data == undefined) {
                validation.function_Status('get product owner ' + owner, false, "cannot get all garden designer from back-end!!!")
            } else {
                validation.function_Status('get product owner ' + owner, true,)
                // returnData.status = res.status == 200
                returnData.status = true
                returnData.data = res.data
            }
            return returnData

        } catch (error) {
            validation.function_Status('get product owner', false, error)
            if(error.code=="ERR_NETWORK"){//check back-end server error
                returnData.msg="Server Error try again later"
                returnData.status=false
                return returnData
            }
            else{

            }
        }
    },
    async getProductReview (id, page=1, sort='newest', name=""){
        let returnData = { status: false, data: undefined, msg:'' }

        try {
            let url = `${origin}/api/products/${id}/reviews?&page=${page}&sort=${sort}`
            if (name !== "") url += `&style=${name}`
            let res = await axios.get(url)
            console.log(url)

            if (res.data.page == 0 || res.data.page == undefined || res.data.page == null) {
                validation.function_Status('get product owner review', false, "cannot get all garden designer from back-end!!!")
            } else {
                validation.function_Status('get product owner review', true,)
                returnData.status = res.status == 200
                // returnData.status = true
                returnData.data = res.data
            }
            return returnData

        } catch (error) {
            validation.function_Status('get product owner review', false, error)
            if(error.code=="ERR_NETWORK"){//check back-end server error
                returnData.msg="Server Error try again later"
                returnData.status=false
                return returnData
            }
            else{

            }
        }
    },
    async getUserById(id){
        let returnData = { status: false, data: undefined, msg:'' }
        try {
            let url=`${origin}/api/users/${id}`
            let res = await axios.get(url)

            if ( res.data == undefined) {
                validation.function_Status('get user detail', false, `cannot get user detail id:${id}`)
            } else {
                validation.function_Status('get user detail', true,`get user detail id :${id}`)
                returnData.status = res.status == 200
                returnData.data = res.data
            }
            return returnData
        } catch (error) {
            validation.function_Status('get user detail', false, error)
            if(error.code=="ERR_NETWORK"){//check back-end server error
                returnData.msg="Server Error try again later"
                returnData.status=false
                return returnData
            }
            else{

            }
        }
    },
    async updataUserInfo(inputData){
        let returnData = { status: false, msg:'' }
        try {
            let url=`${origin}/api/users/views/edit`
            let res = await axios.patch(url,inputData)

            if ( res.status == 200) {
                validation.function_Status('update user info', true,`updated user info successful.`)
                returnData.status = true
                returnData.data = res.data
            } else {
                validation.function_Status('update user info', false, `cannot update user `)
            }
            return returnData
        } catch (error) {
            validation.function_Status('update user info', false, error)
            if(error.code=="ERR_NETWORK"){//check back-end server error
                returnData.msg="Server Error try again later"
                returnData.status=false
                return returnData
            }
            else{
                
            }
        }
    },
    async getAllPayment(username){
        let returnData = { status: false, data: undefined, msg:'' }
        try {
            let url=`${origin}/api/payments/${username}`
            let res = await axios.get(url)

            if ( res.status==200) {
                validation.function_Status('get user payment all', true)
                returnData.status = true
                returnData.data=res.data
            }
            return returnData
        } catch (error) {
            validation.function_Status('get user payment all', false, error)
            if(error.code=="ERR_NETWORK"){//check back-end server error
                returnData.msg="Server Error try again later"
                returnData.status=false
                return returnData
            }
            else{

            }
        }
    },
    async getPaymentById(username,paymentId){
        let returnData = { status: false, data: undefined, msg:'' }
        // console.log(username,paymentId,'get payment by id')
        try {
            let url=`${origin}/api/payments/${username}/${paymentId}`
            let res = await axios.get(url)

            if ( res.status==200) {
                validation.function_Status('get payment by id', true)
                returnData.status = true
                returnData.data=res.data
            }
            return returnData
        } catch (error) {
            validation.function_Status('get payment by id', false, error)
            if(error.code=="ERR_NETWORK"){//check back-end server error
                returnData.msg="Server Error try again later"
                returnData.status=false
                return returnData
            }
            else{

            }
        }
    },
    async addPayment(inputData){
        let returnData = { status: false, msg:'' }

        if (inputData!=undefined) {
            try {
                let url = `${origin}/api/payments`
                let res = await axios.post(url, inputData)
                // console.log(res.data)
                // cookie.decrypt("information")
                if(res.status==201){
                    validation.function_Status("add payment", true)
                    returnData.status=true
                
                }
                return returnData

            } catch (error) {
                validation.function_Status("Can not add payment", false, error)
                // console.log(error) 

                if(error.code=="ERR_NETWORK"){//check back-end server error
                    returnData.msg="Server Error try again later"
                    returnData.status=false
                    return returnData
                }
                else
                // error 404
                if(error.response.status==400||error.response.status==401||error.response.status==403){
                    returnData.msg=error.response.data.error
                    returnData.status=false
                }else{
                // error
                    console.log("another error")
                }
                return returnData
            }

        } else {
            validation.function_Status("Add payment", false, "cannot add payment"+'\n'+"because some data missing.")
            returnData.status=false
            returnData.msg="Please input information"
            return returnData
        }
    },
    async updatePaymentById(username,paymentId,inputData){
        let returnData = { status: false, msg:'' }
        console.log(username,)
        if (inputData!=undefined) {
            try {
                let url = `${origin}/api/payments/${username}/${paymentId}`
                let res = await axios.patch(url, inputData)
                // console.log(res.data)
                // cookie.decrypt("information")
                if(res.status==200){
                    validation.function_Status("payment updated", true)
                    returnData.status=true
                
                }
                return returnData

            } catch (error) {
                validation.function_Status("Can not update payment", false, error)
                // console.log(error) 

                if(error.code=="ERR_NETWORK"){//check back-end server error
                    returnData.msg="Server Error try again later"
                    returnData.status=false
                    return returnData
                }
                else
                // error 404
                if(error.response.status==400||error.response.status==401||error.response.status==403){
                    returnData.msg=error.response.data.error
                    returnData.status=false
                }else{
                // error
                    console.log("another error")
                }
                return returnData
            }

        } else {
            validation.function_Status("Update payment", false, "cannot update payment"+'\n'+"because some data missing.")
            returnData.status=false
            returnData.msg="Please input information"
            return returnData
        }
    },
    async deletePaymentById(username,addressId){
        // let returnData = { status: false, data: undefined, msg:'' }
        let returnData = { status: false ,msg:''}
        try {
            let url = `${origin}/api/payments/${username}/${addressId}`
            let res = await axios.delete(url)
            if (res.status == 200) {
                validation.function_Status('Payments deleted.', true,)
                returnData.status = true
            }
            return returnData

        } catch (error) {
            validation.function_Status('Cannot delete payment', false, error)
            if(error.code=="ERR_NETWORK"){//check back-end server error
                returnData.msg="Server Error try again later"
                returnData.status=false
            }
            else{
                returnData.status=false
            }
            return returnData
        }
    },
    async getAllAddress(username){
        let returnData = { status: false, data: undefined, msg:'' }
        try {
            let url=`${origin}/api/addresses/${username}`
            let res = await axios.get(url)

            if ( res.status==200) {
                validation.function_Status('get user address all', true)
                returnData.status = true
                returnData.data=res.data
            }
            return returnData
        } catch (error) {
            validation.function_Status('get user detail', false, error)
            if(error.code=="ERR_NETWORK"){//check back-end server error
                returnData.msg="Server Error try again later"
                returnData.status=false
                return returnData
            }
            else{

            }
        }
    },
    async getAddressById(username,addressId){
        let returnData = { status: false, data: undefined, msg:'' }
        try {
            let url=`${origin}/api/addresses/${username}/${addressId}`
            let res = await axios.get(url)

            if ( res.status==200) {
                validation.function_Status('get user address by id', true)
                returnData.status = true
                returnData.data=res.data
            }
            return returnData
        } catch (error) {
            validation.function_Status('get user address by id', false, error)
            if(error.code=="ERR_NETWORK"){//check back-end server error
                returnData.msg="Server Error try again later"
                returnData.status=false
                return returnData
            }
            else{

            }
        }
    },
    async addAddress(inputData){
        let returnData = { status: false, msg:'' }

        if (inputData!=undefined) {
            try {
                let url = `${origin}/api/addresses`
                let res = await axios.post(url, inputData)
                // console.log(res.data)
                // cookie.decrypt("information")
                if(res.status==201){
                    validation.function_Status("add address", true)
                    returnData.status=true
                
                }
                return returnData

            } catch (error) {
                validation.function_Status("Can not add address", false, error)
                // console.log(error) 

                if(error.code=="ERR_NETWORK"){//check back-end server error
                    returnData.msg="Server Error try again later"
                    returnData.status=false
                    return returnData
                }
                else
                // error 404
                if(error.response.status==400||error.response.status==401||error.response.status==403){
                    returnData.msg=error.response.data.error
                    returnData.status=false
                }else{
                // error
                    console.log("another error")
                }
                return returnData
            }

        } else {
            validation.function_Status("Add address", false, "cannot add address"+'\n'+"because some data missing.")
            returnData.status=false
            returnData.msg="Please input information"
            return returnData
        }
    },
    async updateAddressById(username,addressId,inputData){
        let returnData = { status: false, msg:'' }

        if (inputData!=undefined) {
            try {
                let url = `${origin}/api/addresses/${username}/${addressId}`
                let res = await axios.patch(url, inputData)
                // console.log(res.data)
                // cookie.decrypt("information")
                if(res.status==200){
                    validation.function_Status("address updated", true)
                    returnData.status=true
                
                }
                return returnData

            } catch (error) {
                validation.function_Status("Can not update address", false, error)
                // console.log(error) 

                if(error.code=="ERR_NETWORK"){//check back-end server error
                    returnData.msg="Server Error try again later"
                    returnData.status=false
                    return returnData
                }
                else
                // error 404
                if(error.response.status==400||error.response.status==401||error.response.status==403){
                    returnData.msg=error.response.data.error
                    returnData.status=false
                }else{
                // error
                    console.log("another error")
                }
                return returnData
            }

        } else {
            validation.function_Status("Update address", false, "cannot update address"+'\n'+"because some data missing.")
            returnData.status=false
            returnData.msg="Please input information"
            return returnData
        }
    },
    async deleteAddressById(username,addressId){
        // let returnData = { status: false, data: undefined, msg:'' }
        let returnData = { status: false ,msg:''}
        try {
            let url = `${origin}/api/addresses/${username}/${addressId}`
            let res = await axios.delete(url)
            if (res.status == 200) {
                validation.function_Status('Address deleted.', true,`username ${username}`)
                returnData.status = true
            }
            return returnData

        } catch (error) {
            validation.function_Status('Cannot delete address', false, error)
            if(error.code=="ERR_NETWORK"){//check back-end server error
                returnData.msg="Server Error try again later"
                returnData.status=false
            }
            else{
                returnData.status=false
            }
            return returnData
        }
    },
    // authentication
    async login(email = undefined, password = undefined){
        let returnData = { status: false, msg:'' }

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
                // console.log(error) 

                if(error.code=="ERR_NETWORK"){//check back-end server error
                    returnData.msg="Server Error try again later"
                    returnData.status=false
                    return returnData
                }
                else
                // error 404
                if(error.response.status==404||error.response.status==401||error.response.status==403){
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
            returnData.status=false
            returnData.msg="Please input information"
            return returnData
        }
    },
    
    async signOut(){
        let information = cookie.get("information")
        let returnData = { status: false, msg: '' }
        // console.log(information.email)
        
        if (information !== undefined) {
            try {
                let url = `${origin}/api/authentication/signout`

                let res = await axios.get(url)
                // validation.function_Status("sign out", true)
                if(res.status==200){
                    returnData.msg = 'Sign out successful'
                    returnData.status = true                    
                }else{
                    returnData.msg ='Can not sign out.'
                    returnData.status = false
                }
                // remove information account in client cookie
                // cookie.remove("information")

                return returnData
            } catch (error) {
                validation.function_Status("sign out", false, error)
                cookie.encrypt(res.data, "information")
                if(error.code=="ERR_NETWORK"){//check back-end server error
                    returnData.msg="Server Error try again later"
                    returnData.status=false
                    return returnData
                }
                else{

                }
            }
        }
    },
    async getRefresh (){
        let information = cookie.decrypt() //get email for refresh token
        // console.log(information)
        let returnData = { status: false, msg:'' }
        if (information != undefined) {
            try {
                let url = `${origin}/api/authentication/refresh`

                // let userInfo = { "email_phone": information.email } //get email
                let userInfo = { "email": information.email } //get email


                let res = await axios.post(url, userInfo)
                // console.log(res.status)
                if(res.status==200){
                    returnData.status=true

                    console.log('refresh token')
                }else{ // 401
                    returnData.status=false
                    returnData.msg='Token is expired, need login again'
                    console.log('cannot refresh token')

                }
                return returnData

            } catch (error) {
                validation.function_Status("refresh", false, error)

                if(error.code=="ERR_NETWORK"){//check back-end server error
                    // returnData.msg="Server Error try again later"
                    // returnData.status=false
                    return false
                }
                else{

                }
            }
        }
        return -1
    },
    async signUp(userData){
        let returnData={status:undefined,msg:''}
        let {fn,ln,un,em,pw,pn}=userData
        let userInfo={
            "email": em,
            "password": pw,
            "username": un,
            "role":'user',
            "firstname": fn,
            "lastname": ln,
            "phone": pn
        }
        // let userInfo={
        //     "email": em,
        //     "password": pw,
        //     "role": "user",
        //     "username": "Test",
        //     "firstname": fn,
        //     "lastname": ln,
        //     "description": " ",
        //     "phone": pn
        // }
        let url= `${origin}/api/users`

        try {
            let res=await axios.post(url,userInfo)
            returnData.status=true
            validation.function_Status('postUser',true,res.data)
            return returnData
        } catch (error) {
            validation.function_Status('postUser',false,error)

            if(error.code=="ERR_NETWORK"){//check back-end server error
                returnData.msg="Server Error try again later"
                returnData.status=false
                return returnData
            }
            else if(error.response.status==400||error.response.status==403){
                returnData.msg=error.response.data.error
                returnData.status=false
                return returnData

            }else{
            // unknown error
                console.log("another error") 
                returnData.msg="another error"
                returnData.status=false
                return returnData
            }
            
        }
        
    }
}
export default fetch