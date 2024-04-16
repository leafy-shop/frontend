import axios from 'axios';
import validation from '../JS/validation'
import cookie from '../JS/cookie'
let origin = `${import.meta.env.VITE_BASE_URL}`;
axios.defaults.withCredentials = true;


const fetch = {
    // homepage page
    async getGardenDesigner() {
        let returnData = { status: false, data: undefined, msg: '' }

        try {
            let url = `${origin}/api/contents?sort_name=popular&sort=desc`
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
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    async getAllReview() {
        let returnData = { status: false, data: undefined, msg: '' }

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
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    // Image provider
    async getImage(endpoint, id, type) {
        // let returnData = { status: false, data: undefined, msg:'' }
        let returnData = { status: false, data: undefined }

        try {
            let url = `${origin}/api/image/${endpoint}/${id}`
            url += type != undefined ? `/${type}` : ''
            let res = await axios.get(url,{responseType:'blob'})

            if (res.status == 200) {
                validation.function_Status('Image founded.', true, `type: ${type}`)
                returnData.status = true
                // console.log(res.data,'this is img data')
                returnData.data = res.data

            } else {
                validation.function_Status('Cannot get image', false, res.message)

                // validation.msg=res.message
            }
            return returnData

        } catch (error) {
            validation.function_Status('Cannot get image', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false

            }
            else {
                returnData.status = false
            }
            return returnData
        }
    },
    async addImage(data, endpoint, id, type) {
        // let returnData = { status: false, data: undefined, msg:'' }
        let returnData = { status: false }
        const formData = new FormData();
        try {
            let url = `${origin}/api/image/${endpoint}/${id}`
            url += type != undefined ? `/${type}` : ''

            formData.append('file', data)

            let res = await axios.post(url, formData)

            if (res.status == 201) {
                validation.function_Status('Image updated.', true, `type: ${type}`)
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
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
            }
            else {
                returnData.status = false
            }
            return returnData
        }
    },
    async addImages(data, endpoint, id, type) {
        // let returnData = { status: false, data: undefined, msg:'' }
        let returnData = { status: false ,msg:""}
        const formData = new FormData();
        try {
            let url = `${origin}/api/images/${endpoint}/${id}`
            url += type != undefined ? `/${type}` : ''
            console.log(data,'from api')
            for(let img of data){
                formData.append('file', img)
            }

            let res = await axios.post(url,formData)

            if (res.status == 201) {
                validation.function_Status('Image updated.', true, `type: ${type}`)
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
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
            }
            else {
                returnData.status = false
            }
            return returnData
        }
    },
    async deleteImage(endpoint, id, type) {
        // let returnData = { status: false, data: undefined, msg:'' }
        let returnData = { status: false }
        try {
            let url = `${origin}/api/image/${endpoint}/${id}`
            url += type != undefined ? `/${type}` : ''
            let res = await axios.delete(url)
            if (res.status == 200) {
                validation.function_Status('Image deleted.', true, `type: ${type}`)
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
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false

            }
            else {
                returnData.status = false
            }
            return returnData
        }
    },
    async updateImage(data, endpoint, id, type) {
        // let returnData = { status: false, data: undefined, msg:'' }
        let returnData = { status: false }

        let { status } = await this.getImage(endpoint, id, type)

        if (status) {
            let deleteRes = await this.deleteImage(endpoint, id, type)
            let addRes = await this.addImage(data, endpoint, id, type)
            if (deleteRes.status == true && addRes.status == true) {
                returnData.status = true
                validation.function_Status('updated image successful', true)
            } else {
                validation.function_Status('Cannot update image ', false)
            }
        } else {
            let addRes = await this.addImage(data, endpoint, id, type)
            // validation.msg=res.message
            validation.function_Status('updated image ', addRes.status)

            returnData.status = addRes.status
        }
        return returnData

    },

    // product shop page
    async getAllProduct(inputData) {
        // ,page = 1,limitP= 18, searchItem = "", type = [], min, max, rating = 0, tag = [], sort_name = undefined, sort = undefined, owner= undefined
        let {
            page, // current page
            limitP, //max item per page
            searchItem, //for searching
            type, //filter by category
            min, max, //filter min & max price
            rating, //filter rating
            tag, //filter by tag
            sort_name, //filter by sort name
            sort, //filter by sort by ???
            owner //owner of product
        } = inputData
        //input format
        // {
        //     page:'', 
        // limitP:'', 
        // searchItem:'', 
        // type:'', 
        // min:'',
        // max:'', 
        // rating:'', 
        // tag:'', 
        // sort_name:'', 
        // sort:'', 
        // owner:'' 
        // } 
        let returnData = { status: false, data: undefined, msg: '' }
        console.log('startttttttttttttttt')
        console.log(owner)
        try {
            let url = `${origin}/api/products?page=${page}`
            // search value
            if (searchItem != undefined) {
                if (searchItem.length !== 0) url += `&product=${searchItem}`;
            }
            // type / category
            if (type != undefined) {
                if (type.length !== 0) url += `&type=${type}`;
            }
            // price min
            if (min != undefined) {
                if (min > 0) url += `&min_price=${min >= max ? max - 1 : min}`;
            }
            // price max
            if (max != undefined) {
                if (max !== Infinity) url += `&max_price=${max <= min ? min + 1 : max}`;
            }
            // rating
            if (rating != undefined) {
                if (rating !== 0) url += `&rating=${rating}`;
            }
            // tag
            if (tag != undefined) {
                if (tag.length !== 0) url += `&tag=${tag}`;
            }
            // type of sort
            if (sort_name !== undefined) url += `&sort_name=${sort_name}`;
            // sort by greater then  and less then
            if (sort !== undefined) url += `&sort=${sort}`;
            // owner
            if (owner != undefined) url += `&owner=${owner}`
            // limit item perpage
            if (limitP !== undefined) url += `&limit=${limitP}`
            // if (searchItem != undefined) url += `&product=${searchItem}`;
            // if (type != undefined) url += `&type=${type}`;
            // if (min!= undefined) url += `&min_price=${min}`;
            // if (max != Infinity&&max!=undefined) url += `&max_price=${max}`;
            // if (rating != undefined) url += `&rating=${rating}`;
            // if (tag!= undefined) url += `&tag=${tag}`;
            // if (sort_name != undefined) url += `&sort_name=${sort_name}`;
            // if (sort != undefined) url += `&sort=${sort}`;
            // if (owner != undefined) url += `&owner=${owner}`
            // if (limitP!= undefined) url+=`&limit=${limitP}`

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
            console.warn(error)
            validation.function_Status('get all product', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }

    },
    async getAllProductOfSupplier(inputData) {
        // ,page = 1,limitP= 18, searchItem = "", type = [], min, max, rating = 0, tag = [], sort_name = undefined, sort = undefined, owner= undefined
        let {
            page, // current page
            limitP, //max item per page
            // searchItem, //for searching
            type, //filter by category
            // min, max, //filter min & max price
            // rating, //filter rating
            // tag, //filter by tag
            sort_name, //filter by sort name
            sort, //filter by sort by ???
            owner //owner of product
        } = inputData
        //input format
        // {
        //     page:'', 
        // limitP:'', 
        // searchItem:'', 
        // type:'', 
        // min:'',
        // max:'', 
        // rating:'', 
        // tag:'', 
        // sort_name:'', 
        // sort:'', 
        // owner:'' 
        // } 
        let returnData = { status: false, data: undefined, msg: '' }
        console.log('startttttttttttttttt')
        console.log(owner)
        try {
            
            let url = `${origin}/api/products/supplier/${owner}`
            if(page==undefined)url+=`?page=${1}`;
            else url+=`?page=${page}`
            // search value
            // if (searchItem != undefined) {
            //     if (searchItem.length !== 0) url += `&product=${searchItem}`;
            // }
            // type / category
            if (type != undefined) {
                if (type.length !== 0) url += `&type=${type}`;
            }
            // price min
            // if (min != undefined) {
            //     if (min > 0) url += `&min_price=${min >= max ? max - 1 : min}`;
            // }
            // // price max
            // if (max != undefined) {
            //     if (max !== Infinity) url += `&max_price=${max <= min ? min + 1 : max}`;
            // }
            // // rating
            // if (rating != undefined) {
            //     if (rating !== 0) url += `&rating=${rating}`;
            // }
            // // tag
            // if (tag != undefined) {
            //     if (tag.length !== 0) url += `&tag=${tag}`;
            // }
            // type of sort
            if (sort_name !== undefined) url += `&sort_name=${sort_name}`;
            // sort by greater then  and less then
            if (sort !== undefined) url += `&sort=${sort}`;
            // owner
            // if (owner != undefined) url += `&owner=${owner}`
            // limit item perpage
            if (limitP !== undefined) url += `&limit=${limitP}`
            

            // console.log(url)

            let res = await axios.get(url)

            if (res.data.page == 0 || res.data.page == undefined || res.data.page == null) {
                validation.function_Status('get all product for supplier', false, "cannot get all product for supplier from back-end!!!")
            } else {
                validation.function_Status('get all product for supplier', true,)
                returnData.status = res.status == 200
                // returnData.status = true
                returnData.data = res.data
            }
            return returnData

        } catch (error) {
            console.warn(error)
            validation.function_Status('can not get all product for supplier', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }

    },
    async addProduct(inputData) {
        let returnData = { status: false, msg: '', data: undefined }
        // let {itemOwner}=inputData
        if (inputData != undefined) {
            try {
                let url = `${origin}/api/products`
                let res = await axios.post(url, inputData)
                // console.log(res.data)
                // cookie.decrypt("information")
                if (res.status == 201) {
                    validation.function_Status("add product", true)
                    returnData.data = res.data
                    returnData.status = true
                }
                return returnData

            } catch (error) {
                validation.function_Status("Can not add product", false, error)
                // console.log(error) 

                if (error.code == "ERR_NETWORK") {//check back-end server error
                    returnData.msg = "Server Error try again later"
                    returnData.status = false
                    return returnData
                }
                else
                    // error 404
                    if (error.response.status == 400 || error.response.status == 401 || error.response.status == 403) {
                        returnData.msg = error.response.data.error
                        returnData.status = false
                    } else {
                        // error
                        console.log("another error")
                    }
                return returnData
            }

        } else {
            validation.function_Status("Add address", false, "cannot add address" + '\n' + "because some data missing.")
            returnData.status = false
            returnData.msg = "Please input information"
            return returnData
        }
    },
    async deleteProductById(productId) {
        // let returnData = { status: false, data: undefined, msg:'' }
        let returnData = { status: false, msg: '' }
        try {
            let url = `${origin}/api/products/${productId}`
            let res = await axios.delete(url)
            if (res.status == 200) {
                validation.function_Status('Product deleted.', true,)
                returnData.status = true
            }
            return returnData

        } catch (error) {
            validation.function_Status('Cannot delete product ', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
            }
            else {
                returnData.status = false
            }
            return returnData
        }
    },
    async updateProduct(productId, inputData) {
        let returnData = { status: false, msg: '' }
        try {
            let url = `${origin}/api/products/${productId}`
            let res = await axios.patch(url, inputData)

            if (res.status == 200) {
                validation.function_Status('update product', true, `updated product successful.`)
                returnData.status = true
                returnData.data = res.data
            } else {
                validation.function_Status('update product', false, `cannot update product `)
            }
            return returnData
        } catch (error) {
            validation.function_Status('update product ', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    async addProductStyle(productId, inputData) {
        let returnData = { status: false, msg: '' }
        try {
            let url = `${origin}/api/products/${productId}`
            let res = await axios.post(url, inputData)

            if (res.status == 201) {
                validation.function_Status('add product style', true, `add product style successful.`)
                returnData.status = true
                returnData.data = res.data
            } else {
                validation.function_Status('add product style', false, `cannot add product style `)
            }
            return returnData
        } catch (error) {
            validation.function_Status('add product style', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    async updateProductStyle(productId, skuId, inputData) {
        let returnData = { status: false, msg: '' }
        try {
            let url = `${origin}/api/products/${productId}/${skuId}`
            let res = await axios.put(url, inputData)

            if (res.status == 200) {
                validation.function_Status('update product style', true, `updated product style successful.`)
                returnData.status = true
                returnData.data = res.data
            } else {
                validation.function_Status('update product style', false, `cannot update product style `)
            }
            return returnData
        } catch (error) {
            validation.function_Status('update product  style', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    async deleteProductStyle(productId, skuId) {
        // let returnData = { status: false, data: undefined, msg:'' }
        let returnData = { status: false, msg: '' }
        try {
            let url = `${origin}/api/products/${productId}/${skuId}`
            let res = await axios.delete(url)
            if (res.status == 200) {
                validation.function_Status('Product style deleted.', true,)
                returnData.status = true
            }
            return returnData

        } catch (error) {
            validation.function_Status('Cannot delete product style ', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
            }
            else {
                returnData.status = false
            }
            return returnData
        }
    },
    // get recommend product list
    // product shop page
    async getAllRecommendProduct(page = 1, limit = 18) {
        let returnData = { status: false, data: undefined, msg: '' }
        // console.log('startttttttttttttttt')
        // console.log(owner)
        try {
            let url = `${origin}/api/products?page=${page}&limit=${limit}&isRecommend=true`

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
            console.log(res.data)
            return returnData

        } catch (error) {
            validation.function_Status('get all product', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }

    },

    // product detail page
    async getProductDetail(productId) {
        let returnData = { status: false, data: undefined, msg: '' }

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
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }

    },
    // gallery
    async getGallery(inputData){
        let returnData = { status: false, data: undefined, msg: '' }
        let{
            page,
            limit,
            sort_name,
            style,
            contentOwner
        }= inputData
        try {
            let url = `${origin}/api/contents`
            // page
            if(page!=undefined)url+=`?page=${page}`;
            else url+=`?page=${1}`;
            // limit
            if(limit!=undefined) url+=`&limit=${limit}`;
            // contentOwner
            if(contentOwner!=undefined) url+=`&content_owner=${contentOwner}`;
            // sort name
            if(sort_name!=undefined) url+=`&sort_name=${sort_name}`;
            // style
            if(style!=undefined) url+=`&style=${style}`;
            
            let res = await axios.get(url)

            if (res.status==200) {
                returnData.status=true
                returnData.data=res.data
                validation.function_Status('get gallery ' , true)
            } 
            return returnData
        } catch (error) {
            validation.function_Status('cannot get get gallery ' , false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }

    },
    async getGalleryByOwner(inputData){
        let returnData = { status: false, data: undefined, msg: '' }
        // if(inputData!=undefined){
            let{
                page,
                sort_name,
                sort,
                style,
                limit
            }=inputData
        // }
        // console.log(sort_name,'this from api')
        try {
            let url = `${origin}/api/contents/owner`
            if(page!=undefined){
                url+=`?page=${page}`
            }else{
                url+= `?page=${1}`
            }
            if(limit!=undefined) url +=`&limit=${limit}`

            if(sort_name!=undefined) url +=`&sort_name=${sort_name}`
            if(style!=undefined) url +=`&style=${style}`
            let res = await axios.get(url)

            if (res.status==200) {
                returnData.status=true
                returnData.data=res.data
                validation.function_Status('get gallery ' , true)
            } 
            return returnData
        } catch (error) {
            validation.function_Status('cannot get get gallery ' , false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }

    },
    async getGalleryById(contentId){
        let returnData = { status: false, data: undefined, msg: '' }
        // if(inputData!=undefined){
            
        // }
        // console.log(sort_name,'this from api')
        try {
            let url = `${origin}/api/contents/${contentId}`
            // if(page!=undefined){
            //     url+=`?page=${page}`
            // }else{
            //     url+= `?page=${1}`
            // }
            // if(limit!=undefined) url +=`&limit=${limit}`

            // if(sort_name!=undefined) url +=`&sort_name=${sort_name}`
            // if(style!=undefined) url +=`&style=${style}`
            let res = await axios.get(url)

            if (res.status==200) {
                returnData.status=true
                returnData.data=res.data
                validation.function_Status('get gallery ' , true)
            } 
            return returnData
        } catch (error) {
            validation.function_Status('cannot get get gallery ' , false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }

    },
    async addGallery(inputData) {
        let returnData = { status: false, msg: '',data:undefined }
        try {
            let url = `${origin}/api/contents`
            let res = await axios.post(url, inputData)

            if (res.status == 201) {
                validation.function_Status('add gallery', true, `add gallery successful.`)
                returnData.status = true
                returnData.data = res.data
            } else {
                validation.function_Status('add gallery', false, `cannot add gallery `)
            }
            return returnData
        } catch (error) {
            validation.function_Status('add gallery', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    async updateGallery(galleryId,inputData) {
        let returnData = { status: false, msg: '' }
        try {
            let url = `${origin}/api/contents/${galleryId}`
            let res = await axios.patch(url,inputData)

            if (res.status == 200) {
                validation.function_Status('update gallery', true, `updated gallery successful.`)
                returnData.status = true
                returnData.data = res.data
            } else {
                validation.function_Status('update gallery', false, `cannot update gallery `)
            }
            return returnData
        } catch (error) {
            validation.function_Status('update gallery', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    async deleteGallery(galleryId) {
        // let returnData = { status: false, data: undefined, msg:'' }
        let returnData = { status: false, msg: '' }
        try {
            let url = `${origin}/api/contents/${galleryId}`
            let res = await axios.delete(url)
            if (res.status == 200) {
                validation.function_Status('gallery deleted.', true,)
                returnData.status = true
            }
            return returnData

        } catch (error) {
            validation.function_Status('Cannot delete gallery ', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
            }
            else {
                returnData.status = false
            }
            return returnData
        }
    },
    async getStore(owner) {
        let returnData = { status: false, data: undefined, msg: '' }
        console.log(owner, 'item owner')
        try {
            // let url = `${origin}/api/users/views/${owner}`
            let url = `${origin}/api/users/views/${owner}`
            let res = await axios.get(url)

            if (res.data == null || res.data == undefined) {
                validation.function_Status('get product owner ' + owner, false, "cannot get store from back-end!!!")
            } else {
                validation.function_Status('get product owner ' + owner, true,)
                // returnData.status = res.status == 200
                returnData.status = true
                returnData.data = res.data
            }
            return returnData

        } catch (error) {
            validation.function_Status('get product owner', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    async getProductReview(id, page = 1, sort = 'newest', name = "") {
        let returnData = { status: false, data: undefined, msg: '' }

        try {
            let url = `${origin}/api/products/${id}/reviews?&page=${page}&sort=${sort}`
            if (name !== "") url += `&style=${name}`
            let res = await axios.get(url)
            console.log(url)

            if (res.data.page == 0 || res.data.page == undefined || res.data.page == null) {
                validation.function_Status('get product owner review', false, "cannot get product owner review from back-end!!!")
            } else {
                validation.function_Status('get product owner review', true,)
                returnData.status = res.status == 200
                // returnData.status = true
                returnData.data = res.data
            }
            return returnData

        } catch (error) {
            validation.function_Status('get product owner review', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    async addReview(productId, inputData) {
        let returnData = { status: false, msg: '' }

        if (inputData != undefined) {
            try {
                let url = `${origin}/api/products/${productId}/reviews`
                let res = await axios.post(url, inputData)
                // console.log(res.data)
                // cookie.decrypt("information")
                if (res.status == 201) {
                    validation.function_Status("add review", true)
                    returnData.status = true

                }
                return returnData

            } catch (error) {
                validation.function_Status("Can not add review", false, error)
                // console.log(error) 

                if (error.code == "ERR_NETWORK") {//check back-end server error
                    returnData.msg = "Server Error try again later"
                    returnData.status = false
                    return returnData
                }
                else
                    // error 404
                    if (error.response.status == 400 || error.response.status == 401 || error.response.status == 403) {
                        returnData.msg = error.response.data.error
                        returnData.status = false
                    } else {
                        // error
                        console.log("another error")
                    }
                return returnData
            }

        } else {
            validation.function_Status("Add payment", false, "cannot add payment" + '\n' + "because some data missing.")
            returnData.status = false
            returnData.msg = "Please input information"
            return returnData
        }
    },
    async updateReviewLike(itemId, reviewId) {
        let returnData = { status: false, data: undefined, msg: '' }

        try {
            let url = `${origin}/api/products/${itemId}/reviews/${reviewId}/like`
            let res = await axios.put(url)
            console.log(url)

            if (res.data == undefined || res.data == null) {
                validation.function_Status('update review like', false, "cannot update like from back-end!!!")
            } else {
                validation.function_Status('update review like', true,)
                returnData.status = res.status == 200
                // returnData.status = true
                returnData.data = res.data
            }
            return returnData

        } catch (error) {
            validation.function_Status('get product owner review', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    async getUserById(id) {
        let returnData = { status: false, data: undefined, msg: '' }
        try {
            let url = `${origin}/api/users/${id}`
            let res = await axios.get(url)

            if (res.data == undefined) {
                validation.function_Status('get user detail', false, `cannot get user detail id:${id}`)
            } else {
                validation.function_Status('get user detail', true, `get user detail id :${id}`)
                returnData.status = res.status == 200
                returnData.data = res.data
            }
            return returnData
        } catch (error) {
            validation.function_Status('get user detail', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    async updataUserInfo(inputData) {
        let returnData = { status: false, msg: '' }
        try {
            let url = `${origin}/api/users/views/edit`
            let res = await axios.patch(url, inputData)

            if (res.status == 200) {
                validation.function_Status('update user info', true, `updated user info successful.`)
                returnData.status = true
                returnData.data = res.data
            } else {
                validation.function_Status('update user info', false, `cannot update user `)
            }
            return returnData
        } catch (error) {
            validation.function_Status('update user info', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    async getAllPayment(username) {
        let returnData = { status: false, data: undefined, msg: '' }
        try {
            let url = `${origin}/api/payments/${username}`
            let res = await axios.get(url)

            if (res.status == 200) {
                validation.function_Status('get user payment all', true)
                returnData.status = true
                returnData.data = res.data
            }
            return returnData
        } catch (error) {
            validation.function_Status('get user payment all', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    async getPaymentById(username, paymentId) {
        let returnData = { status: false, data: undefined, msg: '' }
        // console.log(username,paymentId,'get payment by id')
        try {
            let url = `${origin}/api/payments/${username}/${paymentId}`
            let res = await axios.get(url)

            if (res.status == 200) {
                validation.function_Status('get payment by id', true)
                returnData.status = true
                returnData.data = res.data
            }
            return returnData
        } catch (error) {
            validation.function_Status('get payment by id', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    async addPayment(username, inputData) {
        let returnData = { status: false, msg: '' }

        if (inputData != undefined) {
            try {
                let url = `${origin}/api/payments/${username}`
                let res = await axios.post(url, inputData)
                // console.log(res.data)
                // cookie.decrypt("information")
                if (res.status == 201) {
                    validation.function_Status("add payment", true)
                    returnData.status = true

                }
                return returnData

            } catch (error) {
                validation.function_Status("Can not add payment", false, error)
                // console.log(error) 

                if (error.code == "ERR_NETWORK") {//check back-end server error
                    returnData.msg = "Server Error try again later"
                    returnData.status = false
                    return returnData
                }
                else
                    // error 404
                    if (error.response.status == 400 || error.response.status == 401 || error.response.status == 403) {
                        returnData.msg = error.response.data.error
                        returnData.status = false
                    } else {
                        // error
                        console.log("another error")
                    }
                return returnData
            }

        } else {
            validation.function_Status("Add payment", false, "cannot add payment" + '\n' + "because some data missing.")
            returnData.status = false
            returnData.msg = "Please input information"
            return returnData
        }
    },
    async updatePaymentById(username, paymentId, inputData) {
        let returnData = { status: false, msg: '' }
        console.log(username,)
        if (inputData != undefined) {
            try {
                let url = `${origin}/api/payments/${username}/${paymentId}`
                let res = await axios.patch(url, inputData)
                // console.log(res.data)
                // cookie.decrypt("information")
                if (res.status == 200) {
                    validation.function_Status("payment updated", true)
                    returnData.status = true

                }
                return returnData

            } catch (error) {
                validation.function_Status("Can not update payment", false, error)
                // console.log(error) 

                if (error.code == "ERR_NETWORK") {//check back-end server error
                    returnData.msg = "Server Error try again later"
                    returnData.status = false
                    return returnData
                }
                else
                    // error 404
                    if (error.response.status == 400 || error.response.status == 401 || error.response.status == 403) {
                        returnData.msg = error.response.data.error
                        returnData.status = false
                    } else {
                        // error
                        console.log("another error")
                    }
                return returnData
            }

        } else {
            validation.function_Status("Update payment", false, "cannot update payment" + '\n' + "because some data missing.")
            returnData.status = false
            returnData.msg = "Please input information"
            return returnData
        }
    },
    async deletePaymentById(username, addressId) {
        // let returnData = { status: false, data: undefined, msg:'' }
        let returnData = { status: false, msg: '' }
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
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
            }
            else {
                returnData.status = false
            }
            return returnData
        }
    },
    async getAllAddress(username) {
        let returnData = { status: false, data: undefined, msg: '' }
        try {
            let url = `${origin}/api/addresses/${username}`
            let res = await axios.get(url)

            if (res.status == 200) {
                validation.function_Status('get user address all', true)
                returnData.status = true
                returnData.data = res.data
            }
            return returnData
        } catch (error) {
            validation.function_Status('get user detail', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    async getAddressById(username, addressId) {
        let returnData = { status: false, data: undefined, msg: '' }
        try {
            let url = `${origin}/api/addresses/${username}/${addressId}`
            let res = await axios.get(url)

            if (res.status == 200) {
                validation.function_Status('get user address by id', true)
                returnData.status = true
                returnData.data = res.data
            }
            return returnData
        } catch (error) {
            validation.function_Status('get user address by id', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    async addAddress(userName, inputData) {
        let returnData = { status: false, msg: '',data:undefined }

        if (inputData != undefined) {
            try {
                let url = `${origin}/api/addresses/${userName}`
                let res = await axios.post(url, inputData)
                // console.log(res.data)
                // cookie.decrypt("information")
                if (res.status == 201) {
                    returnData.data=res.data.addressId
                    validation.function_Status("add address", true)
                    returnData.status = true

                }
                return returnData

            } catch (error) {
                validation.function_Status("Can not add address", false, error)
                // console.log(error) 

                if (error.code == "ERR_NETWORK") {//check back-end server error
                    returnData.msg = "Server Error try again later"
                    returnData.status = false
                    return returnData
                }
                else
                    // error 404
                    if (error.response.status == 400 || error.response.status == 401 || error.response.status == 403) {
                        returnData.msg = error.response.data.error
                        returnData.status = false
                    } else {
                        // error
                        console.log("another error")
                    }
                return returnData
            }

        } else {
            validation.function_Status("Add address", false, "cannot add address" + '\n' + "because some data missing.")
            returnData.status = false
            returnData.msg = "Please input information"
            return returnData
        }
    },
    async updateAddressById(username, addressId, inputData) {
        let returnData = { status: false, msg: '' }

        if (inputData != undefined) {
            try {
                let url = `${origin}/api/addresses/${username}/${addressId}`
                let res = await axios.patch(url, inputData)
                // console.log(res.data)
                // cookie.decrypt("information")
                if (res.status == 200) {
                    validation.function_Status("address updated", true)
                    returnData.status = true

                }
                return returnData

            } catch (error) {
                validation.function_Status("Can not update address", false, error)
                // console.log(error) 

                if (error.code == "ERR_NETWORK") {//check back-end server error
                    returnData.msg = "Server Error try again later"
                    returnData.status = false
                    return returnData
                }
                else
                    // error 404
                    if (error.response.status == 400 || error.response.status == 401 || error.response.status == 403) {
                        returnData.msg = error.response.data.error
                        returnData.status = false
                    } else {
                        // error
                        console.log("another error")
                    }
                return returnData
            }

        } else {
            validation.function_Status("Update address", false, "cannot update address" + '\n' + "because some data missing.")
            returnData.status = false
            returnData.msg = "Please input information"
            return returnData
        }
    },
    async deleteAddressById(username, addressId) {
        // let returnData = { status: false, data: undefined, msg:'' }
        let returnData = { status: false, msg: '' }
        try {
            let url = `${origin}/api/addresses/${username}/${addressId}`
            let res = await axios.delete(url)
            if (res.status == 200) {
                validation.function_Status('Address deleted.', true, `username ${username}`)
                returnData.status = true
            }
            return returnData

        } catch (error) {
            validation.function_Status('Cannot delete address', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
            }
            else {
                returnData.status = false
            }
            return returnData
        }
    },

    async addToCart(cartInput) {
        let returnData = { status: false, msg: '' }

        if (cartInput != undefined) {
            try {
                let url = `${origin}/api/carts/products`
                let res = await axios.post(url, cartInput)

                if (res.status == 201) {
                    validation.function_Status("get owner cart for user", true)
                    returnData.status = true

                }
                return returnData

            } catch (error) {
                validation.function_Status("get owner cart for user", false, error)
                // console.log(error) 

                if (error.code == "ERR_NETWORK") {//check back-end server error
                    returnData.msg = "Server Error try again later"
                    returnData.status = false
                    return returnData
                }
                else
                    // error 404
                    if (error.response.status == 400 || error.response.status == 404 || error.response.status == 403) {
                        returnData.msg = error.response.data.error
                        returnData.status = false
                    } else {
                        // error
                        console.log("another error")
                    }
                return returnData
            }

        } else {
            validation.function_Status("Add cart", false, "cannot add cart" + '\n' + "because some data missing.")
            returnData.status = false
            returnData.msg = "Please input information"
            return returnData
        }
    },
    async getCart() {
        let returnData = { status: false, data: undefined, msg: '' }
        try {
            //for normal user
            let url = `${origin}/api/carts`
            // check sort
            let res = await axios.get(url)
            if (res.status == 200) {
                validation.function_Status('get owner cart for user', true)
                returnData.status = true
                returnData.data = res.data
            }
            return returnData
        } catch (error) {
            validation.function_Status('get owner cart', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    async getCartCount() {
        let returnData = { status: false, data: undefined, msg: '' }
        try {
            //for normal user
            let url = `${origin}/api/carts/count`
            // check sort
            let res = await axios.get(url)
            if (res.status == 200) {
                validation.function_Status('get owner cart for user', true)
                returnData.status = true
                returnData.data = res.data
            }
            return returnData
        } catch (error) {
            validation.function_Status('get owner cart', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    async getUpdateCart(cartId, inputData) {
        let returnData = { status: false, data: undefined, msg: '' }
        try {
            //for normal user
            let url = `${origin}/api/carts/${cartId}`
            // check sort
            let res = await axios.put(url, inputData)
            if (res.status == 200) {
                validation.function_Status('updated owner cart for user', true)
                returnData.status = true
                returnData.data = res.data
            }
            return returnData
        } catch (error) {
            validation.function_Status('delete owner cart', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    async deleteCart(cartId) {
        let returnData = { status: false, data: undefined, msg: '' }
        try {
            //for normal user
            let url = `${origin}/api/carts/${cartId}`
            // check sort
            let res = await axios.delete(url)
            if (res.status == 200) {
                validation.function_Status('delete owner cart for user', true)
                returnData.status = true
                returnData.data = res.data
            }
            return returnData
        } catch (error) {
            validation.function_Status('delete owner cart', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    // for user,supplier get order 
    async getAllOrder(isSupplier = false, inputData = {}) { //for sub and user
        let returnData = { status: false, data: undefined, msg: '' }
        let {
            page,
            limitP,
            sort,
            dateStart,
            dateEnd,
            status, //status of order
            search,
            orderId
        } = inputData
        try {
            
            if (isSupplier) { // for role supplier
                let url = `${origin}/api/orders/supplier`
                // page
                if(page ==undefined) url+=`?page=${1}`
                else url+=`?page=${page}`
                // limit
                if (limitP != undefined) url += `&limit=${limitP}`;
                // sort
                if (sort != undefined) url += `&sort=${sort}`;
                // start date
                if (dateStart != undefined) url += `&dateStart=${dateStart}`;
                // end date
                if (dateEnd != undefined) url += `&dateEnd=${dateEnd}`;
                // status
                if (status != undefined) url += `&status=${status}`;

                let res = await axios.get(url)
                if (res.status == 200) {
                    validation.function_Status('get order all for supplier', true)
                    returnData.status = true
                    returnData.data = res.data
                }
            } else { //for normal user
                let url = `${origin}/api/orders`
                // page
                if(page ==undefined&&orderId==undefined){
                    url+=`?page=${1}`
                }else if(page !=undefined&&orderId==undefined){
                    url+=`?page=${page}`
                }else if(page==undefined&&orderId!=undefined){
                    url+=`/${orderId}`
                }
                // limit
                if (limitP != undefined) url += `&limit=${limitP}`;
                // sort
                if (sort != undefined) url += `&sort=${sort}`;
                // status
                if (status != undefined) url += `&status=${status}`;
                // ownerItem Or Product
                if(search!=undefined) url +=`&search=${search}`
                
                let res = await axios.get(url)
                if (res.status == 200) {
                    validation.function_Status('get order all for user', true)
                    returnData.status = true
                    returnData.data = res.data
                }
            }


            // if ( res.status==200) {
            //     validation.function_Status('get user address all', true)
            //     returnData.status = true
            //     returnData.data=res.data
            // }
            return returnData
        } catch (error) {
            validation.function_Status('get order all', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {

            }
        }
    },
    async getOrderStatusCountSupplier(orderStatus) { //for sub and user
        let returnData = { status: false, data: undefined, msg: '' }
        
        try {
            let url = `${origin}/api/orders/supplier/count/${orderStatus}`
            
            let res = await axios.get(url)
            if (res.status == 200) {
                validation.function_Status('get count order status successful', true)
                returnData.status = true
                returnData.data = res.data
            }
            
            return returnData
        } catch (error) {
            validation.function_Status('get order all', false, error)
            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else {
                returnData.msg = "Error some thing"
                returnData.status = false
                return returnData
            }
        }
    },
    async changeOrderStatus(orderId,inputData) {
        let returnData = { status: false ,msg:''}
        if (inputData != undefined) {
            try {
                // {
                //     "orderStatus": "in progress",
                //     "shippedDate": "2024-04-08 10:00:00"
                // }
                
                let url = `${origin}/api/orders/prepare_order/${orderId}`
                let res = await axios.put(url,inputData)
                
                if (res.status == 200) {
                    validation.function_Status("change order status successful", true)
                    returnData.status = true

                }
                return returnData

            } catch (error) {
                validation.function_Status("can not change order status", false, error)
                // console.log(error) 
                if (error.code == "ERR_NETWORK") {//check back-end server error
                    returnData.msg = "Server Error try again later"
                    returnData.status = false
                    return returnData
                }
                else
                    // error 404
                    if (error.response.status == 400 || error.response.status == 404 || error.response.status == 403) {
                        returnData.msg = error.response.data.error
                        returnData.status = false
                    } else {
                        // error
                        console.log("another error")
                    }
                return returnData
            }

        } else {
            validation.function_Status("Change order status", false, "cannot add change order status" + '\n' + "because some data missing.")
            returnData.status = false
            returnData.msg = "Please input information"
            return returnData
        }
        

    },
    async BuyNow(cartInput) {
        let returnData = { status: false, msg: '' }

        if (cartInput != undefined) {
            try {
                let url = `${origin}/api/orders`
                let res = await axios.post(url, cartInput)

                if (res.status == 201) {
                    validation.function_Status("buy successful", true)
                    returnData.status = true

                }
                return returnData

            } catch (error) {
                validation.function_Status("can not buy", false, error)
                // console.log(error) 

                if (error.code == "ERR_NETWORK") {//check back-end server error
                    returnData.msg = "Server Error try again later"
                    returnData.status = false
                    return returnData
                }
                else
                    // error 404
                    if (error.response.status == 400 || error.response.status == 404 || error.response.status == 403) {
                        returnData.msg = error.response.data.error
                        returnData.status = false
                    } else {
                        // error
                        console.log("another error")
                    }
                return returnData
            }

        } else {
            validation.function_Status("Add cart", false, "cannot add cart" + '\n' + "because some data missing.")
            returnData.status = false
            returnData.msg = "Please input information"
            return returnData
        }
    },
    async BuyNowWithoutCart(itemInput) {
        
        if (itemInput != undefined) {
            let returnData = { status: false, msg: '' }
            try {
                let url = `${origin}/api/orders/no_cart`
                let res = await axios.post(url, itemInput)

                if (res.status == 201) {
                    validation.function_Status("buy successful", true)
                    returnData.status = true

                }
                return returnData

            } catch (error) {
                validation.function_Status("can not buy", false, error)
                // console.log(error) 

                if (error.code == "ERR_NETWORK") {//check back-end server error
                    returnData.msg = "Server Error try again later"
                    returnData.status = false
                    return returnData
                }
                else
                    // error 404
                    if (error.response.status == 400 || error.response.status == 404 || error.response.status == 403) {
                        returnData.msg = error.response.data.error
                        returnData.status = false
                    } else {
                        // error
                        console.log("another error")
                    }
                return returnData
            }

        } else {
            validation.function_Status("Add cart", false, "cannot add cart" + '\n' + "because some data missing.")
            returnData.status = false
            returnData.msg = "Please input information"
            return returnData
        }
    },
    // authentication
    async login(email = undefined, password = undefined) {
        let returnData = { status: false, msg: '' }

        if (email != undefined || password != undefined) {
            try {
                let url = `${origin}/api/authentication`
                let userInfo = { "email_phone": email, "password": password }
                let res = await axios.post(url, userInfo)
                // console.log(res.data)
                cookie.encrypt(res.data, "information")
                // cookie.decrypt("information")
                validation.function_Status("login", true)
                returnData.status = true
                return returnData
            } catch (error) {
                validation.function_Status("login", false, error)
                // console.log(error) 

                if (error.code == "ERR_NETWORK") {//check back-end server error
                    returnData.msg = "Server Error try again later"
                    returnData.status = false
                    return returnData
                }
                else
                    // error 404
                    if (error.response.status == 404 || error.response.status == 401 || error.response.status == 403) {
                        returnData.msg = error.response.data.error
                        returnData.status = false
                    } else {
                        // error
                        console.log("another error")
                    }
                return returnData
            }

        } else {
            validation.function_Status("login", false, "cannot login!!!" + '\n' + "because email or password is wrong format")
            returnData.status = false
            returnData.msg = "Please input information"
            return returnData
        }
    },

    async signOut() {
        let information = cookie.get("information")
        let returnData = { status: false, msg: '' }
        // console.log(information.email)

        if (information !== undefined) {
            try {
                let url = `${origin}/api/authentication/signout`

                let res = await axios.get(url)
                // validation.function_Status("sign out", true)
                if (res.status == 200) {
                    returnData.msg = 'Sign out successful'
                    returnData.status = true
                } else {
                    returnData.msg = 'Can not sign out.'
                    returnData.status = false
                }
                // remove information account in client cookie
                // cookie.remove("information")

                return returnData
            } catch (error) {
                validation.function_Status("sign out", false, error)
                cookie.encrypt(res.data, "information")
                if (error.code == "ERR_NETWORK") {//check back-end server error
                    returnData.msg = "Server Error try again later"
                    returnData.status = false
                    return returnData
                }
                else {

                }
            }
        }
    },
    async getRefresh() {
        let information = cookie.decrypt() //get email for refresh token
        // console.log(information)
        let returnData = { status: false, msg: '' }
        if (information != undefined) {
            try {
                let url = `${origin}/api/authentication/refresh`

                // let userInfo = { "email_phone": information.email } //get email
                let userInfo = { "email": information.email } //get email


                let res = await axios.post(url, userInfo)
                // console.log(res.status)
                if (res.status == 200) {
                    returnData.status = true

                    console.log('refresh token')
                } else { // 401
                    returnData.status = false
                    returnData.msg = 'Token is expired, need login again'
                    console.log('cannot refresh token')

                }
                return returnData

            } catch (error) {
                validation.function_Status("refresh", false, error)

                if (error.code == "ERR_NETWORK") {//check back-end server error
                    // returnData.msg="Server Error try again later"
                    // returnData.status=false
                    return false
                }
                else {

                }
            }
        }
        return -1
    },
    async signUp(userData) {
        let returnData = { status: undefined, msg: '' }
        let { fn, ln, un, em, pw, pn } = userData
        let userInfo = {
            "email": em,
            "password": pw,
            "username": un,
            "role": 'user',
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
        let url = `${origin}/api/users/register`

        try {
            let res = await axios.post(url, userInfo)
            returnData.status = true
            validation.function_Status('postUser', true, res.data)
            return returnData
        } catch (error) {
            validation.function_Status('postUser', false, error)

            if (error.code == "ERR_NETWORK") {//check back-end server error
                returnData.msg = "Server Error try again later"
                returnData.status = false
                return returnData
            }
            else if (error.response.status == 400 || error.response.status == 403) {
                returnData.msg = error.response.data.error
                returnData.status = false
                return returnData

            } else {
                // unknown error
                console.log("another error")
                returnData.msg = "another error"
                returnData.status = false
                return returnData
            }

        }

    }
}
export default fetch