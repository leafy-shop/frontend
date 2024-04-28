<script setup>
import { onBeforeMount, onUpdated, ref, computed } from 'vue'
import fetch from '../../JS/api'
import validation from '../../JS/validation'
import { useRoute } from 'vue-router';
import cookie from '../../JS/cookie';
import BaseShowErrorInput from '../../components/accountSetting/BaseShowErrorInput.vue';
import BaseSubmit from '../../components/accountSetting/BaseSubmit.vue';
import BaseAlert from '../../components/BaseAlert.vue';
const { params } = useRoute()
const userId = ref("")
let origin = `${import.meta.env.VITE_BASE_URL}`;

// original data
const userDetail = ref({})

// profile info
const userName = ref('')
const aboutMe = ref('')
const userImage = ref(undefined)
const coverImage = ref(undefined)
// profile info status
const userNameS = ref(false)
const aboutMeS = ref(false)
const userImageS = ref(false)
const coverImageS = ref(false)
const refreshPageS = ref(false)
const refreshPageUserImgS=ref(false)
const refreshPageCoverImgS=ref(false)
// profile info message
// const userNameM = ref('')
const aboutMeM = ref('')
const userImageM = ref('')
const coverImageM = ref('')
const refreshPageM = ref('')

//personal info
const firstName = ref('')
const lastName = ref('')
const emailUser = ref('')
const phoneNumber = ref('')
// personal info status
const firstNameS = ref(false)
const lastNameS = ref(false)
const emailS = ref(false)
const phoneNumberS = ref(false)
// personal info message
const firstNameM = ref('')
const lastNameM = ref('')
const emailM = ref('')
const phoneNumberM = ref('')

// alert attribute
const isShowAlert=ref(false)
const alertType=ref(0)
const alertDetail=ref('')
const alertTime=ref(2)

// ตรวจสอบว่า ข้อมูลได้เปลี่ยนไปจากข้อมูลต้นฉบับ ?
const isChangeProfileInfo = computed(() => {
    let status = false
    if (Object.keys(userDetail.value).length != 0) {
        
        let { username, description } = userDetail.value
        if (username != userName.value) status = true;
        else
        if(description != aboutMe.value) status = true;
        else
        if (userImage.value != undefined) status = true;
        else
        if (coverImage.value != undefined) status = true;
    }
    return status
})
// ตรวจสอบว่า ข้อมูลได้เปลี่ยนไปจากข้อมูลต้นฉบับ ?
const isChangePersonalInfo = computed(() => {
    let status = false
    // console.log(userDetail.value)
    // console.log(emailUser.value)
    if (userDetail.value != {}) {
        let { firstname, lastname, email, phone } = userDetail.value
        if (firstname != firstName.value) status = true;
        else
        if (lastname != lastName.value) status = true;
        else
        if (email != emailUser.value) status = true;
        else
        if (phone != phoneNumber.value) status = true;
    }
    return status
})
// check user image and cover image
const checkUserImage = async () => {
    let res = await fetch.getImage('users', userId.value)
    return res.status
}
const checkCoverImage = async () => {
    let res = await fetch.getImage('users', userId.value, 'coverphoto')
    return res.status
}


// get user information
const getUserInfo = async () => {
    let { status, data, msg } = await fetch.getUserById(userId.value)
    if (status) {
        userDetail.value = data //original data

        firstName.value = data.firstname
        lastName.value = data.lastname
        emailUser.value = data.email
        phoneNumber.value = data.phone

        aboutMe.value = data.description==undefined?'':data.description
        userName.value = data.username

    } else {
        //error console
        isShowAlert.value=true
        alertType.value=1
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        alertTime.value=10
    }
    console.log(data)
    userImageS.value = await checkUserImage()
    coverImageS.value = await checkCoverImage()
}

// Profile submit
const profileSubmit = async () => {
    let submitValidation = true
    // console.log(isChangeProfileInfo.value)
    if (isChangeProfileInfo.value) {
        // username not undefine
        // if (userName.value == undefined || userName.value == '' || userName.length == 0) {
        //     submitValidation = false
        //     userNameS.value = true
        //     userNameM.value = 'Please input your username.'
        //     console.log("submit")
        // }

        console.log("submit")
        // get new data
        if (submitValidation) {
            profileClearStatus()
            let { description } = userDetail.value
            console.log("submit")
            // check user name
            // user info
            let data = {}
            console.log(aboutMe.value,'about me!!!')
            if (aboutMe.value.length != 0 && aboutMe.value != description) {
                data["description"] = aboutMe.value //if description === null
                // if (validation.textRange(aboutMeM.value,0,500)) {
                //     aboutMeS.value = false
                //     aboutMe.value = userRes.msg
                // }
                let{status,msg}=await fetch.updataUserInfo(data)
                if(await status){
                    await getUserInfo()
                    await fetch.getRefresh()
                    // refreshPageS.value = true
                }else{
                    //error
                    isShowAlert.value=true
                    alertType.value=1
                    alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
                    alertTime.value=10
                }
                // aboutMeS.value = true
                // if (userRes.status) {
                //     // console.log('updated')
                    
                //     // await getUserInfo()
                // } else {
                //     // console.log('still not updat')
                //     aboutMeS.value = false
                //     aboutMe.value = userRes.msg
                // }
            }
            // console.log(data)

            // check user image
            if (userImage.value != undefined) {
                let userImgRes = await fetch.updateImage(userImage.value, 'users', userId.value)
                // let userImgRes=await fetch.deleteImage('users',userId)
                if (await userImgRes.status) {
                    console.log('update successful')
                    userImage.value=undefined
                    userImageS.value = true
                    refreshPageUserImgS.value = true
                } else {
                    console.log('update add image')
                    userImageS.value = false
                    userImageM.value = 'Can not update user Image from server'
                    //error console
                    isShowAlert.value=true
                    alertType.value=1
                    alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
                    alertTime.value=10
                }
            }

            // check cover image
            if (coverImage.value != undefined) {
                let userImgRes = await fetch.updateImage(coverImage.value, 'users', userId.value, 'coverphoto')
                // let userImgRes=await fetch.deleteImage('users',userId)
                if (await userImgRes.status) {
                    // console.log('update successful')
                    coverImage.value=undefined
                    coverImageS.value = true
                    refreshPageCoverImgS.value = true
                } else {
                    // console.log('update add image')
                    coverImageS.value = false
                    coverImageM.value = 'Can not update cover Image from server'
                    //error console
                    isShowAlert.value=true
                    alertType.value=1
                    alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
                    alertTime.value=10
                }
            }
            
            // location.reload()
            // await profileClear()
            // await getUserInfo()

        }
    }
}

// Personal Info
const personalInfoSubmit = async () => {
    personalInfoClearStatus()
    let submitValidation = true
    // console.log(isChangePersonalInfo.value)
    // let msg={data:'',userImg:'',coverImg:''}
    if (isChangePersonalInfo.value) {
        if (firstName.value.length==0||!validation.text(firstName.value)) { //check first name
            submitValidation = false
            firstNameM.value = 'First name invalid.'
            firstNameS.value = true
            console.log('firstname:', submitValidation)
        }
        if (lastName.value.length==0||!validation.text(lastName.value)) { //check last name
            submitValidation = false
            lastNameM.value = 'Last name invalid.'
            lastNameS.value = true
            console.log('lastname:', submitValidation)
        }
        if (emailUser.value.length==0||!validation.email(emailUser.value)) { // check email
            submitValidation = false
            emailM.value = 'Email invalid.'
            emailS.value = true
            console.log('Email:', submitValidation)
        }
        if (!validation.textRange(phoneNumber.value, 11, 10)) { // check phone number
            submitValidation = false
            phoneNumberM.value = 'Phone number invalid.'
            phoneNumberS.value = true
            console.log('phone number:', submitValidation)
        }

        console.log('submit validation status:', submitValidation)
        if (submitValidation) {
            let inputData = {}
            let { firstname, lastname, email, phone } = userDetail.value
            if (firstName.value.length != 0 && firstName.value != firstname) inputData["firstname"] = firstName.value;
            if (lastName.value.length != 0 && lastName.value != lastname) inputData["lastname"] = lastName.value;
            if (phoneNumber.value.length != 0 && phoneNumber.value != phone) inputData["phone"] = phoneNumber.value;
            if (emailUser.value.length != 0 && emailUser.value != email) inputData["email"] = emailUser.value;

            console.log(inputData)
            let { status, msg } = await fetch.updataUserInfo(inputData)
            if (await status) {
                await fetch.getRefresh()
                personalInfoClear()
                await getUserInfo()
            }else
            if(await msg.includes("duplicated")){
                // error
                isShowAlert.value=true
                alertType.value=2
                alertDetail.value= msg
                alertTime.value=10
            } else {
                // error
                isShowAlert.value=true
                alertType.value=1
                alertDetail.value="sadfasdOops! It seems like there's a server error at the moment. Please try again later."
                alertTime.value=10
            }
            console.log(msg)
        }

    }
}

// clear
const profileClear = async (cUImg = true, cCImg = true) => {
    let { username, description } = userDetail.value
    userName.value = username
    aboutMe.value = description
    if (cUImg) userImage.value = undefined;
    if (cCImg) coverImage.value = undefined;
    // status
    userImageS.value = await checkUserImage()
    coverImageS.value = await checkCoverImage()
}
const profileClearStatus = () => {
    // profile info status
    userNameS.value = false
    aboutMeS.value = false
    userImageS.value = false
    coverImageS.value = false
    // profile info message
    // userNameM.value = ''
    aboutMeM.value = ''
    userImageM.value = ''
    coverImageM.value = ''
}
const personalInfoClear = () => {
    let { firstname, lastname, email, phone } = userDetail.value
    firstName.value = firstname
    lastName.value = lastname
    emailUser.value = email
    phoneNumber.value = phone

}
const personalInfoClearStatus = () => {
    //status
    firstNameM.value = ''
    lastNameM.value = ''
    emailM.value = ''
    phoneNumberM.value = ''
    // personal info status
    firstNameS.value = false
    lastNameS.value = false
    emailS.value = false
    phoneNumberS.value = false
}


//preview img
const previewCoverImage = (event, elementId) => {
    console.log(event, ' this preview')
    // const file = event.target.files;
    // const fileReader = new FileReader(); //for reading file
    const preview = document.getElementById(elementId)
    // // จะทำงานเมื่อมีการเปลี่ยนเปลงของ Document เหมือน event hook ของ JS  
    // fileReader.onload = event => {
    preview.setAttribute('src', URL.createObjectURL(event)); //event.target.result
    //     }
    //     fileReader.readAsDataURL(file[0]);
    // console.log(event)
}

// image
const uploadImage = (event) => {
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
            userImage.value = file;
            previewCoverImage(file, "user_preview")
        } else {
            isShowAlert.value=true
            alertType.value=2
            alertDetail.value="The image is too big, over 1 MB in size!"
            alertTime.value=3
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
            isShowAlert.value=true
            alertType.value=2
            alertDetail.value="The image is too big, over 1 MB in size!"
            alertTime.value=3
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

// reset show alert status
const getShowAlertChange=(input)=>{
    isShowAlert.value=input
    alertType.value=0
    alertDetail.value=''
    alertTime.value=2
}

onBeforeMount(async () => {
    validation.navigationTo()
    if(cookie.checkKeyPass()){
        userId.value = cookie.decrypt().id
        // console.log('cookie descrypt ',cookie.decrypt())
        // userId.value=validation.decrypt(params.id)
        await getUserInfo()
        // console.log(validation.decrypt(params.id))    
    }
    
})
// onUpdated(()=>console.log(aboutMe.value))
</script>
<template>
    <!-- <div class="wrapper_all"> -->
    <div class="wrapper_profile">
        <!-- profile -->
        <div class="wrapper_all">
            <div class="wrapper_info">
                <!-- title -->
                <div class="title">
                    <h4>
                        Profile
                    </h4>
                    <p>
                        This information will be displayed publicly so be careful what you share.
                    </p>
                </div>
                <div class="input_item">
                    <!-- username -->
                    <div class="username profile_item">
                        <h5>
                            Username
                        </h5>
                        <input v-model="userName" type="text" maxlength="50" disabled>
                        <!-- worning -->
                        <!-- <div v-show="userNameS" class="wrapper_errorMsg">
                            <div>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z"
                                        fill="#F75555" />
                                </svg>
                                <p>
                                    {{ userNameM }}
                                </p>
                            </div>
                        </div> -->
                    </div>

                    <!-- about -->
                    <div class="about_me profile_item">
                        <h5>
                            About
                        </h5>
                        <textarea v-model="aboutMe" placeholder="Something about myself." maxlength="500"></textarea>
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
                                <img v-show="userImage == undefined && userImageS != true" src="../../assets/icon/user_icon.png"
                                    draggable="false" alt="user_preview">
                                <!-- รูปเพิ่งเพิ่ม -->
                                <img v-show="userImage != undefined" src="#" id="user_preview" draggable="false"
                                    alt="user_preview">
                                <!-- มีแล้ว -->
                                <img v-show="userImage == undefined && userImageS == true"
                                    :src="`${origin}/api/image/users/${userId}`" id="user_preview" alt="user_image">
                            </div>
                            <input @change="uploadImage" id="user_image" type="file" accept="image/*">
                            <label for="user_image">
                                Add
                            </label>
                        </div>
                        <p v-show="refreshPageUserImgS" class="refresh_page_require">
                            Please refresh the page to load the latest image 
                        </p>
                    </div>

                    <!-- cover photo -->
                    <div class="img_cover profile_item">
                        <h5>
                            Cover photo
                            
                        </h5>
                        <div v-show="coverImage == undefined && coverImageS == false" @drop="dropHandle" @dragover="dragover" class="no_img">
                            <input @change="uploadCoverImage" id="cover_image" type="file" accept="image/*">
                            <label for="cover_image">
                                <div>
                                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M21 5H5C3.93913 5 2.92172 5.42143 2.17157 6.17157C1.42143 6.92172 1 7.93913 1 9V29M1 29V33C1 34.0609 1.42143 35.0783 2.17157 35.8284C2.92172 36.5786 3.93913 37 5 37H29C30.0609 37 31.0783 36.5786 31.8284 35.8284C32.5786 35.0783 33 34.0609 33 33V25M1 29L10.172 19.828C10.9221 19.0781 11.9393 18.6569 13 18.6569C14.0607 18.6569 15.0779 19.0781 15.828 19.828L21 25M33 17V25M33 25L29.828 21.828C29.0779 21.0781 28.0607 20.6569 27 20.6569C25.9393 20.6569 24.9221 21.0781 24.172 21.828L21 25M21 25L25 29M29 5H37M33 1V9M21 13H21.02"
                                            stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>

                                <h6>
                                    <span>
                                        Upload a file
                                    </span> or drag and drop
                                </h6>
                                <p>
                                    PNG or JPG up to 10MB
                                </p>

                            </label>

                        </div>
                        <div v-show="coverImage != undefined || coverImageS == true" @drop="dropHandle" @dragover="dragover" class="has_img">
                            <label for="cover_image" class="cover_img_result">
                                <!-- รูปที่จะเพิ่ม -->
                                <img v-show="coverImage != undefined" src="#" draggable="false" alt="preview_image"
                                    id="cover-preview">
                                <!-- รูปที่มีแล้ว -->
                                <img v-show="coverImage == undefined && coverImageS == true"
                                    :src="`${origin}/api/image/users/${userId}/coverphoto`" draggable="false"
                                    alt="preview_image" id="cover-preview">
                            </label>
                        </div>
                        <p v-show="refreshPageCoverImgS" class="refresh_page_require">
                            Please refresh the page to load the latest image                        
                        </p>
                    </div>
                    <!-- <BaseShowErrorInput name="cover_img_profile"/> -->
                </div>
                
            </div>
            <!-- submit --> 
            <BaseSubmit name="profile_info" :disabled="!isChangeProfileInfo" @goBack="profileClear(), profileClearStatus()" @submit="profileSubmit" />
            
            <!-- <div v-show="isChangeProfileInfo || refreshPageS" class="submit">
                <button v-show="!refreshPageS" @click="profileClear(), profileClearStatus()">
                    Cancel
                </button>
                <button v-show="!refreshPageS" @click="profileSubmit">
                    Save
                </button>
                <p v-show="refreshPageS" class="importen_input">
                    Require refresh page to reload image
                </p>
            </div> -->
        </div>
        <!-- personal info -->
        <div class="wrapper_all">
            <div class="wrapper_info">
                <!-- title -->
                <div class="title">
                    <h4>
                        Personal Information
                    </h4>
                    <p>
                        Use a permanent address where you can receive mail. </p>
                </div>
                <div class="input_item">
                    <!-- first name & last name -->
                    <div class="container_info">
                        <!-- first name -->
                        <div class="info_item">
                            <h5 class="importen_input">
                                First name
                            </h5>
                            <input v-model="firstName" type="text" maxlength="50">
                            <!-- worning -->
                            <BaseShowErrorInput name="first_name" :show="firstNameS" :msg="firstNameM" />
                            <!-- <div v-show="firstNameS" class="wrapper_errorMsg">
                                <div>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z"
                                            fill="#F75555" />
                                    </svg>
                                    <p>
                                        {{ firstNameM }}
                                    </p>
                                </div>
                            </div> -->
                        </div>
                        <!-- last name -->
                        <div class="info_item">
                            <h5 class="importen_input">
                                Last name
                            </h5>
                            <input v-model="lastName" type="text" maxlength="50">
                            <!-- worning -->
                            <BaseShowErrorInput name="last_name" :show="lastNameS" :msg="lastNameM" />
                            <!-- <div v-show="lastNameS" class="wrapper_errorMsg">
                                <div>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z"
                                            fill="#F75555" />
                                    </svg>
                                    <p>
                                        {{ lastNameM }}
                                    </p>
                                </div>
                            </div> -->
                        </div>
                    </div>

                    <!-- email & phone number -->
                    <div class="container_info">
                        <!-- email -->
                        <div class="info_item">
                            <h5 class="importen_input">
                                Email address
                            </h5>
                            <input v-model="emailUser" type="text" maxlength="50" placeholder="apple@gmail.com">
                            <!-- worning -->
                            <BaseShowErrorInput name="email_user" :show="emailS" :msg="emailM" />
                            <!-- <div v-show="emailS" class="wrapper_errorMsg">
                                <div>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z"
                                            fill="#F75555" />
                                    </svg>
                                    <p>
                                        {{ emailM }}
                                    </p>
                                </div>
                            </div> -->
                        </div>
                        <!-- phone number -->
                        <div class="info_item">
                            <h5 class="importen_input">
                                Phone number
                            </h5>
                            <input v-model="phoneNumber" type="text" maxlength="11">
                            <!-- worning -->
                            <BaseShowErrorInput name="phone_number" :show="phoneNumberS" :msg="phoneNumberM" />
                            <!-- <div v-show="phoneNumberS" class="wrapper_errorMsg">
                                <div>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z"
                                            fill="#F75555" />
                                    </svg>
                                    <p>
                                        {{ phoneNumberM }}
                                    </p>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
                
            </div>
            <!-- submit -->
            <BaseSubmit  name="change_personal_info" :disabled="!isChangePersonalInfo" @goBack="personalInfoClear(), personalInfoClearStatus()" @submit="personalInfoSubmit" />
            
            <!-- <div v-show="isChangePersonalInfo || (firstNameS || lastNameS || emailS || phoneNumberS)" class="submit">
                <button @click="personalInfoClear(), personalInfoClearStatus()">
                    Cancel
                </button>
                <button @click="personalInfoSubmit">
                    Save
                </button>
            </div> -->
            <BaseAlert name="profile_setting_alert" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange" />
        </div>
    </div>

</template>
<style scoped>
* {
    box-sizing: border-box;
}

.wrapper_all {
    display: flex;
    width: 100%;
    height: fit-content;
    overflow: hidden;
    border: none;
    border-radius: min(0.556dvw,8px);
    box-shadow: 0px min(0.069dvw,1px) min(0.208dvw,3px) rgba(0, 0, 0, 0.1), 0px min(0.069dvw,1px) min(0.139dvw,2px) rgba(0, 0, 0, 0.06);
    /* gap: 24px; */
    animation: show_element ease-in 2s;
}

.wrapper_profile {
    display: flex;
    width: 100%;;
    height: fit-content;
    flex-direction: column;
    /* padding: 20px; */
    gap: min(1.667dvw,24px);
}

.wrapper_profile>div {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    /* padding: 20px; */
    background-color: #fff;
}

.wrapper_info {
    display: flex;
    width: 100%;
    height: fit-content;
    padding: min(1.389dvw,20px);
    gap: min(1.667dvw,24px);
    flex-direction: column;
    justify-content: center;
    align-items: start;
    /* background-color: #55f799; */
}
    
.title {
    display: flex;
    width: inherit;
    height: inherit;
    flex-direction: column;
    gap: min(0.278dvw,4px);
    align-items: start;
    justify-content: center;
}

.title h4 {
    display: flex;
    width: inherit;
    height: min(1.944dvw,28px);
    font-size: min(1.25dvw,18px);
    font-weight: 500;
    color: #212121;
    align-items: center;
}

.title p {
    display: flex;
    width: fit-content;
    height: min(1.389dvw,20px);
    font-weight: 400;
    font-size: min(0.833dvw,12px);
    color: #757575;
    align-items: center
}
.input_item {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: min(1.667dvw,24px);
}
.profile_item {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: min(0.278dvw,4px);
}

.profile_item h5 {
    width: 100%;
    height: min(1.389dvw,20px);
    font-weight: 500;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    color: #212121;
}

.username input {
    width: 100%;
    height: min(2.5dvw,36px);
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    border: min(0.069dvw,1px) solid;
    border-color: #E0E0E0;
    border-radius: min(0.278dvw,4px);
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    font-weight: 400;
    color: #212121;
}

.about_me textarea {
    width: 100%;
    height: min(6.944dvw,100px);
    min-height: min(2.5dvw,36px);
    max-height: min(13.889dvw,200px);
    resize: vertical;
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    border: min(0.069dvw,1px) solid;
    border-color: #D1D5DB;
    border-radius: min(0.278dvw,4px);
    font-weight: 400;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    color: #212121;
}

.about_me p {
    width: 100%;
    height: min(1.389dvw,20px);
    margin-top: min(0.556dvw,8px);
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    font-weight: 400;
    color: #9E9E9E;
}

.image>div {
    display: flex;
    height: fit-content;
    align-items: center;
    gap: min(1.389dvw,20px);
}

.image>div div {
    display: flex;
    width: min(3.333dvw,48px);
    height: min(3.333dvw,48px);
    border: none;
    border-radius: 50%;
    overflow: hidden;
    background-position: center;
    background-color: #fff;
    justify-content: center;
    align-items: center;
}

.image>div div img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* z-index: -1; */
}

.image>div input {
    display: none;
}

.image>div label {
    display: flex;
    width: fit-content;
    height: min(2.5dvw,36px);
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    border: min(0.069dvw,1px) solid;
    border-radius: min(0.278dvw,4px);
    border-color: #E0E0E0;
    cursor: pointer;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    color: #616161;
    font-weight: 500;
    letter-spacing: min(0.014dvw,0.2px);
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) rgba(0, 0, 0, 0.05);
}
p.refresh_page_require{
    font-size: 12px;
    font-weight: 500;
    color: #F75555;
}
.img_cover .no_img{
    display: flex;
    width: 100%;
    height: min(9.722dvw,140px);
    border: min(0.139dvw,2px) dashed;
    border-radius: min(0.278dvw,4px);
    border-color: #E0E0E0;
    justify-content: center;
    align-items: center;
}
.img_cover .has_img{
    display: flex;
    width: fit-content;
    max-width: 100%;
    height: min(9.722dvw,140px);
    overflow: hidden;
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
    font-size: min(0.833dvw,12px);
    color: #6B7280;
}

/* .cover_preview{
    width: 100%;
    height: 100%;
    overflow: hidden;
} */
.img_cover .cover_img_result{
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.img_cover>div label img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* background-position: center; */

}
/* submit */
/* .submit {
    display: flex;
    width: 100%;
    height: min(4.167dvw,60px);
    padding: min(0.833dvw,12px) min(1.389dvw,20px);
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
}
 */
.container_info {
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: start;
    align-items: start;
    gap: min(1.667dvw,24px);
}


.info_item {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: min(0.278dvw,4px);
}

.info_item h5 {
    width: fit-content;
    height: min(1.389dvw,20px);
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    font-weight: 500;
}
.importen_input::after {
    content: "*";
    color: #F75555;
    /* font-size: min(0.972dvw,14px);
    line-height: 144%;
    font-weight: 500; */
}

.info_item input {
    width: 100%;
    height: min(2.5dvw,36px);
    border: min(0.069dvw,1px) solid;
    border-radius: min(0.278dvw,4px);
    border-color: #D1D5DB;
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000D;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    font-weight: 400;
    color: #212121;
}
/* 
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
    letter-spacing: min(0.014dvw,0.2px);
    color: #F75555;
    overflow: hidden;
    text-overflow: ellipsis;
} */

/* mobile */
@media (width<=432px){
    .wrapper_all {
        border-radius:0px;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    }
    .wrapper_profile {
        gap: mins(1.852dvw,8px);
    }
    /* .wrapper_profile>div {
    } */
    .wrapper_info {
        padding: min(4.63dvw,20px);
        gap: min(4.63dvw,20px);
    }
    .title{
        display: none;
        gap: min(0.926dvw,4px);
    }
    /* .title >h4{
        height: 24px;
        font-size: 16px;
    }
    .title >p{
        display: none;
    } */
    .input_item {
        gap: min(2.778dvw,12px);
    }
    .profile_item {
        gap: min(0.926dvw,4px);
    }
    .profile_item h5 {
        height: min(4.63dvw,20px);
        font-size:min(3.241dvw,14px);
    }
    .username input {
        height: min(8.333dvw,36px);
        padding: min(1.852dvw,8px) min(2.778dvw,12px);
        border: min(0.231dvw,1px) solid #E0E0E0;
        border-radius: min(0.926dvw,4px);
        font-size: min(3.241dvw,14px);
    }
    .about_me textarea {
        height: min(23.148dvw,100px);
        min-height: min(8.333dvw,36px);
        max-height: min(46.296dvw,200px);
        resize: vertical;
        padding: min(1.852dvw,8px) min(2.778dvw,12px);
        border: min(0.231dvw,1px) solid #E0E0E0;
        border-radius: min(0.926dvw,4px);
        font-weight: 400;
        font-size: min(3.241dvw,14px);
    }
    .about_me p {
        height: 20px;
        margin-top: min(1.852dvw,8px);
        font-size: min(3.241dvw,14px);
    }
    .image>div {
        gap: min(4.63dvw,20px);
    }
    .image>div div {
        display: flex;
        width: min(27.546dvw,119px);
        height: min(27.546dvw,119px);
    }
    .image>div label {
        height: min(8.333dvw,36px);
        padding: min(1.852dvw,8px) min(2.778dvw,12px);
        border: 1px solid #E0E0E0;
        border-radius: min(0.926dvw,4px);
        font-size: min(3.241dvw,14px);
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
    }
    p.refresh_page_require{
        font-size: min(2.778dvw,12px);
    }
    .img_cover .no_img{
        height: min(32.407dvw,140px);
        border: min(0.463dvw,2px) dashed #E0E0E0;
        border-radius: min(0.926dvw,4px);
    }
    .img_cover .has_img{
        height:min(32.407dvw,140px);
    }
    .img_cover>div label {
        gap: min(0.926dvw,4px);
    }
    .img_cover>div label div {
        width: min(11.111dvw,48px);
        height: min(11.111dvw,48px);
    }
    .img_cover>div label div svg {
        width: min(8.333dvw,36px);
        height: min(8.333dvw,36px);
    }
    .img_cover>div label h6 {
        height: min(4.63dvw,20px);
        font-size: min(3.241dvw,14px);
    }
    .img_cover>div label p {
        height: min(3.704dvw,16px);
        font-size: min(2.778dvw,12px);
    }

    .container_info {
        gap: min(2.778dvw,12px);
        flex-direction: column;
    }
    .info_item {
        gap: min(0.926dvw,4px);
    }
    .info_item h5 {
        height: min(4.63dvw,20px);
        font-size:min(3.241dvw,14px);
    }
    .info_item input {
        width: 100%;
        height: min(8.333dvw,36px);
        border: min(0.231dvw,1px) solid #D1D5DB;
        border-radius: min(0.926dvw,4px);
        padding: min(1.852dvw,8px) min(2.778dvw,12px);
        box-shadow: 0px 1px 2px 0px #0000000D;
        font-size: min(3.241dvw,14px);
    }
}

</style>