<script setup>
import { computed, onBeforeMount, onMounted, onUpdated, ref } from 'vue'
// import {useRoute} from 'vue-router'
import fetch from '../../../JS/api';
import vaidation from '../../../JS/validation'
import { useRoute, useRouter } from 'vue-router';
import productEnum from '../../../JS/enum/product'
import { v4 as uuidv4 } from 'uuid';
import BaseSubmit from '../../../components/accountSetting/BaseSubmit.vue';
import BaseAlert from '../../../components/BaseAlert.vue';
import validation from '../.././../JS/validation'
// import BaseConfirm from '../../../components/BaseConfirm.vue'
import BaseShowErrorInput from '../../../components/accountSetting/BaseShowErrorInput.vue';
// link
const myRouter = useRouter()
const goBack = () => myRouter.push({name:"Shop_AS"})
const goEdit = () => myRouter.push({ name: 'Shop_AS_add', params: { id: productId.value } })
// common attribute
const { params } = useRoute()
const productStyleList = ref([])
const productId = ref('')
const productOrigin = ref({})
let origin = `${import.meta.env.VITE_BASE_URL}`;

// status
const isProductChange = ref(false)
const isStyleChange = ref(false)
const isEdit = ref(false)
const isStyleEdit = ref(false)
const showStyleInput = ref(false)
// add product
const productName = ref('')
const productDes = ref('')
const productImgCover = ref(undefined)
const productCategory = ref('')
const productTag = ref([])
const tagText = ref('')

// add style
const styleName = ref('')
const styleImgList = ref([])
const styleVariance = ref([])
const maxVariance = 10
const maxStyleImgList = 10
// add style status
const styleNameS = ref(false)
const styleImgListS = ref(false)
const styleVarianceS = ref(false)
// cover image 
const coverImage = ref(undefined)
const coverImageS = ref(false)

// error msg
const errS = ref(false)
const errM = ref("")
const errProdS = ref(false)
const errProdM = ref("")
const errSkuS = ref(false)
const errSkuM = ref("")

// alert attribute
const isShowAlert=ref(false)
const alertType=ref(0)
const alertDetail=ref('')
const alertTime=ref(2)

// confirm attribute
const isDelete=ref(false)

// for set format input data
const formDataProduct = computed(() => {
    let returnData = { productStatus: false, productData: {}, productStyle: {} }
    let status = true
    errProdS.value = false
    errProdM.value = ''
    errS.value = false
    errM.value = ''

    //product
    if (productName.value.length == 0) {
        status = false
        console.log('product name')
        errProdS.value = true
        errProdM.value = "please input your product name"
    } else if (productCategory.value.length == 0) {
        status = false
        console.log('product category')
        errProdS.value = true
        errProdM.value = "please input your product category"
    }
    //style
    console.log(styleVariance.value)
    if (styleVariance.value.length == 0 && isEdit.value == false) {
        status = false
        console.log('style var list')
        errS.value = true
        errM.value = "please input your product sku"
    }
    else if (styleName.value.length == 0 && isEdit.value == false) {
        status = false
        console.log('style names')
        errS.value = true
        errM.value = "please input your product sku style"
    }
    //create mode
    else if (styleVariance.value.length != 0 && isEdit.value == false) {
        for (let st of styleVariance.value) {
            if (st.size.length == 0) {
                status = false
                console.log('style var size')
                errS.value = true
                errM.value = "please input your product variance size"
            } else
                if (st.price == 0) {
                    status = false
                    console.log('style var price')
                    errS.value = true
                    errM.value = "please input your product variance price"
                } else
                    if (st.stock == 0) {
                        status = false
                        console.log('style var stock')
                        errS.value = true
                        errM.value = "please input your product variance stock"
                    }
        }
    }

    // send data
    if (status) {
        productTag.value = tagText.value.split(",")
        // create mode
        if (!isEdit.value) {

            returnData.productStatus = true
            returnData.productStyle = {
                style: styleName.value,
                sizes: styleVariance.value
            }
            returnData.productData = {
                name: productName.value,
                description: productDes.value,
                type: productCategory.value,
                tag: productTag.value,
                styles: [
                    returnData.productStyle
                ]
            }

        } else {
            // let isChange =false //data change??
            // edit mode
            // product detail
            // console.log(productOrigin.value)

            let { name, description, type, tag } = productOrigin.value //destructuring
            if (productName.value != name) {
                isProductChange.value = true
                returnData.productData["name"] = productName.value
            }
            if (productDes.value != description) {
                isProductChange.value = true
                returnData.productData["description"] = productDes.value
            }
            if (productCategory.value != type) {
                isProductChange.value = true
                returnData.productData["type"] = productCategory.value
            }
            if (
                tagText.value.length != 0 ||
                tagText.value != (tag == undefined ? tag : tag.join())
            ) {
                isProductChange.value = true
                returnData.productData["tag"] = productTag.value
            }

            // product style
            returnData.productStyle = {
                style: styleName.value,
                sizes: styleVariance.value
            }
            if (styleName.value.length == 0 && isEdit.value == true) {
                styleNameS.value = true
                console.log('style names')
                errS.value = true
                errM.value = "please input your product sku style"
            }
            // edit mode
            if (styleVariance.value.length != 0 && isEdit.value == true) {
                for (let st of styleVariance.value) {

                    st.price = parseInt(st.price)
                    st.stock = parseInt(st.stock)
                    // console.log(st.stock)
                    if (st.size.length === 0) {
                        styleVarianceS.value = true
                        console.log('style var size')
                        errS.value = true
                        errM.value = "please input your product variance size"
                    } else
                        if (st.price === 0) {
                            styleVarianceS.value = true
                            console.log('style var price')
                            errS.value = true
                            errM.value = "please input your product variance price"
                        } else
                            if (st.stock === 0) {
                                styleVarianceS.value = true
                                console.log('style var stock')
                                errS.value = true
                                errM.value = "please input your product variance stock"
                            }
                }
            }
            // console.log(returnData)
            returnData.productStatus = true

            //assign to show button
        }
        return returnData
    } else {
        return returnData
    }

})
// get style
const getProductDetail = async (itemId) => {
    let { status, data } = await fetch.getProductDetail(itemId)
    if (status) {
        console.log(data)
        // console.log(data.tag.join())
        // product
        productOrigin.value = data
        productName.value = data.name
        productDes.value = data.description
        productCategory.value = data.type
        tagText.value = data.tag != undefined ? data.tag.join() : ''
        // style
        productStyleList.value = data.styles
    }else{
        alertType.value=1
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        isShowAlert.value=true
        alertTime.value=10
    }
}

// add product
const addProduct = async () => {

    let { productStatus, productData } = formDataProduct.value //เป็นแม่แบบสำหรับดึงข้อมูลและตรวจสอบค่าที่ใส่เข้าไป

    if (productStatus){
        if(coverImage.value != undefined&&styleImgList.value.length != 0){//check img
            let { status, msg, data } = await fetch.addProduct(productData)
            if (await status) {
                let { itemId } = data
                productId.value = itemId
                console.log(status, msg, itemId)
                await getProductDetail(productId.value)
                // isEdit.value=true
                // if (coverImage.value != undefined) {//add new img
                    await addImg()
                // }
                // if (styleImgList.value.length != 0) {
                    await addStyleImg()
                // }
                goEdit()
                productClear()
            } else {
                // console.log('error data invalid')
                console.log(msg)
                errProdS.value = true
                errProdM.value = msg
                alertType.value=1
                alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
                isShowAlert.value=true
                alertTime.value=10
            }
        }else{
            isShowAlert.value=true
            alertType.value=2
            alertDetail.value="The system requires an image to be displayed for the user"
            alertTime.value=10
        }
    }
}
// edit product
const updateProduct = async () => {
    let { productStatus, productData } = formDataProduct.value
    if(coverImageS.value||coverImage.value!=undefined){
        if (productStatus && isProductChange.value) {
            let { status, msg } = await fetch.updateProduct(productId.value, productData)
            if (status) {
                console.log('update product successful')
                // if (coverImage.value != undefined) {
                    await addImg()
                // }
                alertType.value=0
                alertDetail.value="Update complete!"
                isShowAlert.value=true
                alertTime.value=2
                productClear()
            } else {
                console.log('can not update product')
                errProdS.value = true
                errProdM.value = msg
                alertType.value=1
                alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
                isShowAlert.value=true
                alertTime.value=10
            }
        }
    }else{
        isShowAlert.value=true
        alertType.value=2
        alertDetail.value="The system requires an cover image to be displayed for the user"
        alertTime.value=10
    }
}

// add product img
const addImg = async () => {
    let { status } = await fetch.addImage(coverImage.value, 'products', productId.value)
    if (await status) {
        console.log('upload images successful')
    }else{
        alertType.value=2
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        isShowAlert.value=true
        alertTime.value=10
    }
}

// style update
const addStyle = async () => {
    styleNameS.value = false
    styleVarianceS.value = false

    let { productStatus, productStyle } = formDataProduct.value
    // console.log(productStatus, styleVarianceS.value, styleNameS.value)
    // console.log(isStyleEdit.value, isEdit.value)
    if (isStyleEdit.value && isEdit.value && !styleVarianceS.value && !styleNameS.value) { //this edit mode of style??
        if(styleImgList.value.length != 0){
            // edit style
            let { status, msg } = await fetch.updateProductStyle(productId.value, styleName.value, productStyle)
            if (status) {
                console.log('update style successful')

                styleStatusClear()
                //upload img not care about data 
                // if (styleImgList.value.length != 0) {
                    await addStyleImg()
                // }
            } else {
                console.log('can not update style')
                errS.value = true
                errM.value = msg
                alertType.value=1
                alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
                isShowAlert.value=true
                alertTime.value=10
            }
        }else{
            isShowAlert.value=true
            alertType.value=2
            alertDetail.value="The system requires an image to be displayed for the user"
            alertTime.value=10
        }
    } else {
        // add style
        if (productStatus && !styleVarianceS.value && !styleNameS.value) {
            if(styleImgList.value.length != 0){
                let { status, msg } = await fetch.addProductStyle(productId.value, productStyle)
                if (await status) {
                    console.log('add successful')
                    // if (styleImgList.value.length != 0) {
                    await addStyleImg()
                    // }
                    await getProductDetail(productId.value)
                    isEdit.value = true
                    // await addStyleImg()
                    styleClear()
                    styleStatusClear()


                } else {
                    // error
                    console.log('can not add')
                    errS.value = true
                    errM.value = msg
                    alertType.value=1
                    alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
                    isShowAlert.value=true
                    alertTime.value=10
                }
            }else{
                isShowAlert.value=true
                alertType.value=2
                alertDetail.value="The system requires an style image to be displayed for the user"
                alertTime.value=10
            }
        }
    }

}
// edit style
const updateStyle = async (sku) => { //assign value to input after selected
    document.getElementById("shop_create").scrollIntoView({ behavior: "smooth" }) //locate to position input style
    showStyleInput.value = true//show input field
    styleImgList.value = []// clear value
    let { price, size, sizes, stock, style, images, image } = sku

    // validate size type
    if (size != undefined) {
        // size is string 1 size
        console.log('size')
        styleVariance.value = [{ size: size, price: price, stock: stock }]
    } else {
        // size is array many of size
        console.log(size)
        styleVariance.value = sizes
    }
    // assign style name
    styleName.value = style


    // assign style img
    if (image != undefined) {
        styleImgList.value = [image]
        console.log(image)
    } else {
        if (images) {
            //  push many of the old image that selected
            for (let img of images) {
                let { status, data } = await fetch.getImage('products', `${productId.value}/${style}/${img}`)
                if (status) {
                    // blob function
                    let oldFile = new File([data], img, { type: 'image/jpeg' })
                    addStyleImgObj(oldFile, img)
                } else {
                    addStyleImgObj(undefined, img)
                }
            }
        }

    }
    console.log(styleImgList.value, 'this old img list ')
    isStyleEdit.value = true
    console.log(isStyleEdit.value, 'style edit')
    console.log(sku)

}



// delete style
const deleteStyle = async (skuId = '') => {
    if (skuId.length != 0) {
        let { status, msg } = await fetch.deleteProductStyle(productId.value, skuId)
        if (status) {
            console.log('delete style successful')
            styleStatusClear()
            removeImgStyle(styleImgList.value.indexOf(skuId))
            await getProductDetail(productId.value)
            isDelete.value=false
        } else {
            isDelete.value=false
            // console.log('cannot delete style')
            // errSkuS.value = true
            // errSkuM.value = msg
            alertType.value=2
            alertDetail.value="The product must have at least 1 sku"
            isShowAlert.value=true
            alertTime.value=10
        }
    }
}
//add img style
const addStyleImg = async () => {
    console.log(styleImgList.value)
    // console.log(productId.value)
    // console.log(styleName.value)
    let imgList = []
    for (let file of styleImgList.value) { //upload file only
        if (file.isFile) {
            imgList.push(file.file)
        }
    }
    console.log(imgList)
    if (imgList.length != 0) { // file that just update only will add
        let { status, msg } = await fetch.addImages(imgList, 'products', `${productId.value}/${styleName.value}`)
        if (status) {
            console.log('upload img successful')
            styleImgList.value = []
            styleImgListS.value = false
            await getProductDetail(productId.value)
        } else {
            errS.value = true
            errM.value = msg
        }
    }
}
// remove img style in local list styleImgList
const removeImgStyle = (index) => {
    styleImgList.value.splice(index, 1)
    console.log("remove successful!!")
}

// for format form obj before push
const addStyleImgObj = (file = undefined, name = '') => {
    let styleImgOBJ = {}
    let fileName = `${productId.value}-${uuidv4()}`
    // assign name using product id and random number
    if (name.length == 0) styleImgOBJ["name"] = fileName;
    else styleImgOBJ["name"] = name
    //validate file
    if (file != undefined) {
        styleImgOBJ["isFile"] = true
    } else {
        styleImgOBJ["isFile"] = false
    }
    styleImgOBJ["file"] = file
    console.log(styleImgOBJ)

    return styleImgList.value.push(styleImgOBJ)

}

// select mode style btn
const styleModeSelection = async () => {
    if (isEdit.value) {//edit mode do ....
        await addStyle()

    } else { // create mode

        await addProduct(productId.value)

    }
}

// style obj to array
const addVariance = () => {
    const formData = { size: '', price: 0, stock: 0 }
    if (styleVariance.value.length < maxVariance) {
        styleVariance.value.push(formData)
    }
}
// for show input field
const showInputFiel = () => {
    // styleClear()
    styleImgList.value = []
    showStyleInput.value = !showStyleInput.value
    styleClear()
    addVariance()//initail variance obj
    isStyleEdit.value = false
}

const removeVariance = (index) => {
    //remove from index
    styleVariance.value.splice(index, 1)
}

// product clear
const productClear = () => {
    isProductChange.value = false
    //clear statement
    // showProducBtn.value=false
    // showStyleBtn.value=false
    // // const isEdit=false
    // showStyleInput.value=false
    // // add product
    // productName.value=''
    // productDes.value=''
    // productImgCover.value=undefined
    // productCategory.value=''
    // productTag.value=[]
    // tagText.value=''
    errM.value = ''
    errS.value = false
    errProdM.value = ''
    errProdS.value = false
}
// style clear
const styleStatusClear = () => {
    styleNameS.value = false
    styleVarianceS.value = false
    isStyleEdit.value = false
    showStyleInput.value = false
    errM.value = ''
    errS.value = false
}
const styleClear = () => {

    styleName.value = ''
    // styleImgList.value=[]
    styleVariance.value = []
    // showStyleInput.value=false

}
// check image
// const imgTesting=ref(undefined)
const checkMainImage = async () => {
    let { status, data, msg } = await fetch.getImage('products', productId.value)
    if (await status) {
        coverImageS.value = true
        // blob function
        // console.log(data,'blob data')
        // document.getElementById('testing_img').setAttribute('src',URL.createObjectURL(data))
        // // let newBlob=new Blob([data],{ type: 'image/jpeg' }) //create new blob
        // let testingFile=new File([data],`${uuidv4()}-TestingProduct.jpg`,{type:'image/jpeg'})
        // addStyleImgObj(testingFile,'testing')
        // console.log(styleImgList.value)
    }
}

//preview cover img 
const previewCoverImage = (event, elementId) => {
    console.log(event, ' this preview')
    // const file = event.target.files;
    // const fileReader = new FileReader(); //for reading file
    const preview = document.getElementById(elementId)
    // // จะทำงานเมื่อมีการเปลี่ยนเปลงของ Document เหมือน event hook ของ JS  
    // fileReader.onload = event => {
    // console.log(preview,'this preview amazing')
    preview.setAttribute('src', URL.createObjectURL(event)); //event.target.result
    //     }
    //     fileReader.readAsDataURL(file[0]);
    // console.log(event)
}
//preview style img 
const previewStyleImage = (event, elementId) => {
    const preview = document.getElementById(elementId)
    // assign img
    preview.setAttribute('src', URL.createObjectURL(event))

}

// image of style
const uploadStyleImage = async (event) => {
    if (event == undefined) {
        console.log("pls up load style photo")
    } else {
        let file
        // แยกประเภทว่าเป็นแบบ Drop ?
        if (event.target != undefined) {
            file = event.target.files[0] //แยกไฟล์ออกมา
            console.log('not drop')
        } else {
            // console.log(event)
            file = event
            console.log('drop')
        }
        const fSize = Math.round((file.size / 100000))
        const maxFileSize = 10
        // เอามาตรวจสอบว่ามีขนาดเกิน 10 MB ?
        console.log('file size :', fSize)
        if (maxFileSize >= fSize) {
            console.log('nice file')
            if (styleImgList.value.length < maxStyleImgList) {
                if (event.target != undefined) addStyleImgObj(file);
                else addStyleImgObj(file)
            } else {
                console.log('Style image limit 10 picture each style')
            }
            // previewCoverImage(file, "cover-preview")
        } else {
            // console.log('file too big')
            alertType.value=2
            alertDetail.value="The image is too big, over 1 MB in size!"
            isShowAlert.value=true
            alertTime.value=10
        }
    }
}

// cover image
const uploadCoverImage = (event) => {
    if (event == undefined) {
        console.log("pls up load photo")
    } else {
        let file
        // แยกประเภทว่าเป็นแบบ Drop ?
        if (event.target != undefined) {
            file = event.target.files[0] //แยกไฟล์ออกมา
            console.log('not drop')
        } else {
            // console.log(event)
            file = event
            console.log('drop')
        }
        // const fSize = Math.round((file.size / 100000))
        const fSize = file.size
        // const maxFileSize = 20
        const maxFileSize = 2 * 1024 * 1024
        // เอามาตรวจสอบว่ามีขนาดเกิน 10 MB ?
        console.log(maxFileSize)
        console.log('file size :', fSize)
        if (maxFileSize >= fSize) {
            console.log('nice file')
            if (event.target != undefined) coverImage.value = file;
            else coverImage.value = file;
            previewCoverImage(file, "cover-preview")
        } else {
            // console.log('file too big')
            alertType.value=2
            alertDetail.value="The image is too big, over 2 MB in size!"
            isShowAlert.value=true
            alertTime.value=10
        }

    }
}
//drop event
const dropCoverHandle = (event) => {
    event.preventDefault() //when drop not make new page for show image just drop
    // Use DataTransferItemList interface to access the file(s)
    if (event.dataTransfer.items) {
        let fileType = event.dataTransfer.items[0].type.split("/")
        // console.log(event.dataTransfer.items[0].type)
        let itemAmount = event.dataTransfer.items.length //check length of file
        if (itemAmount == 1 && fileType.includes("image")) { //1 file only and type only image

            console.log(event.dataTransfer.items[0].getAsFile())

            uploadCoverImage(event.dataTransfer.items[0].getAsFile())

        } else {
            console.log('please 1 file and image only')
        }
    }
}
const dropStyleHandle = (event) => {
    event.preventDefault() //when drop not make new page for show image just drop
    // Use DataTransferItemList interface to access the file(s)
    if (event.dataTransfer.items) {
        let fileType = event.dataTransfer.items[0].type.split("/")
        let itemAmount = event.dataTransfer.items.length //check length of file
        if (itemAmount == 1 && fileType.includes("image")) { //1 file only and type only image

            console.log(event.dataTransfer.items[0].getAsFile())
            uploadStyleImage(event.dataTransfer.items[0].getAsFile())
        } else {
            console.log('please 1 file and image only')
        }
    }
}
const dragover = (event) => {
    event.preventDefault()
}

// reset show alert status
const getShowAlertChange=(input)=>{
    isShowAlert.value=input
    alertType.value=0
    alertDetail.value=''
    alertTime.value=2
}

onBeforeMount(async () => {
    validation.navigationTo()
    // console.log(params.id)
    if (params.id == undefined || params.id == '') { // add mode
        isEdit.value = false
    } else {// edit mode
        isEdit.value = true
        productId.value = params.id
        await getProductDetail(productId.value)
        await checkMainImage()
        // do some thing about 
    }
    // console.log(await fetch.getImage('products',productId.value))
})
onMounted(() => {
    addVariance()
})
onUpdated(async () => {
    // reassign every updated
    for (let i of styleImgList.value) {
        if (i.isFile) {
            previewStyleImage(i.file, `style_preview_${i.name}`)
        }
    }
    // console.log(await fetch.getImage('products',productId.value))
    // console.log(styleImgList.value,'style img list')
})

</script>
<template>
    <div class="wrapper_all">
        <div class="wrapper_shop">
            <!-- add new product -->
            <div class="wrapper_shop_create">
                <div class="shop_create">
                    <!-- header -->
                    <div class="header_shop_create">
                        <h4>
                            Add New Product
                        </h4>
                    </div>
                    <!-- container input -->
                    <div class="container_input">
                        <!-- name -->
                        <div class="input_field">
                            <h5 class="inportant_input">
                                Name
                            </h5>
                            <input v-model="productName" class="input" type="text" maxlength="100">
                        </div>
                        <!-- description -->
                        <div class="input_field">
                            <h5>
                                Description
                            </h5>
                            <textarea v-model="productDes" class="input_description" maxlength="5000"
                                placeholder="Something about product."></textarea>
                        </div>
                        <!-- cover photo -->
                        <div class="img_cover input_field">
                            <h5 class="inportant_input">
                                Cover Photo
                            </h5>
                            <!-- <div class="input_img">
                                

                            </div> -->
                            <div v-show="coverImage == undefined && coverImageS == false" class="input_img"
                                @drop="dropCoverHandle" @dragover="dragover">
                                <input @change="uploadCoverImage" id="cover_image" type="file" accept="image/*">
                                <label for="cover_image">
                                    <div>
                                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M21 5H5C3.93913 5 2.92172 5.42143 2.17157 6.17157C1.42143 6.92172 1 7.93913 1 9V29M1 29V33C1 34.0609 1.42143 35.0783 2.17157 35.8284C2.92172 36.5786 3.93913 37 5 37H29C30.0609 37 31.0783 36.5786 31.8284 35.8284C32.5786 35.0783 33 34.0609 33 33V25M1 29L10.172 19.828C10.9221 19.0781 11.9393 18.6569 13 18.6569C14.0607 18.6569 15.0779 19.0781 15.828 19.828L21 25M33 17V25M33 25L29.828 21.828C29.0779 21.0781 28.0607 20.6569 27 20.6569C25.9393 20.6569 24.9221 21.0781 24.172 21.828L21 25M21 25L25 29M29 5H37M33 1V9M21 13H21.02"
                                                stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </div>

                                    <h6>
                                        <span>
                                            Upload a file
                                        </span> or drag and drop
                                    </h6>
                                    <p>
                                        PNG, JPG or JPEG up to 2MB
                                    </p>

                                </label>

                            </div>
                            <div v-show="coverImage != undefined || coverImageS == true" @drop="dropCoverHandle"
                                @dragover="dragover">
                                <label for="cover_image">
                                    <!-- รูปที่จะเพิ่ม -->
                                    <img v-show="coverImage != undefined" src="#" draggable="false" alt="preview_image"
                                        id="cover-preview">
                                    <!-- รูปที่มีแล้ว -->
                                    <img v-show="coverImage == undefined && coverImageS == true"
                                        :src="`${origin}/api/image/products/${productId}`" draggable="false"
                                        alt="preview_image" id="cover-preview">
                                </label>
                            </div>
                        </div>
                        <div class="input_list">
                            <!-- category -->
                            <div class="input_field">
                                <h5 class="inportant_input">
                                    Category
                                </h5>
                                <select v-model="productCategory" class="input">
                                    <option value="" selected hidden>this is value</option>
                                    <option v-for="(type, index) of productEnum.itemType" :key="index"
                                        :value="type.value">{{ type.name }}</option>
                                </select>
                            </div>
                            <!-- cover photo -->
                            <div class="input_field">
                                <h5>
                                    Tag
                                </h5>
                                <input v-model="tagText" type="text" placeholder="tag1,tag2..." class="input" maxlength="500">
                            </div>
                        </div>
                    </div>
                    <!-- worning -->
                    <div v-show="errProdS" class="wrapper_errorMsg">
                        <div>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z"
                                    fill="#F75555" />
                            </svg>
                            <p>
                                {{ errProdM }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- submit -->
                <!-- <div v-show="isEdit" class="submit">
                    <button @click="goBack()">
                        Cancel
                    </button>
                    <button @click="updateProduct()">
                        Save
                    </button>
                </div> -->
                <!-- <div > -->
                    <BaseSubmit v-if="isEdit" name="my_shop_create"  @goBack="goBack" @submit="updateProduct()" />
                <!-- </div> -->
            </div>
            <!-- <div class="wrapper_all"> -->
            <!-- product style -->
            <div id="shop_create" class="wrapper_shop_create">
                <!-- add new product -->
                <div class="shop_create">
                    <!-- header -->
                    <div class="header_shop_create">
                        <h4>
                            Product Style
                        </h4>
                        <button @click="showInputFiel" v-if="productStyleList.length < maxVariance">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M5 0C5.26522 0 5.51957 0.105357 5.70711 0.292893C5.89464 0.48043 6 0.734784 6 1V4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5C10 5.26522 9.89464 5.51957 9.70711 5.70711C9.51957 5.89464 9.26522 6 9 6H6V9C6 9.26522 5.89464 9.51957 5.70711 9.70711C5.51957 9.89464 5.26522 10 5 10C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H4V1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0Z"
                                    fill="white" />
                            </svg>
                            New Style
                        </button>
                    </div>
                    <!-- container input -->
                    <div v-show="showStyleInput" class="container_input">
                        <!-- sku/name -->
                        <div class="input_field">
                            <h5 class="inportant_input">
                                SKU / Name of Style
                            </h5>
                            <input v-model="styleName" type="text" class="input" :disabled="isStyleEdit" maxlength="20">
                            <!-- <BaseShowErrorInput name="sku_name_error" :show="" :msg="" />  -->
                        </div>
                        <!-- color and size
                            <div class="input_list">
                                color
                                <div class="input_field">
                                    <h5>
                                        Color
                                    </h5>
                                    <input type="text" class="input">
                                </div>
                                
                            </div> -->
                        <!-- photo Style-->
                        <div class="input_field">
                            <h5 class="inportant_input">
                                Photo Style
                            </h5>
                            <!-- <div class="input_img">

                                </div> -->
                            <div v-show="styleImgList.length == 0" @drop="dropStyleHandle" @dragover="dragover"
                                class="input_img">
                                <input @change="uploadStyleImage" id="style_image" type="file" accept="image/*">
                                <label for="style_image">
                                    <div>
                                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M21 5H5C3.93913 5 2.92172 5.42143 2.17157 6.17157C1.42143 6.92172 1 7.93913 1 9V29M1 29V33C1 34.0609 1.42143 35.0783 2.17157 35.8284C2.92172 36.5786 3.93913 37 5 37H29C30.0609 37 31.0783 36.5786 31.8284 35.8284C32.5786 35.0783 33 34.0609 33 33V25M1 29L10.172 19.828C10.9221 19.0781 11.9393 18.6569 13 18.6569C14.0607 18.6569 15.0779 19.0781 15.828 19.828L21 25M33 17V25M33 25L29.828 21.828C29.0779 21.0781 28.0607 20.6569 27 20.6569C25.9393 20.6569 24.9221 21.0781 24.172 21.828L21 25M21 25L25 29M29 5H37M33 1V9M21 13H21.02"
                                                stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </div>

                                    <h6>
                                        <span>
                                            Upload a file
                                        </span> or drag and drop
                                    </h6>
                                    <p>
                                        PNG, JPG or JPEG up to 1MB in each images
                                    </p>

                                </label>

                            </div>
                            <div v-show="styleImgList.length != 0" class="style_preview_img" id="container_img_style">
                                <!--v-show="styleImgList.length!=0 || StyleImImageS == true" @drop="dropHandle" @dragover="dragover"-->
                                <!-- for show img -->
                                <!-- first solu -->
                                <button v-for="(img, index) of styleImgList" :key="index">
                                    <img v-if="img.isFile" src="#" :id="`style_preview_${img.name}`"
                                        :alt="`style_${img.name}`" loading="lazy">
                                    <img v-else
                                        :src="`${origin}/api/image/products/${productId}/${styleName}/${img.name}`"
                                        :id="`style_preview_${img.name}`" :alt="`style_${img.name}`" loading="lazy">
                                    <!-- delete btn -->
                                    <button @click="removeImgStyle(index)" class="remove">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L11 11M1 11L11 1L1 11Z" stroke="white" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                </button>
                                <!-- second solu -->
                                <label v-show="styleImgList.length < maxStyleImgList" for="style_image"
                                    @drop="dropStyleHandle" @dragover="dragover">
                                    <div>
                                        <!-- svg -->
                                        <div>
                                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M19.6666 5.33268H4.99992C4.02746 5.33268 3.09483 5.71899 2.40719 6.40662C1.71956 7.09426 1.33325 8.02689 1.33325 8.99935V27.3327M1.33325 27.3327V30.9993C1.33325 31.9718 1.71956 32.9044 2.40719 33.5921C3.09483 34.2797 4.02746 34.666 4.99992 34.666H26.9999C27.9724 34.666 28.905 34.2797 29.5926 33.5921C30.2803 32.9044 30.6666 31.9718 30.6666 30.9993V23.666M1.33325 27.3327L9.74092 18.925C10.4285 18.2376 11.361 17.8515 12.3333 17.8515C13.3055 17.8515 14.238 18.2376 14.9256 18.925L19.6666 23.666M30.6666 16.3327V23.666M30.6666 23.666L27.7589 20.7583C27.0713 20.071 26.1389 19.6848 25.1666 19.6848C24.1943 19.6848 23.2619 20.071 22.5743 20.7583L19.6666 23.666M19.6666 23.666L23.3333 27.3327M26.9999 5.33268H34.3333M30.6666 1.66602V8.99935M19.6666 12.666H19.6849"
                                                    stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                        <h6>
                                            Upload a file
                                        </h6>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <!-- Variation Price & Stock -->
                        <div class="variance_list">
                            <div v-for="(variance, index) of styleVariance" :key="index" class="input_list">
                                <!-- size-->
                                <div class="input_field">
                                    <h5 class="inportant_input">
                                        Variation
                                    </h5>
                                    <input v-model="variance.size" type="text" class="input" maxlength="50">
                                </div>
                                <!-- price -->
                                <div class="input_field">
                                    <h5 class="inportant_input">
                                        Price
                                    </h5>
                                    <div class="input input_price">
                                        <input v-model.number="variance.price" type="number" placeholder="฿ 0.00" >
                                        <h6>
                                            THB
                                        </h6>
                                    </div>
                                </div>
                                <!-- stock -->
                                <div class="input_field">
                                    <h5 class="inportant_input">
                                        Stock
                                    </h5>
                                    <input v-model.number="variance.stock" type="number" class="input" >
                                </div>
                                <!--  -->
                                <div class="remove_variance" v-if="styleVariance.length > 1">
                                    <button @click="removeVariance(index)">
                                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.33325 8.16667V13.1667M9.66659 8.16667V13.1667M1.33325 4.83333H14.6666M13.8333 4.83333L13.1108 14.9517C13.0808 15.3722 12.8927 15.7657 12.5842 16.053C12.2757 16.3403 11.8698 16.5 11.4483 16.5H4.55159C4.13004 16.5 3.72414 16.3403 3.41566 16.053C3.10717 15.7657 2.91902 15.3722 2.88909 14.9517L2.16659 4.83333H13.8333ZM10.4999 4.83333V2.33333C10.4999 2.11232 10.4121 1.90036 10.2558 1.74408C10.0996 1.5878 9.8876 1.5 9.66659 1.5H6.33325C6.11224 1.5 5.90028 1.5878 5.744 1.74408C5.58772 1.90036 5.49992 2.11232 5.49992 2.33333V4.83333H10.4999Z"
                                                stroke="#F75555" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- add variation -->
                        <div @click="addVariance" class="input_field" v-if="styleVariance.length < maxVariance">
                            <button class="new_variance">
                                <div>
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M5 0C5.26522 0 5.51957 0.105357 5.70711 0.292893C5.89464 0.48043 6 0.734784 6 1V4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5C10 5.26522 9.89464 5.51957 9.70711 5.70711C9.51957 5.89464 9.26522 6 9 6H6V9C6 9.26522 5.89464 9.51957 5.70711 9.70711C5.51957 9.89464 5.26522 10 5 10C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H4V1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0Z"
                                            fill="white" />
                                    </svg>
                                </div>
                                <h6>
                                    new variation
                                </h6>
                            </button>
                        </div>
                        <!-- worning -->
                        <div v-show="errS" class="wrapper_errorMsg">
                            <div>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z"
                                        fill="#F75555" />
                                </svg>
                                <p>
                                    {{ errM }}
                                </p>
                            </div>
                        </div>
                        <!-- submit -->
                        <!-- <div v-show="true" class="submit">
                            <button @click="showStyleInput = false">
                                Cancel
                            </button>
                            <button @click="styleModeSelection()">
                                Save
                            </button>
                        </div> -->
                        <BaseSubmit name="my_shop_create" @goBack="showStyleInput = false" @submit="styleModeSelection()" />
                    </div>

                    <!-- product list -->
                    <div class="product_list">
                        <div v-for="(styleItem, index) of productStyleList" :key="index" class="product_item">
                            <!-- <div class="product_info"> -->
                            <!-- img -->
                            <div class="product_img">
                                <img v-if="!styleItem.images || styleItem.images.length == 0"
                                    src="../../../assets/default_image.png" id="testing_img" alt="product_img">
                                <img v-else
                                    :src="`${origin}/api/image/products/${productId}/${styleItem.style}/${styleItem.images[0]}`"
                                    id="testing_img" alt="product_img">
                            </div>
                            <!-- detail -->
                            <div class="product_detail">
                                <!-- header -->
                                <div class="header">
                                    <div class="info">
                                        <h5>
                                            SKU / Name of Style
                                        </h5>
                                        <h6>
                                            {{ styleItem.style }}
                                        </h6>
                                    </div>
                                    <!-- operator -->
                                    <div class="operator">
                                        <!-- edit -->
                                        <button @click="updateStyle(styleItem)">
                                            <div>
                                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.16667 3.16762H3C2.55798 3.16762 2.13405 3.34321 1.82149 3.65577C1.50893 3.96833 1.33334 4.39225 1.33334 4.83428V14.0009C1.33334 14.443 1.50893 14.8669 1.82149 15.1795C2.13405 15.492 2.55798 15.6676 3 15.6676H12.1667C12.6087 15.6676 13.0326 15.492 13.3452 15.1795C13.6577 14.8669 13.8333 14.443 13.8333 14.0009V9.83428M12.655 1.98928C12.8087 1.8301 12.9927 1.70313 13.196 1.61578C13.3993 1.52843 13.618 1.48245 13.8393 1.48053C14.0606 1.47861 14.2801 1.52078 14.4849 1.60458C14.6898 1.68838 14.8758 1.81214 15.0323 1.96862C15.1888 2.12511 15.3126 2.3112 15.3964 2.51603C15.4802 2.72085 15.5223 2.94032 15.5204 3.16162C15.5185 3.38292 15.4725 3.60162 15.3852 3.80496C15.2978 4.0083 15.1709 4.1922 15.0117 4.34595L7.85667 11.5009H5.5V9.14428L12.655 1.98928Z"
                                                        stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                        </button>
                                        <!-- delete -->
                                        <button @click="deleteStyle(styleItem.style)">
                                            <div>
                                                <svg width="16" height="18" viewBox="0 0 16 18" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M6.33333 8.16667V13.1667M9.66666 8.16667V13.1667M1.33333 4.83333H14.6667M13.8333 4.83333L13.1108 14.9517C13.0809 15.3722 12.8927 15.7657 12.5843 16.053C12.2758 16.3403 11.8699 16.5 11.4483 16.5H4.55166C4.13011 16.5 3.72422 16.3403 3.41573 16.053C3.10725 15.7657 2.91909 15.3722 2.88916 14.9517L2.16666 4.83333H13.8333ZM10.5 4.83333V2.33333C10.5 2.11232 10.4122 1.90036 10.2559 1.74408C10.0996 1.5878 9.88768 1.5 9.66666 1.5H6.33333C6.11231 1.5 5.90035 1.5878 5.74407 1.74408C5.58779 1.90036 5.49999 2.11232 5.49999 2.33333V4.83333H10.5Z"
                                                        stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <!-- price -->
                                <div class="price">
                                    <h6>
                                        ฿{{ styleItem.minPriceSKU }}
                                        <span v-show="styleItem.maxPriceSKU != 0">- {{ styleItem.maxPriceSKU }}</span>
                                    </h6>
                                </div>
                                <!-- variation -->
                                <div class="variation">
                                    <h6>
                                        Variation
                                    </h6>
                                    <p>
                                        <span v-for="(size, index) of styleItem.sizes" :key="index">
                                            {{ size.size }}/
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <!-- worning -->
                        <div v-show="errSkuS" class="wrapper_errorMsg">
                            <div>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z"
                                        fill="#F75555" />
                                </svg>
                                <p>
                                    {{ errSkuM }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- submit
                    <div v-show="true" class="submit">
                        <button @click="goBanks()">
                            Cancel
                        </button>
                        <button @click="styleModeSelection()">
                            Save
                        </button>
                    </div> -->
            </div>
            <!-- </div> -->
        </div>
        <BaseAlert name="my_shop_create_alert" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange" />
    </div>
</template>
<style scoped>
* {
    box-sizing: border-box;
}

.wrapper_all {
    width: inherit;
    min-width: min(64.444dvw, 928px);
    height: 100%;
    /* min-height: 100%; */
    /* max-height: 200dvh; */
    overflow: hidden;
    /* border: none; */
    gap: min(1.667dvw, 24px);
    animation: show_element ease-in 1.5s;
}

.wrapper_shop {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: min(1.667dvw, 24px);
    overflow: hidden;
    border: none;
    border-radius: min(0.556dvw, 8px);
    box-shadow: 0px min(0.069dvw, 1px) min(0.208dvw, 3px) rgba(0, 0, 0, 0.1), 0px min(0.069dvw, 1px) min(0.139dvw, 2px) rgba(0, 0, 0, 0.06);
}

.wrapper_shop_create {
    display: flex;
    position: relative;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    /* border-radius: 8px; */
    background-color: #FFFFFF;
    overflow: hidden;
    border: none;
    border-radius: min(0.556dvw, 8px);
    box-shadow: 0px min(0.069dvw, 1px) min(0.208dvw, 3px) rgba(0, 0, 0, 0.1), 0px min(0.069dvw, 1px) min(0.139dvw, 2px) rgba(0, 0, 0, 0.06);
    gap: min(1.667dvw, 24px);
}

.shop_create {
    display: flex;
    width: 100%;
    /* min-width: 928px; */
    height: fit-content;
    flex-direction: column;
    justify-content: center;
    padding: min(1.389dvw, 20px);
    align-items: start;
    /* align-items: center; */
    gap: min(1.667dvw, 24px);
    /* background-color: #3683c7; */
}

.header_shop_create {
    display: flex;
    width: 100%;
    height: inherit;
    justify-content: space-between;
    align-items: center;
    gap: min(1.389dvw, 20px);
    /* background-color: #42c736; */
}

.header_shop_create h4 {
    display: flex;
    width: 100%;
    height: min(1.944dvw, 28px);
    font-size: min(1.25dvw, 18px);
    font-weight: 500;
    color: #212121;
    align-items: center;
}

.header_shop_create button {
    display: flex;
    width: fit-content;
    height: min(2.5dvw, 36px);
    border-radius: min(0.278dvw, 4px);
    border: none;
    padding: min(0.556dvw, 8px) min(0.833dvw, 12px) min(0.556dvw, 8px) min(0.556dvw, 8px);
    gap: min(0.278dvw, 4px);
    background-color: #BDBDBD;
    color: #fff;
    font-size: min(0.972dvw, 14px);
    line-height: 144%;
    font-weight: 500;
    box-shadow: 0px min(0.069dvw, 1px) min(0.139dvw, 2px) 0px #0000000D;
    align-items: center;
    justify-content: start;
    cursor: pointer;
    white-space: nowrap
}

.header_shop_create button svg {
    width: min(0.694dvw, 10px);
    height: min(0.694dvw, 10px);
    margin: min(0.347dvw, 5px);
}

.container_input {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: min(1.667dvw, 24px);
}

.container_input .input_field {
    display: flex;
    width: inherit;
    height: fit-content;
    flex-direction: column;
    gap: min(0.278dvw, 4px);
}

.container_input .input_field h5 {
    display: flex;
    width: fit-content;
    height: min(1.389dvw, 20px);
    align-items: center;
    font-size: min(0.972dvw, 14px);
    line-height: 144%;
    font-weight: 500;
}

.input_field .input {
    width: 100%;
    height: min(2.5dvw, 36px);
    padding: min(0.556dvw, 8px) min(0.833dvw, 12px);
    background-color: #fff;
    border: min(0.069dvw, 1px) solid;
    border-radius: min(0.278dvw, 4px);
    border-color: #D1D5DB;
    box-shadow: 0px min(0.069dvw, 1px) min(0.139dvw, 2px) 0px #0000000D;

}

.input:focus-within {
    outline: auto;
}

.input_field .input_description {
    width: 100%;
    height: min(6.944dvw, 100px);
    min-height: min(2.5dvw, 36px);
    max-height: min(10.417dvw, 150px);
    padding: min(0.556dvw, 8px) min(0.833dvw, 12px);
    resize: vertical;
    border: min(0.069dvw, 1px) solid;
    border-radius: min(0.278dvw, 4px);
    border-color: #D1D5DB;
    background-color: #fff;
    box-shadow: 0px min(0.069dvw, 1px) min(0.139dvw, 2px) 0px #0000000D;
}

.input_field .input_price {
    display: flex;
}

.input_field .input_price input {
    width: 100%;
    height: fit-content;
    border: none;
    outline: none;
}

.input_field .input_price h6 {
    font-size: min(0.972dvw, 14px);
    line-height: 144%;
    font-weight: 400;
    color: #9E9E9E;
}

.input_field .input_img {
    display: flex;
    width: 100%;
    height: min(9.722dvw, 140px);
    border: min(0.139dvw, 2px) dashed;
    border-radius: min(0.278dvw, 4px);
    border-color: #E0E0E0;
    justify-content: center;
    align-items: center;
}

/* remove variance btn */
.remove_variance {
    /* display:flex; */
    width: fit-content;
    height: 100%;
    align-items: end;
    justify-content: center;
    padding-top: min(1.667dvw, 24px);
}

.remove_variance button {
    display: flex;
    width: min(1.389dvw, 20px);
    height: min(1.389dvw, 20px);
    border: none;
    background-color: transparent;
    cursor: pointer;
}

/* .remove_variance button svg{
    width:100%;
    height:auto;
} */

/* add new veriance btn */
.input_field .new_variance {
    display: flex;
    width: 100%;
    height: min(2.5dvw, 36px);
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: min(0.278dvw, 4px);
    padding: min(0.556dvw, 8px) min(0.833dvw, 12px);
    gap: min(0.278dvw, 4px);
    background-color: #BDBDBD;
    box-shadow: 0px min(0.069dvw, 1px) min(0.139dvw, 2px) 0px #0000000D;
    cursor: pointer;
}

.new_variance h6 {
    width: fit-content;
    height: fit-content;
    font-size: min(0.972dvw, 14px);
    line-height: 144%;
    font-weight: 100;
    color: #fff;
}

.new_variance div {
    display: flex;
    width: min(1.389dvw, 20px);
    height: min(1.389dvw, 20px);
    justify-content: center;
    align-items: center;
}

.new_variance:hover {
    background-color: #26AC34;
}

.img_cover>div {
    display: flex;
    width: 100%;
    height: min(9.722dvw, 140px);
    border: min(0.139dvw, 2px) dashed;
    border-radius: min(0.278dvw, 4px);
    border-color: #E0E0E0;
    justify-content: center;
    align-items: center;
}

.img_cover>div input {
    display: none;
}

.img_cover>div label {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: min(0.278dvw, 4px);
    cursor: pointer;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.img_cover>div label div {
    display: flex;
    width: min(3.333dvw, 48px);
    height: min(3.333dvw, 48px);
    justify-content: center;
    align-items: center;
}

.img_cover>div label div svg {
    width: min(2.5dvw, 36px);
    height: min(2.5dvw, 36px);
}

.img_cover>div label h6 {
    width: fit-content;
    height: min(1.389dvw, 20px);
    font-size: min(0.972dvw, 14px);
    line-height: 144%;
    font-weight: 500;
    color: #757575;
}

.img_cover>div label h6 span {
    cursor: pointer;
    color: #26AC34;
}

.img_cover>div label p {
    width: fit-content;
    height: min(1.111dvw, 16px);
    font-weight: 400;
    font-size: min(0.833dvw, 12px);
    color: #6B7280;
}

/* .cover_preview{
    width: 100%;
    height: 100%;
    overflow: hidden;
} */
.img_cover>div label img {
    width: 100%;
    height: auto;
    background-position: center;

}

.input_img>input {
    display: none;
}

.input_img>label {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: min(0.278dvw, 4px);
    cursor: pointer;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.input_img>label>div {
    display: flex;
    width: min(3.333dvw, 48px);
    height: min(3.333dvw, 48px);
    justify-content: center;
    align-items: center;
}

.input_img>label>div svg {
    width: min(2.5dvw, 36px);
    height: min(2.5dvw, 36px);
}

.input_img>label h6 {
    width: fit-content;
    height: min(1.389dvw, 20px);
    font-size: min(0.972dvw, 14px);
    line-height: 144%;
    font-weight: 500;
    color: #757575;
}

.input_img>label h6 span {
    cursor: pointer;
    color: #26AC34;
}

.input_img>label p {
    width: fit-content;
    height: min(1.111dvw, 16px);
    font-weight: 400;
    font-size: min(0.833dvw, 12px);
    color: #6B7280;
}

.input_img>label img {
    width: 100%;
    height: auto;
    background-position: center;
}

/* list of style img */
.style_preview_img {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-wrap: wrap;
    gap: min(0.556dvw, 8px);
}

.style_preview_img>button {
    display: flex;
    width: min(9.722dvw, 140px);
    height: min(9.722dvw, 140px);
    position: relative;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border: none;
    border-radius: min(0.278dvw, 4px);
    background-color: #212121;

}

.style_preview_img>button:hover .remove {
    display: flex;
}

.style_preview_img .remove {
    display: none;
    width: min(1.389dvw, 20px);
    height: min(1.389dvw, 20px);
    justify-content: center;
    align-items: center;
    position: absolute;
    right: min(0.347dvw, 5px);
    top: min(0.347dvw, 5px);
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: all 1s ease;
}

.style_preview_img>button:hover img {
    filter: blur(min(0.278dvw, 4px));

}

.style_preview_img>button img {
    width: 100%;
    height: auto;
    transition: all 0.5s ease;
}

.style_preview_img>label {
    display: flex;
    width: min(9.722dvw, 140px);
    height: min(9.722dvw, 140px);
    justify-content: center;
    align-items: center;
    border: min(0.139dvw, 2px) dashed;
    border-color: #E0E0E0;
    cursor: pointer;
}

.style_preview_img>label>div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.style_preview_img>label>div div {
    display: flex;
    width: min(3.056dvw, 44px);
    height: min(3.056dvw, 44px);
    justify-content: center;
    align-items: center;
    gap: min(0.278dvw, 4px);
}

.style_preview_img>label>div div svg {
    width: min(2.222dvw, 32px);
    height: auto;
}

.style_preview_img>label>div h6 {
    display: flex;
    width: fit-content;
    height: min(1.389dvw, 20px);
    align-items: center;
    font-size: min(0.972dvw, 14px);
    line-height: 144%;
    font-weight: 500;
    color: #26AC34;
}

.variance_list {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
}

.input_list {
    display: flex;
    width: 100%;
    height: fit-content;
    gap: min(1.667dvw, 24px);
}

.product_list {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
}

.product_list .product_item {
    display: flex;
    width: 100%;
    height: min(6.944dvw, 100px);
    padding: min(0.833dvw, 12px) 0px;
}

.product_item .product_info {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: start;
}

/* .product_info{
    display: flex;
    width: 100%;
} */
/* img */
.product_img {
    display: flex;
    width: min(5.278dvw, 76px);
    height: min(5.278dvw, 76px);
    overflow: hidden;
    border: none;
    border-radius: min(0.278dvw, 4px);
    justify-content: center;
    align-items: center;
    background-color: #D9D9D9;
}

.product_img img {
    width: 100%;
    height: auto;
}

.product_detail {
    display: flex;
    width: 100%;
    height: 100%;
    padding-left: min(1.667dvw, 24px);
    overflow: hidden;
    flex-direction: column;
    justify-content: space-between;

}

.product_detail .header {
    display: flex;
    width: 100%;
    height: min(1.389dvw, 20px);
    justify-content: space-between;
}

/* header */
.header .info {
    display: flex;
    width: 100%;
    height: 100%;
    gap: min(0.833dvw, 12px);
}

.info h5 {
    width: fit-content;
    height: fit-content;
    font-size: min(0.972dvw, 14px);
    line-height: 144%;
    font-weight: 500;
    color: #212121
}

.info h6 {
    width: fit-content;
    height: fit-content;
    font-size: min(0.972dvw, 14px);
    line-height: 144%;
    font-weight: 400;
    color: #616161;
    text-overflow: ellipsis;
    overflow: hidden;
}

.header .operator {
    display: flex;
    width: fit-content;
    height: 100%;
    gap: min(0.556dvw, 8px);
}

.operator button {
    display: flex;
    width: min(1.389dvw, 20px);
    height: min(1.389dvw, 20px);
    border: none;
    background-color: transparent;
    cursor: pointer;

}

.operator button div {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
}

.product_detail .price {
    display: flex;
    width: 100%;
    height: min(1.667dvw, 24px);
    align-items: center;
}

.price h6 {
    font-size: min(1.111dvw, 16px);
    font-weight: 400;
    color: #26AC34;
    text-overflow: ellipsis;
    overflow: hidden;
}

.product_detail .variation {
    display: flex;
    width: 100%;
    height: min(1.389dvw, 20px);
    gap: min(1.667dvw, 24px);
}

.variation h6 {
    width: fit-content;
    height: 100%;
    font-size: min(0.972dvw, 14px);
    line-height: 144%;
    font-weight: 500;
    color: #212121;
    text-overflow: ellipsis;
    overflow: hidden;
}

.variation p {
    font-size: min(0.972dvw, 14px);
    line-height: 144%;
    font-weight: 400;
    color: #616161;
    text-overflow: ellipsis;
    overflow: hidden;
}

.wrapper_errorMsg {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    padding: min(0.556dvw, 8px) min(0.833dvw, 12px);
    font-size: min(0.833dvw, 12px);
    border-radius: min(0.278dvw, 4px);
    background-color: rgba(245, 72, 74, 0.08);
    gap: min(0.556dvw, 8px)
}

.wrapper_errorMsg div {
    display: flex;
    width: inherit;
    height: inherit;
    gap: min(0.278dvw, 4px);
}

.wrapper_errorMsg div svg {
    width: min(1.042dvw, 15px);
    height: min(1.042dvw, 15px);
}

.wrapper_errorMsg div p {
    width: 100%;
    font-size: min(0.833dvw, 12px);
    font-style: normal;
    font-weight: 400;
    line-height: 136%;
    /* 16.32px */
    letter-spacing: min(0.014dvw, 0.2px);
    color: #F75555;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* 
.submit {
    display: flex;
    width: 100%;
    height: min(4.167dvw, 60px);
    padding: min(0.833dvw, 12px) min(1.389dvw, 20px);
    gap: min(0.556dvw, 8px);
    justify-content: end;
    background-color: #FAFAFA;
}

.submit button {
    width: min(5.556dvw, 80px);
    height: min(2.5dvw, 36px);
    border: min(0.069dvw, 1px) solid;
    padding: min(0.556dvw, 8px) min(0.833dvw, 12px);
    border-radius: min(0.278dvw, 4px);
    box-shadow: 0px min(0.069dvw, 1px) min(0.139dvw, 2px) 0px #0000000D;
    cursor: pointer;
}

.submit button:nth-child(1) {
    border-color: #E0E0E0;
    background-color: #fff;
    color: #212121;
}

.submit button:nth-child(2) {
    border-color: #26AC34;
    background-color: #26AC34;
    color: #fff;
} */
</style>