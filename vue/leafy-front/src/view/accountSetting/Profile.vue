<script setup>
import {onBeforeMount, onUpdated, ref,computed} from 'vue'
import fetch from '../../JS/api'

const userId=3

let origin = `${import.meta.env.VITE_BASE_URL}`;

// original data
const userDetail=ref({})

// profile info
const userName=ref('')
const aboutMe=ref('')
const userImage=ref(undefined)
const coverImage=ref(undefined)
// profile info status
const userNameS=ref(undefined)
const aboutMeS=ref(undefined)
const userImageS=ref(undefined)
const coverImageS=ref(undefined)
// profile info message
const userNameM=ref('')
const aboutMeM=ref('')
const userImageM=ref('')
const coverImageM=ref('')

//personal info
const firstName=ref('')
const lastName=ref('')
const emailUser=ref('')
const phoneNumber=ref('')
// personal info status
const firstNameS=ref(undefined)
const lastNameS=ref(undefined)
const emailS=ref(undefined)
const phoneNumberS=ref(undefined)
// personal info message
const firstNameM=ref('')
const lastNameM=ref('')
const emailM=ref('')
const phoneNumberM=ref('')

// ตรวจสอบว่า ข้อมูลได้เปลี่ยนไปจากข้อมูลต้นฉบับ ?
const isChangeProfileInfo=computed(()=>{
    let status=false
    let {username,description}=userDetail.value
    if(userDetail.value!={}){
        if(username!=userName.value)status=true;
        else
        if(description!=aboutMe.value)status=true;
        else
        if(userImage.value!=undefined)status=true;
        else
        if(coverImage.value!=undefined)status=true;
    }
    return status
})
// ตรวจสอบว่า ข้อมูลได้เปลี่ยนไปจากข้อมูลต้นฉบับ ?
const isChangePersonalInfo=computed(()=>{
    let status=false
    console.log(userDetail.value)
    let {firstname,lastname,email,phone}=userDetail.value
    if(userDetail.value!={}){
        if(firstname!=firstName.value)status=true;
        else 
        if(lastname!=lastName.value)status=true;
        else
        if(email!=emailUser.value) status=true ;
        else
        if(phone!=phoneNumber.value)status=true ;
    }
    return status
})
// check user image and cover image
const checkUserImage=async()=>{
    let res=await fetch.getImage('users',userId)
    return res.status
}
const checkCoverImage=async()=>{
    let res=await fetch.getImage('users',userId,'coverphoto')
    return res.status
}


// get user information
const getUserInfo=async()=>{
    let {status,data,msg}=await fetch.getUserById(userId)
    if(status){
        userDetail.value= data //original data

        firstName.value= data.firstname
        lastName.value= data.lastname
        emailUser.value= data.email
        phoneNumber.value= data.phone

        aboutMe.value = data.description
        userName.value= data.username

    }else{
        //error console
    }
    console.log(data)
    userImageS.value=await checkUserImage()
    coverImageS.value=await checkCoverImage()
}

// submit
const profileSubmit=async()=>{
    let submitValidation={data:false,userImg:false,coverImg:false}
    let msg={data:'',userImg:'',coverImg:''}
    console.log("submit")
    // check description and username
    if(isChangeProfileInfo.value){
        let data={
            username:userName.value,
            description:aboutMe.value
        }
        let userRes= await fetch.updataUserInfo(data)
        if(userRes.status){
            // console.log('updated')
            submitValidation.data=true
            // await getUserInfo()
        }else{
            // console.log('still not updat')
            submitValidation.data=false
            msg.data='Can not update data from server'
        }
    }
    // check user image
    if(userImage.value!=undefined){
        let userImgRes=await fetch.updateImage(userImage.value,'users',userId)
        // let userImgRes=await fetch.deleteImage('users',userId)
        if(userImgRes.status){
            console.log('update successful')
            submitValidation.userImg=true
        }else{
            console.log('update add image')
            submitValidation.userImg=false
            msg.userImg='Can not update user Image from server'
        }
    }
    // check cover image
    if(coverImage.value!=undefined){
        let userImgRes=await fetch.updateImage(userImage.value,'users',userId)
        // let userImgRes=await fetch.deleteImage('users',userId)
        if(userImgRes.status){
            // console.log('update successful')
            submitValidation.coverImg=true
        }else{
            // console.log('update add image')
            submitValidation.coverImg=false
            msg.coverImg='Can not update cover Image from server'

        }
    }
    console.log("submit")
    // get new data
    if(submitValidation.data==true
    ||submitValidation.userImg==true
    ||submitValidation.coverImg==true){
        await profileClear()
        await getUserInfo()
    }

}


// clear
const profileClear=async()=>{
    let {username,description}=userDetail.value
    userName.value=username
    aboutMe.value=description
    userImage.value=undefined
    coverImage.value=undefined
    // status
    userImageS.value=await checkUserImage()
    coverImageS.value=await checkCoverImage()
}
const personalInfoClear=()=>{
    let {firstname,lastname,email,phone}=userDetail.value
    firstName.value=firstname
    lastName.value=lastname
    emailUser.value=email
    phoneNumber.value=phone
}


//preview img
const previewCoverImage=(event,elementId)=>{
    console.log(event,' this preview')
    // const file = event.target.files;
    // const fileReader = new FileReader(); //for reading file
    const preview=document.getElementById(elementId)
    // // จะทำงานเมื่อมีการเปลี่ยนเปลงของ Document เหมือน event hook ของ JS  
    // fileReader.onload = event => {
        preview.setAttribute('src', URL.createObjectURL(event)); //event.target.result
    //     }
    //     fileReader.readAsDataURL(file[0]);
    // console.log(event)
}

// image
const uploadImage=(event)=>{
    if(event==undefined){
        console.log("pls up load photo")
    }else{
        let file= event.target.files[0] //แยกไฟล์ออกมา
        console.log(file)
        const fSize=Math.round((file.size/100000))
        const maxFileSize=10
        // เอามาตรวจสอบว่ามีขนาดเกิน 5 MB ?
        console.log('file size :',fSize)
        if(maxFileSize>=fSize){
            console.log('nice file')
            userImage.value=file;
            previewCoverImage(file,"user_preview")
        }else{
            console.log('file too big')
        }    

    }
}

// cover image
const uploadCoverImage=(event)=>{
    if(event==undefined){
        console.log("pls up load photo")
    }else{
        let file
        // แยกประเภทว่าเป็นแบบ Drop ?
        if(event.target!=undefined){
            file= event.target.files[0] //แยกไฟล์ออกมา
        console.log('not drop')
        }else {
            // console.log(event)
            file=event
            console.log('drop')
        }
        const fSize=Math.round((file.size/100000))
        const maxFileSize=10
        // เอามาตรวจสอบว่ามีขนาดเกิน 10 MB ?
        console.log('file size :',fSize)
        if(maxFileSize>=fSize){
            console.log('nice file')
            if(event.target!=undefined)coverImage.value=file;
            else coverImage.value=file;
            previewCoverImage(file,"cover-preview")
        }else{
            console.log('file too big')
        }    

    }
}
//drop event
const dropHandle=(event)=>{ 
    event.preventDefault() //when drop not make new page for show image just drop
    // Use DataTransferItemList interface to access the file(s)
    
    if (event.dataTransfer.items) {
        let fileType=event.dataTransfer.items[0].type.split("/")
        // console.log(event.dataTransfer.items[0].type)
        let itemAmount=event.dataTransfer.items.length //check length of file
        if(itemAmount==1 &&fileType.includes("image")){ //1 file only and type only image

           console.log(event.dataTransfer.items[0].getAsFile()) 
           uploadCoverImage(event.dataTransfer.items[0].getAsFile())
        }else{
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
const dragover=(event)=>{
    event.preventDefault()
}


onBeforeMount(()=>{
    getUserInfo()
})
// onUpdated(()=>console.log(aboutMe.value))
</script>
<template>
    <div class="wrapper_profile">
        <!-- profile -->
        <div>
            <!-- title -->
            <div class="title">
                <h4>
                    Profile
                </h4>
                <p>
                    This information will be displayed publicly so be careful what you share. 
                </p>                
            </div>

            <!-- username -->
            <div class="username profile_item">
                <h5>
                    Username
                </h5>
                <input v-model="userName" type="text">
            </div>

            <!-- about -->
            <div class="about_me profile_item">
                <h5 >
                    About
                </h5>
                <textarea v-model="aboutMe" placeholder="Something about myself." ></textarea>
                <p>
                    Brief description for your profile. URLs are hyperlinked. 
                </p>
            </div>

            <!-- photo -->
            <div class="image  profile_item">
                <h5>
                    Photo
                </h5>
                <div>
                    <div>
                        <!-- รูปพื้นฐาน ไม่เคยมีรูป -->
                        <img v-show="userImage==undefined&&userImageS!=true" src="../../assets/vue.svg"  draggable="false" alt="user_preview">
                        <!-- รูปเพิ่งเพิ่ม -->
                        <img v-show="userImage!=undefined" src="#" id="user_preview" draggable="false" alt="user_preview">
                        <!-- มีแล้ว -->
                        <img v-show="userImage==undefined&&userImageS==true" :src="`${origin}/api/image/users/${userId}`" id="user_preview" alt="user_image">
                    </div>
                    <input @change="uploadImage" id="user_image" type="file" accept="image/*">
                    <label for="user_image">
                        Add                  
                    </label>    
                </div>
                
            </div>

            <!-- cover photo -->
            <div class="img_cover profile_item">
                <h5>
                    Cover photo
                </h5>
                <div v-show="coverImage==undefined&&coverImageS==false"  @drop="dropHandle" @dragover="dragover">
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
                <div v-show="coverImage!=undefined||coverImageS==true"  @drop="dropHandle" @dragover="dragover">
                    <label  for="cover_image">
                        <!-- รูปที่จะเพิ่ม -->
                        <img v-show="coverImage!=undefined" src="#" draggable="false" alt="preview_image" id="cover-preview">
                        <!-- รูปที่มีแล้ว -->
                        <img v-show="coverImage==undefined&&coverImageS==true" :src="`${origin}/api/image/users/${userId}/coverphoto`" draggable="false" alt="preview_image" id="cover-preview">
                    </label> 
                </div>
                
            </div>

            <!-- submit -->
            <div v-show="isChangeProfileInfo" class="submit">
                <button @click="profileClear">
                    Cancel
                </button>
                <button @click="profileSubmit">
                    Save
                </button>
            </div>
        </div>
        <!-- personal info -->
        <div>
            <!-- title -->
            <div class="title">
                <h4>
                    Personal Information
                </h4>
                <p>
                    Use a permanent address where you can receive mail.                </p>                
            </div>
            <!-- first name & last name -->
            <div class="container_info">
                <!-- first name -->
                <div class="info_item">
                    <h5 class="importen_input">
                        First name 
                    </h5>
                    <input v-model="firstName" type="text">
                </div>
                <!-- last name -->
                <div class="info_item">
                    <h5 class="importen_input">
                        Last name 
                    </h5>
                    <input v-model="lastName" type="text">
                </div>
            </div>

            <!-- email & phone number -->
            <div class="container_info">
                <!-- email -->
                <div class="info_item">
                    <h5 class="importen_input">
                        Email address
                    </h5>
                    <input v-model="emailUser" type="text" placeholder="apple@gmail.com">
                </div>
                <!-- phone number -->
                <div class="info_item">
                    <h5 class="importen_input">
                        Phone number
                    </h5>
                    <input v-model="phoneNumber" type="text" maxlength="11">
                </div>
            </div>

            <!-- submit -->
            <div v-show="isChangePersonalInfo" class="submit">
                <button @click="personalInfoClear">
                    Cancel
                </button>
                <button>
                    Save
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_profile{
    display: flex;
    width: inherit;
    height: inherit;
    flex-direction: column;
    gap: 24px;
}
.wrapper_profile > div{
    display: flex;
    width: inherit;
    height: inherit;
    flex-direction: column;
    border-radius: 8px;
    padding: 12px 24px;
    background-color: #fff;
    gap: 24px;
}

.title{
    display: flex;
    width: 100%;
    height: 52px;
    flex-direction: column;
    gap: 4px;
}
.title h4{
    height: 28px;
    font-size: 18px;
    font-weight: 500;
    color: #212121;
}
.title p{
    height: 20px;
    font-weight: 400;
    font-size: 14px;
    color: #757575;
}
.profile_item{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 4px;
}
.profile_item h5{
    width: 100%;
    height: 20px;
    font-weight: 500;
    font-size: 14px;
    color:#212121;
}
.username input{
    width: 100%;
    height: 36px;
    padding: 8px 12px;
    border: 1px solid;
    border-color: #E0E0E0;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 400;
    color: #212121;
}
.about_me textarea{
    width: 100%;
    height: 100px;
    min-height: 36px;
    max-height: 200px;
    resize: vertical;
    padding: 8px 12px;
    border: 1px solid;
    border-color: #D1D5DB;
    border-radius: 4px;
    font-weight: 400;
    font-size: 14px;
    color: #212121;
}
.about_me p{
    width: 100%;
    height: 20px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 400;
    color: #9E9E9E;
}
.image > div{
    display: flex;
    height: 48px;
    align-items: center;
    gap: 20px;
}
.image > div div{
    display: flex;
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 50%;
    overflow: hidden;
    background-position: center;
    background-color: #212121;
    justify-content: center;
    align-items: center;
}
.image > div div img{
    width: 150%;
    height: auto;
    /* z-index: -1; */
}
.image > div input{
    display: none;
}
.image > div label{
    display: flex;
    width: 51px;
    height: 36px;
    padding: 8px 12px;
    border: 1px solid;
    border-radius: 4px;
    border-color: #E0E0E0;
    cursor: pointer;
}
.img_cover > div{
    display: flex;
    width: 100%;
    height: 140px;
    border: 2px dashed; 
    border-radius: 4px;
    border-color: #E0E0E0;
    justify-content: center;
    align-items: center;
}
.img_cover > div input{
    display: none;
}
.img_cover > div label{
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
.img_cover > div label div{
    display: flex;
    width: 48px;
    height: 48px;
    justify-content: center;
    align-items: center;
}
.img_cover > div label div svg{
    width: 36px;
    height: 36px;
}
.img_cover > div label h6{
    width: fit-content;
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #757575;
}
.img_cover > div label h6 span{
    cursor: pointer;
    color: #26AC34;
}

.img_cover > div label p{
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
.img_cover > div label img{
    width: 100%;
    height: auto;
    background-position: center;
    
}
.submit{
    display: flex;
    width: 100%;
    height: 60px;
    padding: 12px 24px;
    gap: 8px;
    justify-content: end;
}
.submit button{
    width: 80px;
    height: 36px;
    border: 1px solid;
    padding: 8px 12px;
    border-radius: 4px;
    border-color: #E0E0E0;
    box-shadow: 0px 1px 2px 0px #0000000D;
    cursor: pointer;
}
.submit button:nth-child(1){
    background-color: #fff;
    color: #212121;
}
.submit button:nth-child(2){
    background-color: #26AC34;
    color: #fff;
}
.container_info{
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: start;
    align-items: center;
    gap: 24px;
}
.info_item{
    display: flex;
    width: 372px;
    height: inherit;
    flex-direction: column;
    gap: 4px;
}
.info_item h5{
    width: fit-content;
    height: 20px;
}
.importen_input::after{
    content: "*";
    color: #F75555;
    font-size: 14px;
    font-weight: 500;
}
.info_item input{
    width: 100%;
    height: 36px;
    border: 1px solid;
    border-radius: 4px;
    border-color: #D1D5DB;
    padding: 8px 12px;
    box-shadow: 0px 1px 2px 0px #0000000D;
    font-size: 14px;
    font-weight: 400;
    color: #212121;
}
</style>