<script setup>
import { useRouter } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import cookie from '../../JS/cookie';
import fetch from '../../JS/api'
import validation from '../../JS/validation'
import BaseAlert from '../../components/BaseAlert.vue';
import BaseSubmit from '../../components/accountSetting/BaseSubmit.vue';
import BaseShowErrorInput from '../../components/accountSetting/BaseShowErrorInput.vue'
const myRouter = useRouter()
// const goNewPW=()=>myRouter.push({name:"NewPW_AS"})
const userName = ref('')
// for check
const oldPassword = ref('')
const isChangePassword = ref(false) //for change mode 
const oldPasswordM = ref('')
const oldPasswordS = ref(false)
// const isShowBT=ref(false)
// new password
const newPassword = ref('')
// const newPasswordConfirm = ref('')
const newPasswordM = ref('')
const newPasswordS = ref(false)
// new password confirm
const newPasswordConfirm = ref('')
const newPasswordConfirmS = ref(false)
const newPasswordConfirmM = ref('')
// alert attribute
const isShowAlert=ref(false)
const alertType=ref(0)
const alertDetail=ref('')
const alertTime=ref(2)

const showPassword = (index) => {
    let input = document.getElementsByClassName('input_field')
    let type = input[index].getElementsByTagName('input')[0].getAttribute('type')
    if (type == 'password') {
        // isShowBT.value=!isShowBT.value
        // for(let i=0;i<eyeIcon.length;i++){
        input[index].getElementsByTagName('input')[0].setAttribute('type', 'text') //password
        input[index].getElementsByTagName('button')[0].getElementsByTagName('svg')[0].setAttribute('style', 'display:none;') //password
        input[index].getElementsByTagName('button')[0].getElementsByTagName('svg')[1].setAttribute('style', 'display:flex;') //password

        // }
    } else {
        // isShowBT.value=!isShowBT.value
        // for(let i=0;i<eyeIcon.length;i++){
        input[index].getElementsByTagName('input')[0].setAttribute('type', 'password') //password
        input[index].getElementsByTagName('button')[0].getElementsByTagName('svg')[0].setAttribute('style', 'display:flex;') //password
        input[index].getElementsByTagName('button')[0].getElementsByTagName('svg')[1].setAttribute('style', 'display:none;') //password


        // }
    }

}

const checkPassword = async () => {
    let { status, msg } = await fetch.login(userName.value, oldPassword.value)
    if (await status) {
        
        return true
    }else
    if(await msg=='401'){
        oldPasswordM.value = "Password does not exist."
        oldPasswordS.value = true 
        return false
    }else{
        // error
        isShowAlert.value=true
        alertType.value=1
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        alertTime.value=10
        
        return false
    }
    // console.log(status, msg)
}
const updatePassword = async () => {
    let statusUpdate=false
    // console.log(newPassword.value)
    if (newPassword.value == newPasswordConfirm.value) {
        let pw = { password: newPassword.value }
        let { status, msg } = await fetch.updataUserInfo(pw)
        if(await status){
            console.log(status, msg)
            return true
        }else{
            // error
            isShowAlert.value=true
            alertType.value=1
            alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
            alertTime.value=10
            return false
        }
    } else {
        newPasswordM.value = "Password not match."
        newPasswordS.value = true
    }

}
// go back
const cancelChangePassword = () => {
    let submitBT = document.getElementsByClassName('submit')
    // check password
    if (!isChangePassword.value) {
        oldPassword.value = ''
        // oldPasswordM.value = ''
        // oldPasswordS.value = false
        clearStatus(!isChangePassword.value)
    } else
        if (isChangePassword.value) {
            oldPassword.value = ''
            newPassword.value = ''
            newPasswordConfirm.value = ''
            isChangePassword.value = false
            // newPasswordM.value = ''
            // newPasswordS.value = false
            // newPasswordConfirmM.value=''
            // newPasswordConfirmS.value=false
            clearStatus(isChangePassword.value)
            submitBT[0].getElementsByTagName('button')[1].innerHTML = "Next"
        }
}
// clear status
const clearStatus=(mode)=>{
    if(mode){ //mode change password
        // oldPassword.value = ''
        // newPassword.value = ''
        // newPasswordConfirm.value = ''
        // isChangePassword.value = false
        newPasswordM.value = ''
        newPasswordS.value = false
        newPasswordConfirmM.value=''
        newPasswordConfirmS.value=false
    }else{ //mode check before change 
        // oldPassword.value = ''
        oldPasswordM.value = ''
        oldPasswordS.value = false
    }
}

// go next
const submitChangePasswrod = async () => {
    let submitBT = document.getElementsByClassName('submit')

    // check username and password
    if (!isChangePassword.value) {
        let status = await checkPassword()
        if (status) {
            isChangePassword.value = true
            submitBT[0].getElementsByTagName('button')[1].innerHTML = "Submit"
        }
    } else
        
        if (isChangePassword.value) { //change mode to submit
            clearStatus(isChangePassword.value) //chear all stauts
            let changePasswordStatus=true

            // check new password input
            if(newPassword.value==''){
                changePasswordStatus=false
                newPasswordS.value=true
                newPasswordM.value='New password must not null'
            }
            if(!validation.textRange(newPassword.value,20,8)){
                changePasswordStatus=false
                newPasswordS.value=true
                newPasswordM.value='Password must have length 8-20 characters.'
            }

            // check new password confirm input
            if(newPasswordConfirm.value==''){
                changePasswordStatus=false
                newPasswordConfirmS.value=true
                newPasswordConfirmM.value='New password confirm must not null'
            }
            if(newPassword.value != newPasswordConfirm.value){
                changePasswordStatus=false
                newPasswordConfirmS.value=true
                newPasswordConfirmM.value='Password not match'
            }

            if(changePasswordStatus){
                console.log(newPassword.value,'new')
                console.log(oldPassword.value,'old')
                if(newPassword.value==oldPassword.value){ //check new and old
                    newPasswordS.value=true
                    newPasswordM.value='Password does not change'
                }else{
                    let status = await updatePassword()
                    // let status =true
                    if (status) {
                        console.log('successful update')
                        cancelChangePassword()
                        isChangePassword.value = false
                    }
                }
            }
        }
}


// reset show alert status
const getShowAlertChange=(input)=>{
    isShowAlert.value=input
    isShowAlert.value=false
    alertType.value=0
    alertDetail.value=''
    alertTime.value=2
}

onBeforeMount(() => {
    validation.navigationTo()
    if(cookie.checkKeyPass()){
        let { username } = cookie.decrypt()
        userName.value = username
        console.log(userName.value)        
    }

})
</script>
<template>
    <div class="wrapper_all">
    <div class="wrapper_change_PW">
        <div class="change_PW">
            <div class="header_change_PW">
                <h4>
                    Change Password
                </h4>
                <p>
                    To protect your account security, please verify your identity with one of the methods below.
                </p>
            </div>
            <!-- old -->
            <div class="inputs">
                <div v-if="!isChangePassword" class="input_item">
                    <h5>
                        Current password
                    </h5>
                    <div class="input_field">
                        <input v-model="oldPassword" type="password" @keyup.enter="submitChangePasswrod()" maxlength="100">
                        <button @click="showPassword(0)" >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.94182 4.22798C9.28738 4.1877 9.64036 4.16699 9.99996 4.16699C13.8866 4.16699 16.9998 6.58586 18.3333 10.0003C18.0045 10.8423 17.5674 11.6238 17.0372 12.3234M5.43298 5.43319C3.73292 6.47037 2.41755 8.07748 1.66663 10.0003C3.00007 13.4148 6.11332 15.8337 9.99996 15.8337C11.6979 15.8337 13.2483 15.372 14.5671 14.5673M8.23227 8.23248C7.77981 8.6849 7.49996 9.30993 7.49996 10.0003C7.49996 11.381 8.61925 12.5003 9.99996 12.5003C10.6904 12.5003 11.3154 12.2205 11.7678 11.768"
                                    stroke="#BDBDBD" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M3.33337 3.33301L16.6667 16.6663" stroke="#BDBDBD" stroke-linecap="round" />
                            </svg>
                            <svg width="22" height="16" viewBox="0 0 22 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14 8C14 9.65685 12.6569 11 11 11C9.34314 11 8 9.65685 8 8C8 6.34315 9.34314 5 11 5C12.6569 5 14 6.34315 14 8Z"
                                    stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M1 8C2.60014 3.90264 6.33603 1 11 1C15.664 1 19.3999 3.90264 21 8C19.3999 12.0974 15.664 15 11 15C6.33603 15 2.60014 12.0974 1 8Z"
                                    stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        </button>
                    </div>
                    <!-- forget password -->
                    <!-- <button>
                        Forgot Password ?
                    </button> -->
                    <!-- worning -->
                    <BaseShowErrorInput name="old_pw_error" :show="oldPasswordS" :msg="oldPasswordM" />
                    <!-- <div v-show="oldPasswordS" class="wrapper_errorMsg">
                        <div>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z"
                                    fill="#F75555" />
                            </svg>
                            <p>
                                {{ oldPasswordM }}
                            </p>
                        </div>
                    </div> -->
                </div>
                <!-- New -->
                <div v-else-if="isChangePassword" class="new_PW">
                    <div class="input_item">
                        <h5>
                            New password
                        </h5>
                        <div class="input_field">
                            <input v-model="newPassword" type="password" maxlength="100">
                            <button @click="showPassword(0)">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.94182 4.22798C9.28738 4.1877 9.64036 4.16699 9.99996 4.16699C13.8866 4.16699 16.9998 6.58586 18.3333 10.0003C18.0045 10.8423 17.5674 11.6238 17.0372 12.3234M5.43298 5.43319C3.73292 6.47037 2.41755 8.07748 1.66663 10.0003C3.00007 13.4148 6.11332 15.8337 9.99996 15.8337C11.6979 15.8337 13.2483 15.372 14.5671 14.5673M8.23227 8.23248C7.77981 8.6849 7.49996 9.30993 7.49996 10.0003C7.49996 11.381 8.61925 12.5003 9.99996 12.5003C10.6904 12.5003 11.3154 12.2205 11.7678 11.768"
                                        stroke="#BDBDBD" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M3.33337 3.33301L16.6667 16.6663" stroke="#BDBDBD"
                                        stroke-linecap="round" />
                                </svg>
                                <svg width="22" height="16" viewBox="0 0 22 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M14 8C14 9.65685 12.6569 11 11 11C9.34314 11 8 9.65685 8 8C8 6.34315 9.34314 5 11 5C12.6569 5 14 6.34315 14 8Z"
                                        stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M1 8C2.60014 3.90264 6.33603 1 11 1C15.664 1 19.3999 3.90264 21 8C19.3999 12.0974 15.664 15 11 15C6.33603 15 2.60014 12.0974 1 8Z"
                                        stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <p>
                            Make your password short and easy to guess.
                        </p>
                        <!-- worning -->
                        <BaseShowErrorInput name="new_pw_error" :show="newPasswordS" :msg="newPasswordM" />
                        <!-- <div v-show="newPasswordS" class="wrapper_errorMsg">
                            <div>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z"
                                        fill="#F75555" />
                                </svg>
                                <p>
                                    {{ newPasswordM }}
                                </p>
                            </div>
                        </div> -->
                    </div>
                    <div class="input_item">
                        <h5>
                            Confirm new password
                        </h5>
                        <div class="input_field">
                            <input v-model="newPasswordConfirm" type="password" maxlength="100">
                            <button @click="showPassword(1)">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.94182 4.22798C9.28738 4.1877 9.64036 4.16699 9.99996 4.16699C13.8866 4.16699 16.9998 6.58586 18.3333 10.0003C18.0045 10.8423 17.5674 11.6238 17.0372 12.3234M5.43298 5.43319C3.73292 6.47037 2.41755 8.07748 1.66663 10.0003C3.00007 13.4148 6.11332 15.8337 9.99996 15.8337C11.6979 15.8337 13.2483 15.372 14.5671 14.5673M8.23227 8.23248C7.77981 8.6849 7.49996 9.30993 7.49996 10.0003C7.49996 11.381 8.61925 12.5003 9.99996 12.5003C10.6904 12.5003 11.3154 12.2205 11.7678 11.768"
                                        stroke="#BDBDBD" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M3.33337 3.33301L16.6667 16.6663" stroke="#BDBDBD"
                                        stroke-linecap="round" />
                                </svg>
                                <svg width="22" height="16" viewBox="0 0 22 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M14 8C14 9.65685 12.6569 11 11 11C9.34314 11 8 9.65685 8 8C8 6.34315 9.34314 5 11 5C12.6569 5 14 6.34315 14 8Z"
                                        stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M1 8C2.60014 3.90264 6.33603 1 11 1C15.664 1 19.3999 3.90264 21 8C19.3999 12.0974 15.664 15 11 15C6.33603 15 2.60014 12.0974 1 8Z"
                                        stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <p>
                            Make your password short and easy to guess.
                        </p>
                        <!-- worning -->
                        <BaseShowErrorInput name="confirm_pw_error" :show="newPasswordConfirmS" :msg="newPasswordConfirmM" />
                        <!-- <div v-show="newPasswordConfirmS" class="wrapper_errorMsg">
                            <div>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z"
                                        fill="#F75555" />
                                </svg>
                                <p>
                                    {{ newPasswordConfirmM }}
                                </p>
                            </div>
                        </div> -->
                    </div>
                    
                </div>
            </div>
            
            <BaseAlert name="change_password_alert" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange"/>
        </div>
    </div>
    <!-- submit -->
    <div v-if="!isChangePassword" class="check_pw_btn" >
        <button @click="submitChangePasswrod()" :class="[oldPassword.length==0?'btn_disable':'']" :disabled="oldPassword.length==0">
            Next
        </button>
    </div>
    <div v-else-if="isChangePassword">
        <BaseSubmit name="change_password_submit" :disabled="newPasswordConfirm.length==0&&newPassword.length==0" @goBack="cancelChangePassword" @submit="submitChangePasswrod()" />
    </div>
        <!-- <div class="submit">
            <button @click="cancelChangePassword()">
                Cancel
            </button>
            <button @click="submitChangePasswrod()">
                Next
            </button>
        </div> -->
    </div>
</template>
<style scoped>
* {
    box-sizing: border-box;
}
.btn_disable{
    cursor: not-allowed !important;
    background-color: #BDBDBD !important;
    border: none !important;
}
.wrapper_all {
    overflow: hidden;
    border: none;
    border-radius: min(0.556dvw,8px);
    box-shadow: 0px min(0.069dvw,1px) min(0.208dvw,3px) rgba(0, 0, 0, 0.1), 0px min(0.069dvw,1px) min(0.139dvw,2px) rgba(0, 0, 0, 0.06);
    animation: show_element ease-in 2s;
}
.wrapper_change_PW {
    display: flex;
    width: 100%;
    height: fit-content;
    padding: min(1.389dvw,20px);
    gap: min(1.667dvw,24px);
    flex-direction: column;
    justify-content: center;
    align-items: start;
    /* border: none;
    border-radius: 8px; */
    background-color: #fff;
}

.change_PW {
    display: flex;
    width: 100%;
    height: inherit;
    flex-direction: column;
    gap: min(1.667dvw,24px);
}

.header_change_PW {
    display: flex;
    width: inherit;
    height: inherit;
    flex-direction: column;
    gap: min(0.278dvw,4px);
    align-items: start;
    justify-content: center;
}

.header_change_PW h4 {
    display: flex;
    width: inherit;
    height: min(1.944dvw,28px);
    font-size: min(1.25dvw,18px);
    font-weight: 500;
    color: #212121;
    align-items: center;
}

.header_change_PW p {
    display: flex;
    width: inherit;
    height: min(1.389dvw,20px);
    font-weight: 400;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    color: #757575;
    align-items: center
}

.inputs {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    /* gap: 24px; */
}

.input_item {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: min(0.556dvw,8px);
}

.input_item h5 {
    display: flex;
    width: inherit;
    height: min(1.389dvw,20px);
    font-weight: 500;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    color: #212121;
}

.input_item .input_field {
    display: flex;
    width: min(22.222dvw,320px);
    height: min(2.5dvw,36px);
    background-color: #fff;
    border: min(0.069dvw,1px) solid;
    border-color: #D1D5DB;
    border-radius: min(0.278dvw,4px);
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000D;
    justify-content: center;
    align-items: center;
    padding-right: min(0.833dvw,12px);
}

.input_item .input_field:focus-within {
    outline: auto;
}

.input_item .input_field input {
    width: 100%;
    height: inherit;
    border: none;
    outline: none;
    padding: min(0.556dvw,8px) 0px min(0.556dvw,8px) min(0.833dvw,12px);
    background-color: transparent;
}

.input_item .input_field button {
    display: flex;
    width: fit-content;
    height: 100%;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
}

.input_item .input_field button svg {
    width: min(1.389dvw,20px);
    height: min(1.389dvw,20px);
}

.input_item .input_field button svg:nth-child(2) {
    display: none;
}

.input_item button {
    width: fit-content;
    height: min(1.389dvw,20px);
    font-weight: min(0.972dvw,14px);
    line-height: 144%;
    font-weight: 400;
    color: #9E9E9E;
    border: none;
    background-color: transparent;
}

.input_item p {
    display: flex;
    width: 100%;
    height: min(1.389dvw,20px);
    justify-content: start;
    align-items: center;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    font-weight: 400;
    color: #9E9E9E;
}

.new_PW {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: min(1.667dvw,24px);
}
div.check_pw_btn{
    display: flex;
    height: fit-content;
    padding: min(0.833dvw,12px) min(1.389dvw,20px);
    justify-content: end;
    align-items: center;
    text-align: center;
}
.check_pw_btn >button{
    display: flex;
    width: min(5.556dvw,80px);
    height: min(2.5dvw,36px);
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    background-color: #26AC34;
    color: #fff;
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000D;
    border: none;
    justify-content: center;
    align-items: center;
    border-radius: min(0.278dvw,4px);
    cursor: pointer;
    font-weight: 500;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    letter-spacing: min(0.014dvw,0.2px);
}
/* 

.submit {
    display: flex;
    width: 100%;
    height: min(4.167dvw,60px);
    padding: min(0.833dvw,12px) min(1.389dvw,20px);
    gap: min(0.556dvw,8px);
    justify-content: end;
    background-color: #FAFAFA;
}

.submit button {
    width: min(5.556dvw,80px);
    height: min(2.5dvw,36px);
    border: min(0.069dvw,1px) solid;
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    border-radius: min(0.278dvw,4px);
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000D;
    cursor: pointer;
    font-weight: 500;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    letter-spacing: min(0.014dvw,0.2px);
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
        border-radius: 0px;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px min(0.069dvw,1px) min(0.139dvw,2px) rgba(0, 0, 0, 0.06);
    }
    .wrapper_change_PW {
        padding: min(4.63dvw,20px);
        gap: min(4.63dvw,20px);
    }
    .change_PW {
        gap: min(2.778dvw,12px);
    }
    .header_change_PW {
        display: none;
    }
    /* .inputs {
    } */
    .input_item {
        gap: min(1.852dvw,8px);
    }
    .input_item h5 {
        height: min(4.63dvw,20px);
        font-size: min(3.241dvw,14px);
    }
    .input_item .input_field {
        display: flex;
        width: 100%;
        height: min(8.333dvw,36px);
        border: min(0.231dvw,1px) solid #D1D5DB;
        border-radius: min(0.926dvw,4px);
        box-shadow: 0px 1px 2px 0px #0000000D;
        padding-right: min(2.778dvw,12px);
    }
    .input_item .input_field input {
        padding: min(1.852dvw,8px) 0px min(1.852dvw,8px) min(2.778dvw,12px);
    }
    /* .input_item .input_field button{} */
    .input_item .input_field button svg {
        width: min(4.63dvw,20px);
        height: min(4.63dvw,20px);
    }
    .input_item button {
        height: min(4.63dvw,20px);
        font-weight: min(3.241dvw,14px);
    }
    .input_item p {
        height: min(4.63dvw,20px);
        font-size: min(3.241dvw,14px);
    }
    .new_PW {
        gap: min(5.556dvw,24px);
    }
    /* button next */
    div.check_pw_btn{
        display: flex;
        width: 100%;
        height: fit-content;
        padding: 0px min(4.63dvw,20px) min(4.63dvw,20px) min(4.63dvw,20px);
        justify-content: center;
        align-items: center;

    }
    .check_pw_btn >button{
        display: flex;
        width: 100%;
        height: min(8.333dvw,36px);
        padding: min(1.852dvw,8px) min(2.778dvw,12px);
        background-color: #26AC34;
        color: #fff;
        box-shadow: 0px min(0.231dvw,1px) min(0.463dvw,2px) 0px #0000000D;
        border: none;
        justify-content: center;
        align-items: center;
        border-radius: min(0.926dvw,4px);
        cursor: pointer;
        font-weight: 500;
        font-size: min(3.241dvw,14px);
        line-height: 144%;
        letter-spacing: min(0.046dvw,0.2px);
    }
}
</style>