<script setup>
import {ref,computed,onBeforeMount,onUpdated} from 'vue'
import fetch from '../../../JS/api';
import validation from '../../../JS/validation'
import BaseSubmit from '../../../components/accountSetting/BaseSubmit.vue';
import BaseShowErrorInput from '../../../components/accountSetting/BaseShowErrorInput.vue'
import {useRoute,useRouter} from 'vue-router'
import { v4 as uuidv4 } from 'uuid';
import BaseAlert from '../../../components/BaseAlert.vue';
// link
const myRouter=useRouter()
const goMyGallery=()=>myRouter.push({name:'MyGallery_AS'})
let origin = `${import.meta.env.VITE_BASE_URL}`;


// common attribute
let{params} =useRoute()
const isEdit=ref(false)
const galleryContentId=ref('')
const galleryOrigin=ref({})
// const isDataChange=ref(false) //for check data change?
// input attribute
const galleryName=ref('')
const galleryDesc=ref('')
const galleryCoverImg=ref(undefined)
const galleryStyle=ref('')
const galleryOtherStyle=ref('')
const galleryPhotoList =ref([])
const maxGalleryPhotoList =10
// input status 
const galleryNameS=ref(false)
const galleryDescS=ref(false)
const galleryCoverImgS=ref(false)
const galleryStyleS=ref(false)
const galleryOtherStyleS=ref(false)
const galleryPhotoS =ref(false)
// input Msg
const galleryNameM=ref('')
const galleryDescM=ref('')
const galleryCoverPhotoM=ref(undefined)
const galleryStyleM=ref('')
const galleryOtherStyleM=ref('')
const galleryPhotoM=ref(undefined)

// alert attribute
const isShowAlert=ref(false)
const alertType=ref(0)
const alertDetail=ref('')
const alertTime=ref(2)

// form data
const galleryFormData=computed(()=>{
    let galleryData={}
    let isDataChange=false
    if(galleryName.value!=galleryOrigin.value.name){
        galleryData["name"]=galleryName.value
        isDataChange =true
    }
    if(galleryDesc.value!=galleryOrigin.value.description){
        galleryData["description"]=galleryDesc.value
        isDataChange =true

    }
    if(galleryStyle.value!=galleryOrigin.value.style){
        galleryData["style"]=galleryStyle.value
        isDataChange =true

    }    
    if(galleryCoverImg.value!=undefined){
        isDataChange=true
    }
    
    return {isChange:isDataChange,data:galleryData}
})

// submit
const submitGallery=async()=>{
    let submitStatus=true
    inputStatusClear()
    inputMessageClear()
    // name
    if(galleryName.value.length==0||!validation.text(galleryName.value)){
        submitStatus=false
        galleryNameS.value=true
        galleryNameM.value='Gallery name invalid'
    }
    // desc
    if(galleryDesc.value.length==0){
        submitStatus=false
        galleryDescS.value=true
        galleryDescM.value='Gallery description invalid'
    }
    // style
    if(galleryStyle.value.length==0){
        submitStatus=false
        galleryStyleS.value=true
        galleryStyleM.value='Gallery style invalid'
    }

    

    if(submitStatus){
        if(isEdit.value){ //this edit
            if(galleryFormData.value.isChange){
                if(galleryOrigin.value.image!=undefined){
                    let fetchStatus=true

                    let{status,msg}= await fetch.updateGallery(galleryContentId.value,galleryFormData.value.data)
                    if(await status){
                        console.log("update data successful")
                        await getGallery()
                        fetchStatus=true
                        if(galleryCoverImg.value!=undefined){// start to upload
                            let{status,msg}=await fetch.addImage(galleryCoverImg.value,'gallery',galleryContentId.value)
                            if(status){
                                console.log('add main img successful')
                                fetchStatus=true
                            }else{
                                isShowAlert.value=true
                                alertType.value=1
                                alertDetail.value="Oops! It seems like there's a server error preventing image uploads at the moment. "
                                alertTime.value=10
                                fetchStatus=false
                            }
                        }
                    }else{
                        isShowAlert.value=true
                        alertType.value=1
                        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
                        alertTime.value=10
                        fetchStatus=false
                    }

                    
                    if(fetchStatus){ // all status true
                        goMyGallery()
                    }
                }else{
                    isShowAlert.value=true
                    alertType.value=2
                    alertDetail.value="The system requires an content image to be displayed for the user"
                    alertTime.value=10
                }
            }else{
                // error
            }
        }else{ //this create
            if(galleryCoverImg.value!=undefined){
                let fetchStatus=true
                let{status,msg,data}= await fetch.addGallery(galleryFormData.value.data)
                if(await status){
                    console.log("create data successfull")
                    galleryContentId.value=data.contentId
                    fetchStatus=true
                        if(galleryCoverImg.value!=undefined){// start to upload
                        let{status,msg}=await fetch.addImage(galleryCoverImg.value,'gallery',galleryContentId.value)
                        if(await status){
                            console.log('add main img successful')
                            fetchStatus=true
                        }else{
                            isShowAlert.value=true
                            alertType.value=1
                            alertDetail.value="Oops! It seems like there's a server error preventing image uploads at the moment. "
                            alertTime.value=10
                            fetchStatus=false
                        }
                    }
                }else{
                    isShowAlert.value=true
                    alertType.value=1
                    alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
                    alertTime.value=10
                    fetchStatus=false
                }

                

                if(fetchStatus){
                    goMyGallery()
                }
            }else{
                isShowAlert.value=true
                alertType.value=2
                alertDetail.value="The system requires an content image to be displayed for the user"
                alertTime.value=10
            }
        }
    }
}

// clear status
const inputStatusClear=()=>{
 galleryNameS.value=false
 galleryDescS.value=false
 galleryCoverImgS.value=false
 galleryStyleS.value=false
 galleryOtherStyleS.value=false
 galleryPhotoS.value =false
}
const inputMessageClear=()=>{
 galleryNameM.value=''
 galleryDescM.value=''
 galleryCoverPhotoM.value=''
 galleryStyleM.value=''
 galleryOtherStyleM.value=''
 galleryPhotoM.value =''
}


// for edit

//get gallery
const getGallery=async()=>{
    let{status,data} =await fetch.getGalleryById(galleryContentId.value)
    if(await status){
        
        let {
            contentId,
            name,
            description,
            style,
            image,
            images
        }=await data
        // assign data
        if(contentId!=undefined)galleryContentId.value=contentId;
        if(name!=undefined)galleryName.value=name;
        if(description!=undefined)galleryDesc.value=description;
        if(style!=undefined)galleryStyle.value=style;
        if(image!=undefined)galleryCoverImgS.value=true //cover photo
        if(images!=undefined)galleryPhotoS.value=true //styl photo
        galleryOrigin.value=await data
        console.log(data)
    }else{
        alertType.value=2
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        isShowAlert.value=true
        alertTime.value=10
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
            if (event.target != undefined) galleryCoverImg.value = file;
            else galleryCoverImg.value = file;
            previewCoverImage(file, "cover-preview")
        } else {
            alertType.value=2
            alertDetail.value="The image is too big, over 1 MB in size!"
            isShowAlert.value=true
            alertTime.value=10
        }

    }
}
//drop cover event
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
            alertType.value=2
            alertDetail.value="Please upload only one file."
            isShowAlert.value=true
            alertTime.value=10
        }
    }
}
const dragover = (event) => {
    event.preventDefault()
}

// alert
const getShowAlertChange=(input)=>{
    isShowAlert.value=input
    alertType.value=0
    alertDetail.value=''
    alertTime.value=2
}


onUpdated(async()=>{
    // reassign every updated
    // for(let i of galleryPhotoList.value){
    //     if(i.isFile){
    //         previewStyleImage(i.file,`style_preview_${i.name}`)
    //     }
    // }
    // console.log(await fetch.getImage('products',productId.value))
    // console.log(styleImgList.value,'style img list')
})

onBeforeMount(async()=>{
    validation.navigationTo()
    // console.log(params.id)
    if(params.id==undefined||params.id.length==0){
        isEdit.value=false
    }else{ //is edit
        galleryContentId.value=Number(validation.decrypt(params.id))
        isEdit.value=true
        console.log(galleryContentId.value)
        await getGallery()

    }
})
</script>
<template>
    <div class="wrapper_my_gallery_add">
        <div class="my_gallery_add">
            <!-- header -->
            <h6 class="header_my_gallery_add">
                Add New Project
            </h6>
            <!-- container -->
            <div class="wrapper_input">
                <!-- name-->
                <div class="input_field">
                    <h6 class="inportant_input">
                        Name
                    </h6>
                    <input v-model="galleryName" type="text" class="input" maxlength="100">
                    <BaseShowErrorInput name="gallery_name" :show="galleryNameS" :msg="galleryNameM" />
                </div>
                <!-- description-->
                <div class="input_field">
                    <h6 class="inportant_input">
                        Description
                    </h6>
                    <textarea v-model="galleryDesc" placeholder="Something about product." maxlength="5000"></textarea>
                    <BaseShowErrorInput name="gallery_desc" :show="galleryDescS" :msg="galleryDescM" />
                </div>
                <!-- cover photo -->
                <div class="img_cover input_field">
                    <h6 class="inportant_input">
                        Cover Photo
                    </h6>
                    <!-- <div class="input_img">
                        

                    </div> -->
                    <div v-show="galleryCoverImg == undefined && galleryCoverImgS == false" class="input_img no_img" @drop="dropCoverHandle" @dragover="dragover" >
                        <input @change="uploadCoverImage"  id="cover_image" type="file" accept="image/*">
                        <label  for="cover_image" >
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
                    <div v-show="galleryCoverImg != undefined || galleryCoverImgS == true" @drop="dropCoverHandle" @dragover="dragover" class="has_img">
                        <label for="cover_image" class="cover_img_result">
                            <!-- รูปที่จะเพิ่ม -->
                            <img v-show="galleryCoverImg != undefined" src="#" draggable="false" alt="preview_image"
                                id="cover-preview">
                            <!-- รูปที่มีแล้ว -->
                            <img v-show="galleryCoverImg == undefined && galleryCoverImgS == true"
                                :src="`${origin}/api/image/gallery/${galleryContentId}`" draggable="false"
                                alt="preview_image" id="cover-preview">
                        </label>
                    </div>
                </div>
                <!-- garden style and other style -->
                <div class="container_input">
                    <!-- Garden style -->
                    <div class="input_field">
                        <h6 class="inportant_input">
                            Garden style
                        </h6>
                        <select v-model="galleryStyle" name="" id="" class="input">
                            <option value="" selected disabled>Select your garden style</option>
                            <option value="modern" >Modern</option>
                            <option value="tropical" >Tropical</option>
                            <option value="japanese" >Japanese</option>
                            <option value="english" >English</option>
                            <option value="europe" >Europe</option>
                            <option value="desert" >Desert</option>
                            <option value="other" >Other</option>
                        </select>
                        <BaseShowErrorInput name="gallery_style" :show="galleryStyleS" :msg="galleryStyleM" />
                    </div>
                    <!-- Specify other -->
                    <!-- <div class="input_field">
                        <h6>
                            Specify Other garden style
                        </h6>
                        <input type="text" class="input">
                    </div> -->
                </div>
                <!--photo -->
                
            </div>
        </div>
        <!-- submit --> 
        <BaseSubmit name="my_gallery_create" @goBack="goMyGallery" @submit="submitGallery()" :disabled="isEdit&&!galleryFormData.isChange" />
        <!-- <div v-show="true" class="submit">
            <button v-show="!refreshPageS" @click="profileClear(), profileClearStatus()">
                Cancel
            </button>
            <button v-show="!refreshPageS" @click="profileSubmit">
                Save
            </button>
        </div> -->
        <BaseAlert name="order_list_alert" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange" />

    </div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_my_gallery_add{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    background-color: #fff;
    border: none;
    border-radius: min(0.556dvw,8px);
    box-shadow: 0px min(0.069dvw,1px) min(0.208dvw,3px) 0px #0000001A;
    overflow: hidden;
    animation: show_element ease-in 1.5s;
}
.my_gallery_add{
    display: flex;
    width: 100%;
    height: fit-content;
    padding: min(1.389dvw,20px);
    gap: min(1.667dvw,24px);
    flex-direction: column;
}
/* header */
.my_gallery_add .header_my_gallery_add{
    width: 100%;
    height: fit-content;
    font-size: min(1.25dvw,18px);
    font-weight: 500;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
}
.my_gallery_add .wrapper_input{
    display: flex;
    width:100%;
    height: fit-content;
    flex-direction: column;
    gap: min(1.667dvw,24px);
}
.wrapper_input .input_field{
    display: flex;
    width: 100%;
    height: fit-content;
    gap: min(0.278dvw,4px);
    flex-direction: column;
    justify-content: center;
}
/* input field */
.input_field >h6{
    width: fit-content;
    height: min(1.389dvw,20px);
    color: #212121;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    font-weight: 500;
}
.input_field .input{
    display: flex;
    width: 100%;
    height: min(2.5dvw,36px);
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    font-weight: 400;
    color: #212121;
    border: min(0.069dvw,1px) solid #D1D5DB;
    border-radius: min(0.278dvw,4px);;
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000D;
}
.input_field >textarea{
    display: flex;
    width: 100%;
    height: min(6.944dvw,100px);
    min-height: min(2.5dvw,36px);
    max-height: 200px;
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    font-weight: 400;
    color: #212121;
    border: min(0.069dvw,1px) solid #D1D5DB;
    border-radius: min(0.278dvw,4px);
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000D;
    resize: vertical
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
    gap: min(0.278dvw,4px);
    cursor: pointer;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.input_img >label> div{
    display: flex;
    width: min(3.333dvw,48px);
    height: min(3.333dvw,48px);
    justify-content: center;
    align-items: center;
}
.input_img >label> div svg{
    width: min(2.5dvw,36px);
    height: min(2.5dvw,36px);
}
.input_img> label h6{
    width: fit-content;
    height: min(1.389dvw,20px);
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    font-weight: 500;
    color: #757575;
}
.input_img >label h6 span{
    cursor: pointer;
    color: #26AC34;
}
.input_img >label p{
    width: fit-content;
    height: min(1.111dvw,16px);
    font-weight: 400;
    font-size:  min(0.833dvw,12px);
    color: #6B7280;
}
.input_img >label img{
    width: 100%;
    height: auto;
    background-position: center;
}
.input_field .input_img{
    display: flex;
    width: 100%;
    height: min(9.722dvw,140px);
    border: min(0.139dvw,2px) dashed; 
    border-radius: min(0.278dvw,4px);
    border-color: #E0E0E0;
    justify-content: center;
    align-items: center;
}
/* list of style img */
.style_preview_img{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-wrap: wrap;
    gap: min(0.556dvw,8px);
}

.style_preview_img > button{
    display: flex;
    width: min(9.722dvw,140px);
    height: min(9.722dvw,140px);
    position: relative;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border: none;
    border-radius: min(0.278dvw,4px);
    background-color: #212121;
    
}
.style_preview_img > button:hover .remove{
    display: flex;
}
.style_preview_img .remove{
    display: none;
    width: min(1.389dvw,20px);
    height: min(1.389dvw,20px);
    justify-content: center;
    align-items: center;
    position: absolute;
    right: min(0.347dvw,5px);
    top: min(0.347dvw,5px);
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition:all 1s ease;
}
.style_preview_img > button:hover img{
    filter: blur(min(0.278dvw,4px));
    
}
.style_preview_img > button img{
    width: 100%;
    height: auto;
    transition:all 0.5s ease;
}
.style_preview_img >label{
    display: flex;
    width: min(9.722dvw,140px);
    height: min(9.722dvw,140px);
    justify-content: center;
    align-items: center;
    border: min(0.139dvw,2px) dashed ;
    border-color: #E0E0E0;
    cursor: pointer;
}
.style_preview_img >label >div{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.style_preview_img >label >div div{
    display: flex;
    width: min(3.056dvw,44px);
    height: min(3.056dvw,44px);
    justify-content: center;
    align-items: center;
    gap: min(0.278dvw,4px);
}
.style_preview_img >label >div div svg{
    width: min(2.222dvw,32px);
    height: auto;
}
.style_preview_img >label>div h6{
    display: flex;
    width: fit-content;
    height: min(1.389dvw,20px);
    align-items: center;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    font-weight: 500;
    color: #26AC34;
}
.wrapper_input .container_input{
    display: flex;
    width: 100%;
    height: fit-content;
    gap: min(1.667dvw,24px);
}

/* .profile_item {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 4px;
}

.profile_item h5 {
    width: 100%;
    height: 20px;
    font-weight: 500;
    font-size: 14px;
    color: #212121;
} */
.img_cover .img_cover {
    display: flex;
    width: 100%;
    height: min(9.722dvw,140px);
    border: min(0.139dvw,2px) dashed;
    border-radius: min(0.278dvw,4px);
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
    gap: min(0.278dvw,4px);
    cursor: pointer;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.img_cover>div label div {
    display: flex;
    width: min(3.333dvw,48px);
    height: min(3.333dvw,48px);
    justify-content: center;
    align-items: center;
}

.img_cover>div label div svg {
    width: min(2.5dvw,36px);
    height: min(2.5dvw,36px);
}

.img_cover>div label h6 {
    width: fit-content;
    height: min(1.389dvw,20px);
    font-size: min(0.972dvw,14px);
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
    height: min(1.111dvw,16px);
    font-weight: 400;
    font-size:  min(0.833dvw,12px);
    color: #6B7280;
}

/* .cover_preview{
    width: 100%;
    height: 100%;
    overflow: hidden;
} */
.img_cover .has_img{
    display: flex;
    width: fit-content;
    max-width: 100%;
    height: min(9.722dvw,140px);
    overflow: hidden;
    justify-content: center;
    align-items: center;
}
.img_cover .cover_img_result{
    
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.img_cover >div .cover_img_result img {
    width: auto;
    height: 100%;
    object-fit: cover;
}

/* 
.submit {
    display: flex;
    width: 100%;
    height: min(4.167dvw,60px);
    padding:  min(0.833dvw,12px) min(1.389dvw,20px);
    gap: min(0.556dvw,8px);
    justify-content: end;
    background-color: #FAFAFA;
}

.submit p {
    display: flex;
    width: fit-content;
    height: 100%;
    font-weight: 500;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    align-items: center;
    color: #F75555;
}

.submit button {
    width: min(5.556dvw,80px);
    height: min(2.5dvw,36px);
    border: min(0.069dvw,1px) solid;
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    border-radius: min(0.278dvw,4px);
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000D;
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