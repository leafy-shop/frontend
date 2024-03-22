<script setup>
import { useRouter } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import cookie from '../../JS/cookie';
import fetch from '../../JS/api'
const myRouter = useRouter()
// const goNewPW=()=>myRouter.push({name:"NewPW_AS"})
const userName = ref('')
// forcheck
const oldPassword = ref('')
const isChangePassword = ref(false)
const oldPasswordM = ref('')
const oldPasswordS = ref(false)
// const isShowBT=ref(false)
// new password
const newPassword = ref('')
const newPasswordConfirm = ref('')
const newPasswordM = ref('')
const newPasswordS = ref(false)

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
    if (!status) {
        oldPasswordM.value = "Your account password is invalid. If you forgot password please click on forgot password button."
        oldPasswordS.value = true
    }
    // console.log(status, msg)
    return status
}
const updatePassword = async () => {
    // console.log(newPassword.value)
    if (newPassword.value == newPasswordConfirm.value) {
        let pw = { password: newPassword.value }
        let { status, msg } = await fetch.updataUserInfo(pw)
        console.log(status, msg)
        return status
    } else {
        newPasswordM.value = "Your new password is unmatch. Please check your password before submit."
        newPasswordS.value = true
    }

}
// go back
const cancelChangePassword = () => {
    let submitBT = document.getElementsByClassName('submit')
    // check password
    if (!isChangePassword.value) {
        oldPassword.value = ''
        oldPasswordM.value = ''
        oldPasswordS.value = false
    } else
        if (isChangePassword.value) {
            oldPassword.value = ''
            newPassword.value = ''
            newPasswordConfirm.value = ''
            isChangePassword.value = false
            newPasswordM.value = ''
            newPasswordS.value = false
            submitBT[0].getElementsByTagName('button')[1].innerHTML = "Next"
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
            let status = await updatePassword()
            // let status =true
            if (status) {
                console.log('successful update')
                cancelChangePassword()
                isChangePassword.value = false
            }
        }


}

onBeforeMount(() => {
    let { username } = cookie.decrypt()
    userName.value = username
    console.log(userName.value)
})
</script>
<template>
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
                        <input v-model="oldPassword" type="password">
                        <button @click="showPassword(0)">
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
                    <!-- worning -->
                    <div v-show="oldPasswordS" class="wrapper_errorMsg">
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
                    </div>
                    <button>
                        Forgot Password ?
                    </button>
                </div>
                <!-- New -->
                <div v-else-if="isChangePassword" class="new_PW">
                    <div class="input_item">
                        <h5>
                            New password
                        </h5>
                        <div class="input_field">
                            <input v-model="newPassword" type="password">
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
                    </div>
                    <div class="input_item">
                        <h5>
                            Confirm new password
                        </h5>
                        <div class="input_field">
                            <input v-model="newPasswordConfirm" type="password">
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
                    </div>
                    <!-- worning -->
                    <div v-show="newPasswordS" class="wrapper_errorMsg">
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
                    </div>
                </div>
            </div>
            <!-- submit -->
            <div class="submit">
                <button @click="cancelChangePassword()">
                    Cancel
                </button>
                <button @click="submitChangePasswrod()">
                    Next
                </button>
            </div>

        </div>
    </div>
</template>
<style scoped>
* {
    box-sizing: border-box;
}

.wrapper_change_PW {
    display: flex;
    width: 100%;
    height: fit-content;
    padding: 20px;
    gap: 24px;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    border: none;
    border-radius: 8px;
    background-color: #fff;
}

.change_PW {
    display: flex;
    width: 100%;
    height: inherit;
    flex-direction: column;
    gap: 24px;
}

.header_change_PW {
    display: flex;
    width: inherit;
    height: inherit;
    flex-direction: column;
    gap: 4px;
    align-items: start;
    justify-content: center;
}

.header_change_PW h4 {
    display: flex;
    width: inherit;
    height: 28px;
    font-size: 18px;
    font-weight: 500;
    color: #212121;
    align-items: center;
}

.header_change_PW p {
    display: flex;
    width: inherit;
    height: 20px;
    font-weight: 400;
    font-size: 14px;
    color: #757575;
    align-items: center
}

.inputs {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 24px;
}

.input_item {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 8px;
}

.input_item h5 {
    display: flex;
    width: inherit;
    height: 20px;
    font-weight: 500;
    font-size: 14px;
    color: #212121;
}

.input_item .input_field {
    display: flex;
    width: 320px;
    height: 36px;
    background-color: #fff;
    border: 1px solid;
    border-color: #D1D5DB;
    border-radius: 4px;
    box-shadow: 0px 1px 2px 0px #0000000D;
    justify-content: center;
    align-items: center;
    padding-right: 12px;
}

.input_item .input_field:focus-within {
    outline: auto;
}

.input_item .input_field input {
    width: 100%;
    height: inherit;
    border: none;
    outline: none;
    padding: 8px 0px 8px 12px;
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
    width: 20px;
    height: 20px;
}

.input_item .input_field button svg:nth-child(2) {
    display: none;
}

.input_item button {
    width: fit-content;
    height: 20px;
    font-weight: 14px;
    font-weight: 400;
    color: #9E9E9E;
    border: none;
    background-color: transparent;
}

.input_item p {
    display: flex;
    width: 100%;
    height: 20px;
    justify-content: start;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: #9E9E9E;
}

.new_PW {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 24px;
}


.submit {
    display: flex;
    width: 100%;
    height: 60px;
    padding: 12px 24px;
    gap: 8px;
    justify-content: end;
}

.submit button {
    width: 80px;
    height: 36px;
    border: 1px solid;
    padding: 8px 12px;
    border-radius: 4px;
    border-color: #E0E0E0;
    box-shadow: 0px 1px 2px 0px #0000000D;
    cursor: pointer;
}

.submit button:nth-child(1) {
    background-color: #fff;
    color: #212121;
}

.submit button:nth-child(2) {
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
    /* 16.32px */
    letter-spacing: 0.2px;
    color: #F75555;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>