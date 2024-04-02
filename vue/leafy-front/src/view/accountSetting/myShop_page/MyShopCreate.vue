<script setup>
import {computed,onBeforeMount, onMounted, onUpdated, ref} from 'vue'
// import {useRoute} from 'vue-router'
import fetch from '../../../JS/api';
import vaidation from '../../../JS/validation'
import { useRoute, useRouter } from 'vue-router';
import productEnum from '../../../JS/enum/product'

// link
const myRouter=useRouter()
const goBack =()=>myRouter.go(-1)
const goEdit=()=>myRouter.push({name:'Shop_AS_add',params: {id: productId.value }})
// common attribute
const { params } = useRoute()
const productStyleList=ref([])
const productId=ref('')
const productOrigin=ref({})
let origin = `${import.meta.env.VITE_BASE_URL}`;

// status
const isProductChange=ref(false)
const isStyleChange=ref(false)
const isEdit=ref(false)
const isStyleEdit=ref(false)
const showStyleInput=ref(false)
// add product
const productName=ref('')
const productDes=ref('')
const productImgCover=ref(undefined)
const productCategory=ref('')
const productTag=ref([])
const tagText=ref('')

// add style
const styleName=ref('')
const styleImgList=ref([])
const styleVariance=ref([])
const maxVariance=10
// add style status
const styleNameS=ref(false)
const styleImgListS=ref(false)
const styleVarianceS=ref(false)
// cover image 
const coverImage=ref(undefined)
const coverImageS = ref(false)



// for set format input data
const formDataProduct=computed(()=>{
    let returnData={productStatus:false,productData:{},productStyle:{}}
    let status=true
    //product
    if(productName.value.length==0){
        status=false
        console.log('product name')
    }
    if(productCategory.value.length==0){
       status=false
       console.log('product category')

    }
    //style
    if(styleVariance.value.length==0&&isEdit.value==false){
        status=false
        console.log('style var list')

    }
    //create mode
    if(styleVariance.value.length!=0 &&isEdit.value==false){
        for(let st of styleVariance.value){
            if(st.size.length==0){
                status=false
                console.log('style var size')

            }else
            if(st.price==0){
                status=false
                console.log('style var price')
            }else
            if(st.stock==0){
                status=false
                console.log('style var stock')
            }
        }
    }
    if(styleName.value.length==0&&isEdit.value==false){
        status=false
        console.log('style names')
    }
    
    // send data
    if(status){
        productTag.value=tagText.value.split(",")
        // create mode
        if(!isEdit.value){
            
            returnData.productStatus=true
            returnData.productStyle={
                style:styleName.value,
                sizes:styleVariance.value  
            }
            returnData.productData={
                name:productName.value,
                description:productDes.value,
                type:productCategory.value,
                tag:productTag.value,
                styles:[
                    returnData.productStyle
                ]
            }
            
        }else{
            // let isChange =false //data change??
            // edit mode
            // product detail
            // console.log(productOrigin.value)

            let {name,description,type,tag}=productOrigin.value //destructuring
            if(productName.value!=name){
                isProductChange.value=true
                returnData.productData["name"]=productName.value
            }
            if(productDes.value!=description){
                isProductChange.value=true
                returnData.productData["description"]=productDes.value
            }
            if(productCategory.value!=type){
                isProductChange.value=true
                returnData.productData["type"]=productCategory.value
            }
            if(
                tagText.value.length!=0||
                tagText.value!=(tag==undefined?tag:tag.join())
            ){
                isProductChange.value=true
                returnData.productData["tag"]=productTag.value
            }
            
            // product style
            returnData.productStyle={
                style:styleName.value,
                sizes:styleVariance.value  
            }
            // edit mode
            
            if(styleVariance.value.length!=0 &&isEdit.value==true){
                for(let st of styleVariance.value){
                    
                    st.price=parseInt(st.price)
                    st.stock =parseInt(st.stock)
                    if(st.size.length==0){
                        styleVarianceS.value=true
                        console.log('style var size')
                    }else
                    if(st.price==0){
                        styleVarianceS.value=true
                        console.log('style var price')
                    }else
                    if(st.stock==0){
                        styleVarianceS.value=true
                        console.log('style var stock')
                    }
                }
            }
            if(styleName.value.length==0&&isEdit.value==true){
                styleNameS.value=true
                console.log('style names')
            }
            console.log(returnData)
            returnData.productStatus=true
            
             //assign to show button
        }
       return returnData
    }else{
        return returnData
    }

})
// get style
const getProductDetail=async(itemId)=>{
    let {status,data}=await fetch.getProductDetail(itemId)
    if(status){
        console.log(data)
        // console.log(data.tag.join())
        // product
        productOrigin.value=data
        productName.value=data.name
        productDes.value=data.description
        productCategory.value=data.type
        tagText.value=data.tag!=undefined?data.tag.join():''
        // style
        productStyleList.value=data.styles
    }
}

// add product
const addProduct=async()=>{
    
    let {productStatus,productData}=formDataProduct.value //เป็นแม่แบบสำหรับดึงข้อมูลและตรวจสอบค่าที่ใส่เข้าไป
    
    if(productStatus){
        let {status,msg,data}= await fetch.addProduct(productData)
        let {itemId}=data
        productId.value=itemId
        console.log(status,msg,itemId)
        await getProductDetail(productId.value)
        // isEdit.value=true
        if(coverImage.value!=undefined){//add new img
            await addImg()
        }
        if(styleImgList.value.length!=0){
            await addStyleImg()
        }
        goEdit()
        productClear()
    }else{
        console.log('error data invalid')
    }
}
// edit product
const updateProduct=async()=>{
    let {productStatus,productData}=formDataProduct.value

    if(productStatus&&isProductChange.value){
        let {status,msg}=await fetch.updateProduct(productId.value,productData)
        if(status){
            console.log('update product successful')
            if(coverImage.value!=undefined){
                await addImg()
            }
            productClear()
        }else{
            console.log('can not update product')
        }
    }
}

// add product img
const addImg=async()=>{
    let{status}=await fetch.addImage(coverImage.value,'products',productId.value)
    if(status){
        console.log('upload images successful')
    }
}

// style update
const addStyle=async()=>{
    
    let {productStatus,productStyle} =formDataProduct.value
    console.log(productStatus,styleVarianceS.value,styleNameS.value)
    console.log(isStyleEdit.value,isEdit.value)
    if(isStyleEdit.value&&isEdit.value){ //this edit mode of style??
       // edit style
        let {status,msg}=await fetch.updateProductStyle(productId.value,styleName.value,productStyle)
        if(status){
            console.log('update style successful')
            styleStatusClear() 
        }else{
            console.log('can not update style')
        }
    }else{
        // add style
        if(productStatus&&!styleVarianceS.value&&!styleNameS.value){
            let {status,msg}=await fetch.addProductStyle(productId.value,productStyle)
            if(status){
                console.log('add successful')
                await getProductDetail(productId.value)
                isEdit.value=true
                styleClear()
                styleStatusClear()
            }else{
                // error
                console.log('can not add')
            }
        }
    }
    
}
// edit style
const updateStyle=(sku)=>{
    showStyleInput.value=true //show input field
    let {price,size,sizes,stock,style}=sku

    if(size!=undefined){
        // size is string 1 size
        console.log('size')
        styleVariance.value=[{size:size,price:price,stock:stock}]
    }else{
        // size is array many of size
        console.log(size)
        styleVariance.value=sizes
    }
    styleName.value=style
    
    isStyleEdit.value=true
    console.log(isStyleEdit.value,'style edit')
    // styleName=ref('')
    // styleImgList=ref([])
    // styleVariance=ref([])
    console.log(sku )
}

// delete style
const deleteStyle=async(skuId='')=>{
    if(skuId.length!=0){
        let {status,msg}=await fetch.deleteProductStyle(productId.value,skuId)
        if(status){
            console.log('delete style successful')
            await getProductDetail(productId.value)
        }else{
            console.log('cannot delete style')
        }
    }
}
//add img style
const addStyleImg=async()=>{
    let {status,msg}=await fetch.addImages(styleImgList.value,'products',`${productId.value}/${styleName.value}`)
    if(status){
        console.log()
        styleImgList.value=[]
        styleImgListS.value=false
    }
}


// select mode style btn
const styleModeSelection=async()=>{
    if(isEdit.value){//edit mode do ....
        await addStyleImg()
        await addStyle()
        
    }else{ // create mode
        await addProduct(productId.value)
        
    }
}


// style obj to array
const addVariance=()=>{
    const formData={size:'',price:0,stock:0}
    if(styleVariance.value.length<maxVariance){
        styleVariance.value.push(formData)
    }
}
// for show input field
const showInputFiel=()=>{
    // styleClear()
    
    showStyleInput.value=!showStyleInput.value
    styleClear()
    addVariance()//initail variance obj
    isStyleEdit.value=false
}

const removeVariance=(index)=>{
    //remove from index
    styleVariance.value.splice(index, 1)
}

// product clear
const productClear=()=>{
    isProductChange.value=false
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
}
// style clear
const styleStatusClear=()=>{
    styleNameS.value=false
    styleVarianceS.value=false
    isStyleEdit.value=false
    showStyleInput.value=false
}
const styleClear=()=>{
    
    styleName.value=''
    styleImgList.value=[]
    styleVariance.value=[]
    // showStyleInput.value=false

}
// check image
const checkMainImage=async()=>{
    let{status,msg}=await fetch.getImage('products',productId.value)
    if(status){
        coverImageS.value=true
    }
}

//preview img
const previewCoverImage = (event, elementId) => {
    console.log(event, ' this preview')
    // const file = event.target.files;
    // const fileReader = new FileReader(); //for reading file
    const preview = document.getElementById(elementId)
    // // จะทำงานเมื่อมีการเปลี่ยนเปลงของ Document เหมือน event hook ของ JS  
    // fileReader.onload = event => {
        console.log(preview,'this preview amazing')
    preview.setAttribute('src', URL.createObjectURL(event)); //event.target.result
    //     }
    //     fileReader.readAsDataURL(file[0]);
    // console.log(event)
}

// image
const uploadStyleImage = async(event) => {
    if (event == undefined) {
        console.log("pls up load photo")
    } else {
        let file = event.target.files[0] //แยกไฟล์ออกมา
        console.log(file)
        const fSize = Math.round((file.size / 100000))
        const maxFileSize = 10
        // เอามาตรวจสอบว่ามีขนาดเกิน 5 MB ?
        console.log('file size :', fSize)
        if (maxFileSize >= fSize) {
            console.log('nice file')
            // userImage.value = file;// assign
            styleImgList.value.push(file)
            // console.log(styleImgList.value)
            // previewCoverImage(styleImgList.value[0],`style_preview_${0}`)
            
            
        } else {
            console.log('file too big')
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
        const fSize = Math.round((file.size / 100000))
        const maxFileSize = 10
        // เอามาตรวจสอบว่ามีขนาดเกิน 10 MB ?
        console.log('file size :', fSize)
        if (maxFileSize >= fSize) {
            console.log('nice file')
            if (event.target != undefined) coverImage.value = file;
            else coverImage.value = file;
            previewCoverImage(file, "cover-preview")
        } else {
            console.log('file too big')
        }

    }
}
//drop event
const dropHandle = (event) => {
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


        // [...event.dataTransfer.items].forEach((item, i) => {
        // // If dropped items aren't files, reject them
        // if (item.kind === "file") { 
        //     const file = item.getAsFile(); //if is file return file ,null
        //     // console.log(`… file[${i}].name = ${file.name}`);
        //     console.log(`… file[${i}] =`, file);

        // }
        //     // console.log('this not image')
        // });
    }
}
const dragover = (event) => {
    event.preventDefault()
}




onBeforeMount(async()=>{
    // console.log(params.id)
    if(params.id==undefined||params.id==''){ // add mode
        isEdit.value=false
    }else{// edit mode
        isEdit.value=true
        productId.value=params.id
        await getProductDetail(productId.value)
        await checkMainImage()
        // do some thing about 
    }
        
})
onMounted(()=>{
    addVariance()
    
   
})
onUpdated(()=>{
    // reassign every updated
    for(let i=0;i<styleImgList.value.length;i++){
        previewCoverImage(styleImgList.value[i],`style_preview_${i}`)// must loop
    }
})

</script>
<template>
    <div class="wrapper_all">
        <div class="wrapper_shop">
            <!-- <div class="wrapper_all"> -->
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
                                <h5>
                                    Name
                                </h5>
                                <input v-model="productName" class="input" type="text">
                            </div>
                            <!-- description -->
                            <div class="input_field">
                                <h5>
                                    Description
                                </h5>
                                <textarea v-model="productDes" class="input_description" placeholder="Something about product."></textarea>
                            </div>
                            <!-- cover photo -->
                            <div class="img_cover input_field">
                                <h5>
                                    Cover Photo
                                </h5>
                                <!-- <div class="input_img">
                                    

                                </div> -->
                                <div v-show="coverImage == undefined && coverImageS == false" class="input_img" @drop="dropHandle" @dragover="dragover">
                                    <input @change="uploadCoverImage"  id="cover_image" type="file" accept="image/*">
                                    <label  for="cover_image">
                                        <div>
                                            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 5H5C3.93913 5 2.92172 5.42143 2.17157 6.17157C1.42143 6.92172 1 7.93913 1 9V29M1 29V33C1 34.0609 1.42143 35.0783 2.17157 35.8284C2.92172 36.5786 3.93913 37 5 37H29C30.0609 37 31.0783 36.5786 31.8284 35.8284C32.5786 35.0783 33 34.0609 33 33V25M1 29L10.172 19.828C10.9221 19.0781 11.9393 18.6569 13 18.6569C14.0607 18.6569 15.0779 19.0781 15.828 19.828L21 25M33 17V25M33 25L29.828 21.828C29.0779 21.0781 28.0607 20.6569 27 20.6569C25.9393 20.6569 24.9221 21.0781 24.172 21.828L21 25M21 25L25 29M29 5H37M33 1V9M21 13H21.02" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>                            
                                        </div>
                
                                        <h6 >
                                        <span>
                                            Upload a file
                                        </span> or drag and drop
                                        </h6>
                                        <p >
                                            PNG or JPG up to 10MB
                                        </p>
                                        
                                    </label>
                                    
                                </div>
                                <div v-show="coverImage != undefined || coverImageS == true" @drop="dropHandle" @dragover="dragover">
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
                                    <h5>
                                        Category
                                    </h5>
                                    <select v-model="productCategory" class="input" >
                                        <option  value="" selected hidden>this is value</option>
                                        <option v-for="(type,index) of productEnum.itemType" :key="index" :value="type.value">{{type.name}}</option>
                                    </select>
                                </div>
                                <!-- cover photo -->
                                <div class="input_field">
                                    <h5>
                                        Tag
                                    </h5>
                                    <input v-model="tagText" type="text" class="input">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- submit -->
                    <div v-show="isEdit" class="submit" >
                        <button @click="goBanks()">
                            Cancel
                        </button>
                        <button @click="updateProduct()" >
                            Save
                        </button>
                    </div>
                <!-- </div> -->
            </div>
            <!-- <div class="wrapper_all"> -->
                <!-- product style -->
                <div  class="wrapper_shop_create">
                    <!-- add new product -->
                    <div  class="shop_create">
                        <!-- header -->
                        <div class="header_shop_create">
                            <h4>
                                Product Style
                            </h4>
                            <button @click="showInputFiel">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C5.26522 0 5.51957 0.105357 5.70711 0.292893C5.89464 0.48043 6 0.734784 6 1V4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5C10 5.26522 9.89464 5.51957 9.70711 5.70711C9.51957 5.89464 9.26522 6 9 6H6V9C6 9.26522 5.89464 9.51957 5.70711 9.70711C5.51957 9.89464 5.26522 10 5 10C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H4V1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0Z" fill="white"/>
                                </svg>
                                New Style
                            </button>
                        </div>
                        <!-- container input -->
                        <div v-show="showStyleInput"  class="container_input">
                            <!-- sku/name -->
                            <div class="input_field">
                                    <h5>
                                        SKU / Name of Style
                                    </h5>
                                    <input v-model="styleName" type="text" class="input" :disabled=" isStyleEdit">
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
                                <h5>
                                    Photo Style
                                </h5>
                                <!-- <div class="input_img">

                                </div> -->
                                <div v-show="styleImgList.length==0"  @drop="dropHandle" @dragover="dragover" class="input_img">
                                    <input @change="uploadStyleImage"  id="style_image" type="file" accept="image/*">
                                    <label  for="style_image">
                                        <div>
                                            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 5H5C3.93913 5 2.92172 5.42143 2.17157 6.17157C1.42143 6.92172 1 7.93913 1 9V29M1 29V33C1 34.0609 1.42143 35.0783 2.17157 35.8284C2.92172 36.5786 3.93913 37 5 37H29C30.0609 37 31.0783 36.5786 31.8284 35.8284C32.5786 35.0783 33 34.0609 33 33V25M1 29L10.172 19.828C10.9221 19.0781 11.9393 18.6569 13 18.6569C14.0607 18.6569 15.0779 19.0781 15.828 19.828L21 25M33 17V25M33 25L29.828 21.828C29.0779 21.0781 28.0607 20.6569 27 20.6569C25.9393 20.6569 24.9221 21.0781 24.172 21.828L21 25M21 25L25 29M29 5H37M33 1V9M21 13H21.02" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>                            
                                        </div>
                
                                        <h6 >
                                        <span>
                                            Upload a file
                                        </span> or drag and drop
                                        </h6>
                                        <p >
                                            PNG or JPG up to 10MB
                                        </p>
                                        
                                    </label>
                                    
                                </div>
                                <div v-show="styleImgList.length!=0" class="style_preview_img" > <!--v-show="styleImgList.length!=0 || StyleImImageS == true" @drop="dropHandle" @dragover="dragover"--> 
                                    <!-- for show img -->
                                    <button v-for="(img,index) of styleImgList.length" :key="index" >
                                        <img src="#" :id="`style_preview_${index}`" alt="style_img">
                                    </button>
                                    <label  for="style_image" @drop="dropHandle" @dragover="dragover">
                                        <!-- รูปที่จะเพิ่ม
                                        <img v-show="styleImgList.length != 0" src="#" draggable="false" alt="preview_image"
                                            id="style-preview">
                                        รูปที่มีแล้ว
                                        <img v-show="styleImgList.length == 0 && StyleImImageS == true"
                                            :src="`${origin}/api/image/products/${productId}`" draggable="false"
                                            alt="preview_image" id="style-preview"> -->
                                        <div>
                                            <!-- svg -->
                                            <div>
                                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19.6666 5.33268H4.99992C4.02746 5.33268 3.09483 5.71899 2.40719 6.40662C1.71956 7.09426 1.33325 8.02689 1.33325 8.99935V27.3327M1.33325 27.3327V30.9993C1.33325 31.9718 1.71956 32.9044 2.40719 33.5921C3.09483 34.2797 4.02746 34.666 4.99992 34.666H26.9999C27.9724 34.666 28.905 34.2797 29.5926 33.5921C30.2803 32.9044 30.6666 31.9718 30.6666 30.9993V23.666M1.33325 27.3327L9.74092 18.925C10.4285 18.2376 11.361 17.8515 12.3333 17.8515C13.3055 17.8515 14.238 18.2376 14.9256 18.925L19.6666 23.666M30.6666 16.3327V23.666M30.6666 23.666L27.7589 20.7583C27.0713 20.071 26.1389 19.6848 25.1666 19.6848C24.1943 19.6848 23.2619 20.071 22.5743 20.7583L19.6666 23.666M19.6666 23.666L23.3333 27.3327M26.9999 5.33268H34.3333M30.6666 1.66602V8.99935M19.6666 12.666H19.6849" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
                                <div v-for="(variance,index) of styleVariance" :key="index" class="input_list">
                                    <!-- size-->
                                    <div class="input_field">
                                        <h5>
                                            Variation
                                        </h5>
                                        <input v-model="variance.size" type="text" class="input" >
                                    </div>
                                    <!-- price -->
                                    <div class="input_field">
                                        <h5>
                                            Price
                                        </h5>
                                        <div class="input input_price">
                                            <input v-model.number="variance.price" type="number"  placeholder="฿ 0.00">
                                            <h6>
                                                THB
                                            </h6>
                                        </div>
                                    </div>
                                    <!-- stock -->
                                    <div class="input_field">
                                        <h5>
                                            Stock
                                        </h5>
                                        <input v-model.number="variance.stock" type="number" class="input">
                                    </div>
                                    <!--  -->
                                    <div>
                                        <button @click="removeVariance(index)">
                                            X
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- add variation -->
                            <div @click="addVariance" class="input_field">
                                <button>
                                    new variation
                                </button>
                            </div>
                        </div>

                        <!-- product list -->
                        <div class="product_list">
                            <div v-for="(styleItem,index) of productStyleList" :key="index" class="product_item">
                                <div class="product_info">
                                    <!-- img -->
                                    <div class="product_img">
                                        <img src="../../../assets/vue.svg" alt="product_img">
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
                                                    {{styleItem.style}}
                                                </h6>
                                            </div>
                                            <!-- operator -->
                                            <div class="operator">
                                                <!-- edit -->
                                                <button @click="updateStyle(styleItem)">
                                                    <div>
                                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.16667 3.16762H3C2.55798 3.16762 2.13405 3.34321 1.82149 3.65577C1.50893 3.96833 1.33334 4.39225 1.33334 4.83428V14.0009C1.33334 14.443 1.50893 14.8669 1.82149 15.1795C2.13405 15.492 2.55798 15.6676 3 15.6676H12.1667C12.6087 15.6676 13.0326 15.492 13.3452 15.1795C13.6577 14.8669 13.8333 14.443 13.8333 14.0009V9.83428M12.655 1.98928C12.8087 1.8301 12.9927 1.70313 13.196 1.61578C13.3993 1.52843 13.618 1.48245 13.8393 1.48053C14.0606 1.47861 14.2801 1.52078 14.4849 1.60458C14.6898 1.68838 14.8758 1.81214 15.0323 1.96862C15.1888 2.12511 15.3126 2.3112 15.3964 2.51603C15.4802 2.72085 15.5223 2.94032 15.5204 3.16162C15.5185 3.38292 15.4725 3.60162 15.3852 3.80496C15.2978 4.0083 15.1709 4.1922 15.0117 4.34595L7.85667 11.5009H5.5V9.14428L12.655 1.98928Z" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                    </div>
                                                </button>
                                                <!-- delete -->
                                                <button @click="deleteStyle(styleItem.style)">
                                                    <div>
                                                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.33333 8.16667V13.1667M9.66666 8.16667V13.1667M1.33333 4.83333H14.6667M13.8333 4.83333L13.1108 14.9517C13.0809 15.3722 12.8927 15.7657 12.5843 16.053C12.2758 16.3403 11.8699 16.5 11.4483 16.5H4.55166C4.13011 16.5 3.72422 16.3403 3.41573 16.053C3.10725 15.7657 2.91909 15.3722 2.88916 14.9517L2.16666 4.83333H13.8333ZM10.5 4.83333V2.33333C10.5 2.11232 10.4122 1.90036 10.2559 1.74408C10.0996 1.5878 9.88768 1.5 9.66666 1.5H6.33333C6.11231 1.5 5.90035 1.5878 5.74407 1.74408C5.58779 1.90036 5.49999 2.11232 5.49999 2.33333V4.83333H10.5Z" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                    </div>
                                                        

                                                </button>
                                            </div>
                                        </div>
                                        <!-- price -->
                                        <div class="price">
                                            {{styleItem.price}}
                                        </div>
                                        <!-- variation -->
                                        <div class="variation">
                                            <span v-for="(size,index) of styleItem.sizes" :key="index">{{size.size}}/</span>
                                            
                                        </div>
                                    </div>
                                </div>
                                <!-- for edit -->
                                <div v-show="false"  class="container_input">
                                    <!-- sku/name -->
                                    <div class="input_field">
                                            <h5>
                                                SKU / Name of Style
                                            </h5>
                                            <input v-model="styleName" type="text" class="input">
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
                                        <h5>
                                            Photo Style
                                        </h5>
                                        <!-- <div class="input_img">

                                        </div> -->
                                        <!-- <div class="input_img">
                                            <input @change="uploadCoverImage"  id="cover_image" type="file" accept="image/*">
                                            <label  for="cover_image">
                                                <div>
                                                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M21 5H5C3.93913 5 2.92172 5.42143 2.17157 6.17157C1.42143 6.92172 1 7.93913 1 9V29M1 29V33C1 34.0609 1.42143 35.0783 2.17157 35.8284C2.92172 36.5786 3.93913 37 5 37H29C30.0609 37 31.0783 36.5786 31.8284 35.8284C32.5786 35.0783 33 34.0609 33 33V25M1 29L10.172 19.828C10.9221 19.0781 11.9393 18.6569 13 18.6569C14.0607 18.6569 15.0779 19.0781 15.828 19.828L21 25M33 17V25M33 25L29.828 21.828C29.0779 21.0781 28.0607 20.6569 27 20.6569C25.9393 20.6569 24.9221 21.0781 24.172 21.828L21 25M21 25L25 29M29 5H37M33 1V9M21 13H21.02" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>                            
                                                </div>
                        
                                                <h6 >
                                                <span>
                                                    Upload a file
                                                </span> or drag and drop
                                                </h6>
                                                <p >
                                                    PNG or JPG up to 10MB
                                                </p>
                                                
                                            </label>
                                            
                                        </div> -->
                                    </div>
                                    <!-- Variation Price & Stock -->
                                    <div class="variance_list">
                                        <div v-for="(variance,index) of styleVariance" :key="index" class="input_list">
                                            <!-- size-->
                                            <div class="input_field">
                                                <h5>
                                                    Variation
                                                </h5>
                                                <input v-model="variance.size" type="text" class="input">
                                            </div>
                                            <!-- price -->
                                            <div class="input_field">
                                                <h5>
                                                    Price
                                                </h5>
                                                <div class="input input_price">
                                                    <input v-model.number="variance.price" type="number"  placeholder="฿ 0.00">
                                                    <h6>
                                                        THB
                                                    </h6>
                                                </div>
                                            </div>
                                            <!-- stock -->
                                            <div class="input_field">
                                                <h5>
                                                    Stock
                                                </h5>
                                                <input v-model.number="variance.stock" type="number" class="input">
                                            </div>
                                        </div>
                                    </div>
                                    <!-- add variation -->
                                    <div @click="addVariance" class="input_field">
                                        <button>
                                            new variation
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- submit -->
                    <div v-show="true" class="submit">
                        <button @click="goBanks()">
                            Cancel
                        </button>
                        <button @click="styleModeSelection()">
                            Save
                        </button>
                    </div>
                </div>
            <!-- </div> -->
    </div>
</div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_all {
    width: inherit;
    min-width: 928px;
    height: 100%;
    /* min-height: 100%; */
    /* max-height: 200dvh; */
    overflow: hidden;
    /* border: none; */
    gap: 24px;
}
.wrapper_shop{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 24px;
    overflow: hidden;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
}
.wrapper_shop_create{
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
    border-radius: 8px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    gap: 24px;
}
.shop_create{
    display: flex;
    width: 100%;
    /* min-width: 928px; */
    height: fit-content;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    align-items: start;
    /* align-items: center; */
    gap: 24px;
    /* background-color: #3683c7; */
}
.header_shop_create{
    display: flex;
    width: 100%;
    height: inherit;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    /* background-color: #42c736; */
}
.header_shop_create h4{
    display: flex;
    width: 100%;
    height: 28px;
    font-size: 18px;
    font-weight: 500;
    color: #212121;
    align-items: center;
}
.header_shop_create button{
    display: flex;
    width: fit-content;
    height: 36px;
    border-radius: 4px;
    border: none;
    padding: 8px 12px 8px 8px;
    gap: 4px;
    background-color: #BDBDBD;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0px 1px 2px 0px #0000000D;
    align-items: center;
    justify-content: start;
    cursor: pointer;
    white-space: nowrap
}
.header_shop_create button svg{
    width: 10px;
    height: 10px;
    margin: 5px;
}
.container_input{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 24px;
}
.container_input .input_field{
    display: flex;
    width: inherit;
    height: fit-content;
    flex-direction: column;
    gap: 4px;
}
.container_input .input_field h5{
    display: flex;
    width: fit-content;
    height: 20px;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
}
.input_field .input{
    width: 100%;
    height: 36px;
    padding: 8px 12px;
    background-color: #fff;
    border: 1px solid;
    border-radius: 4px;
    border-color: #D1D5DB;
    box-shadow: 0px 1px 2px 0px #0000000D;

}
.input:focus-within{
    outline: auto;
}
.input_field .input_description{
    width: 100%;
    height: 100px;
    min-height: 36px;
    max-height: 150px;
    padding: 8px 12px;
    resize: vertical;
    border: 1px solid;
    border-radius: 4px;
    border-color: #D1D5DB;
    background-color: #fff;
    box-shadow: 0px 1px 2px 0px #0000000D;
}
.input_field .input_price{
    display: flex;
}
.input_field .input_price input{
    width: 100%;
    height: fit-content;
   border: none;
   outline: none;
}
.input_field .input_price h6{
    font-size: 14px;
    font-weight: 400;
    color: #9E9E9E;
}
.input_field .input_img{
    display: flex;
    width: 100%;
    height: 140px;
    border: 2px dashed; 
    border-radius: 4px;
    border-color: #E0E0E0;
    justify-content: center;
    align-items: center;
}
.img_cover>div {
    display: flex;
    width: 100%;
    height: 140px;
    border: 2px dashed;
    border-radius: 4px;
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
    gap: 4px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.img_cover>div label div {
    display: flex;
    width: 48px;
    height: 48px;
    justify-content: center;
    align-items: center;
}

.img_cover>div label div svg {
    width: 36px;
    height: 36px;
}

.img_cover>div label h6 {
    width: fit-content;
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #757575;
}

.img_cover>div label h6 span {
    cursor: pointer;
    color: #26AC34;
}

.img_cover>div label p {
    width: fit-content;
    height: 16px;
    font-weight: 400;
    font-size: 12px;
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
.input_img> input{
    display: none;
}
.input_img> label{
    display: flex;
    width: 100%;
    height:100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.input_img >label> div{
    display: flex;
    width: 48px;
    height: 48px;
    justify-content: center;
    align-items: center;
}
.input_img >label> div svg{
    width: 36px;
    height: 36px;
}
.input_img> label h6{
    width: fit-content;
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #757575;
}
.input_img >label h6 span{
    cursor: pointer;
    color: #26AC34;
}
.input_img >label p{
    width: fit-content;
    height: 16px;
    font-weight: 400;
    font-size: 12px;
    color: #6B7280;
}
.input_img >label img{
    width: 100%;
    height: auto;
    background-position: center;
}
/* list of style img */
.style_preview_img{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-wrap: wrap;
}
.style_preview_img>button{
    display: flex;
    width: 140px;
    height: 140px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.style_preview_img>button img{
    width: 100%;
    height: auto;
}
.style_preview_img >label{
    display: flex;
    width:140px;
    height: 140px;
    border: 1px dashed;
    justify-content: center;
    align-items: center;
}
.variance_list{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
}
.input_list{
    display: flex;
    width: 100%;
    height: fit-content;
    gap: 24px;
}

.submit {
    display: flex;
    width: 100%;
    height: 60px;
    padding: 12px 20px;
    gap: 8px;
    justify-content: end;
    background-color: #FAFAFA;
}

.submit button {
    width: 80px;
    height: 36px;
    border: 1px solid;
    padding: 8px 12px;
    border-radius: 4px;
    box-shadow: 0px 1px 2px 0px #0000000D;
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
}
</style>