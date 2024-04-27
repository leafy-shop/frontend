<script setup>
import{computed, ref}from 'vue'
import {useRouter} from 'vue-router'
import Another from '../components/authorization/Another.vue'
import fetch from '../JS/api'
import BaseMenu from '../components/BaseMenu.vue'
import Basefooter from '../components/BaseFooter.vue'
import validation from '../JS/validation'
import BaseAlert from '../components/BaseAlert.vue'
const myRouter =useRouter()
const goBack=()=>myRouter.go(-1)

const email=ref('')
const password=ref('')

// status for login
const signInStatus=ref(undefined)
const errorMsg=ref("")

// alert attribute
const isShowAlert=ref(false)
const alertType=ref(0)
const alertDetail=ref('')
const alertTime=ref(2)

//input password status 
const passwordStatus=ref(undefined)
const passwordValidation=(pw)=>{
    if(pw.length<8||pw.length>20){
        errorMsg.value="Password should contain 8-20 characters."
        passwordStatus.value=false
       return false
    }else{
        return true
    }
}


const login =async()=>{
    signInStatus.value=undefined
    passwordStatus.value=undefined
//   console.log(email.value,password.value)
    // console.log(passwordValidation(password.value))
    if(passwordValidation(password.value)){
        let {msg,status}=await fetch.login(email.value,password.value)
        // console.log(msg)
        // console.log(status)
        
        if(await status){
            goBack()
        }else
        if(await msg=='401'||await msg=='404'||await msg=='403'){
            signInStatus.value=await status
            errorMsg.value= "Sorry, this account doesn't exist."
        }else{
            isShowAlert.value=true
            alertType.value=1
            alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
            alertTime.value=10
        }
    }
    
}

// eye icon
const showPasswordStatus=ref(false)
const showPassword=computed(()=>{
    let returnType = showPasswordStatus.value===true?'text':'password'  
    return returnType
})

// reset show alert status
const getShowAlertChange=(input)=>{
    isShowAlert.value=input
    alertType.value=0
    alertDetail.value=''
    alertTime.value=2
}

</script>
<template>
    <BaseMenu/>
    <div class="signIn">
        <div class="container_signIn">
            <h3>
                Sign in
            </h3>
            <div class="wrapper_input">
                <input :style="[signInStatus==false?'border-color:#FCA5A5;':'']" class="email" v-model="email" type="text"  maxlength="150" placeholder="Email, username or phone number">
                <div class="errorMsg">
                    <div :style="[signInStatus==false||passwordStatus==false?'border-color:#FCA5A5;':'']" class="wrapper_password">
                        <input @keydown.enter="login" class="password" v-model="password" maxlength="150" :type="showPassword" placeholder="Password" >
                        <button @click="showPasswordStatus=!showPasswordStatus" >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.7302 5.07319C11.1449 5.02485 11.5685 5 12 5C16.664 5 20.3999 7.90264 22 12C21.6054 13.0104 21.0809 13.9482 20.4447 14.7877M6.51962 6.51944C4.47955 7.76406 2.90111 9.69259 2 12C3.60014 16.0974 7.33603 19 12 19C14.0376 19 15.898 18.446 17.4806 17.4804M9.87877 9.87859C9.33582 10.4215 9 11.1715 9 12C9 13.6569 10.3431 15 12 15C12.8285 15 13.5785 14.6642 14.1214 14.1212" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4 4L20 20" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                    <div v-show="signInStatus==false||passwordStatus==false" class="wrapper_errorMsg">
                        <img src="../assets/icon/error_icon.png" alt="error_icon">
                        <p>{{ errorMsg }}</p>
                    </div>
                </div>
            </div>
            <button class="signIn_button" @click="login"> 
                Sign in
            </button>
            <Another/>
            <!-- <div class="wrapper_other_login">
                <h4>
                    or
                </h4>
                <div class="other_login">
                    <button>
                        <img src="../assets/icon/google.png" alt="google">
                    </button>
                    <button>
                        <img src="../assets/icon/facebook_color.png" alt="facebook">
                    </button>
                </div>
            </div>
            <div class="account_operation">
                <div>
                    <h4>
                        Forgot <span>Password</span> or <span>Username</span>?
                    </h4>
                </div>
                <hr>
                <button @click="goSignUp">
                    <h4>
                        Sign Up
                    </h4>
                </button>
            </div> -->
        </div>
        <BaseAlert name="sign_in_alert" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange"/>
    </div>

    <Basefooter/>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.signIn{
    width: auto;
    height: fit-content;
    padding: min(13.889dvw,200px) 0px;
    /* box-sizing: border-box; */
    background-color: #F5F5F5;
}

.container_signIn{
    display: flex;
    width: min(28.889dvw,416px);
    /* height: min(25.278dvw,364px); */
    height: fit-content;
    flex-direction: column;
    gap: min(1.111dvw,16px);
    margin: auto;
}
.container_signIn h3 {
    width: inherit;
    height: min(2.5dvw,36px);
    font-size: min(1.667dvw,24px);
    font-weight: 700;
    text-align: center;
}
.wrapper_input{
    display: flex;
    flex-direction: column;
    width: auto;
    height: fit-content;
    gap: min(0.833dvw,12px);
}
.errorMsg {
    display: flex;
    flex-direction: column;
    gap: min(0.278dvw,4px);
}

.wrapper_errorMsg{
    display: flex;
    width: auto;
    height: min(2.222dvw, 32px);
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    font-size: min(0.833dvw,12px);
    border-radius: min(0.278dvw,4px);
    background-color: rgba(245, 72, 74, 0.08);
    gap: min(0.278dvw,4px);
    align-items: center;
}
.wrapper_errorMsg img{
    width: min(1.111dvw, 16px);
    height: min(1.111dvw, 16px);
}
.wrapper_errorMsg p{
    width: 100%;
    font-size:min(0.833dvw,12px);
    font-style: normal;
    font-weight: 400;
    line-height: 136%; /* 16.32px */
    letter-spacing: min(0.014dvw, 0.2px);
    color: #F75555;
    overflow: hidden;
    text-overflow: ellipsis;
}
.wrapper_password {
    display: flex;
    justify-content: center;
    align-items: center;
    height: fit-content;
    height: min(3.333dvw,48px);
    border: min(0.069dvw,1px) solid ;
    border-radius: min(0.278dvw,4px);
    overflow: hidden;
    border-color: #E0E0E0;
    background-color: #FFF;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
.wrapper_password:hover {
    border: min(0.069dvw, 1px) solid #26AC34;
    background-color: #FFF;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
.wrapper_password:hover svg path {
    stroke: #26AC34;
}
.wrapper_password:focus-within {
    border-color: #26AC34;
}
.email{
    width: 100%;
    height: min(3.333dvw,48px);
    padding: min(0.833dvw,12px) min(1.389dvw,20px);
    border: min(0.069dvw,1px) solid;
    border-radius: min(0.278dvw,4px);
    border-color: #E0E0E0;
    background-color: #FFF;
    font-size: min(1.111dvw,16px);
    font-weight: 300;    
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    color: #212121;
} 
.email:hover {
    border: min(0.069dvw, 1px) solid #26AC34;
    background-color: #FFF;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
.email:focus-within{
    border-color: #26AC34;
}
.password{
    display: flex;
    width: 100%;
    height: 100%;
    padding: min(0.833dvw,12px) 0px min(0.833dvw,12px) min(1.389dvw,20px);
    border:0px;
    outline: none;
    font-size: min(1.111dvw,16px);
    font-weight: 300;
    color: #212121;
    background-color: #FFF;
}
.wrapper_password button{
    display: flex;
    width: min(1.667dvw,24px);
    height: auto;
    border: 0px;
    align-items: center;
    margin-right: min(1.389dvw,20px);
    background-color: inherit;
    cursor: pointer;
}
.wrapper_password button img{
    width: min(1.667dvw,24px);
    height: min(1.667dvw,24px);
}
.signIn_button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: inherit;
    height: min(3.611dvw,52px);
    font-size: min(1.25dvw,18px);
    font-weight: 500;
    line-height: 156%; /* 28.08px */
    letter-spacing: min(0.014dvw,0.2px);
    background-color: #26AC34;
    color: #FFFFFF;
    border-radius: min(0.278dvw,4px);
    border: none;
    cursor: pointer;
    padding: min(0.833dvw,12px);
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px rgba(0, 0, 0, 0.05);
}
.signIn_button:hover {
    /* border: min(0.069dvw, 1px) solid #26AC34;
    color: #26AC34; */
    background-color: #168A22;
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px rgba(0, 0, 0, 0.05);
}
.signIn_button:active {
    background-color: #58d264;
}
.wrapper_other_login{
    width: auto;
    height: fit-content;
}
.wrapper_other_login h4{
    width: inherit;
    height: min(1.389dvw,20px);
    font-size: min(0.972dvw,14px);
    font-weight: 400;
    color: #757575;
    text-align: center;
}
.other_login{
    display: flex;
    width: inherit;
    height: min(3.611dvw,52px);
    gap: min(1.111dvw,16px);
}
.other_login button{
    /* width: ; */
    height: inherit;
    flex-grow: 1;
    border: 0px;
    border-radius: min(0.278dvw,4px);;
    cursor: pointer;
    background-color: #FFFFFF;
}
.other_login button img{
    width: min(1.944dvw,28px);
    height: min(1.944dvw,28px);
}
.account_operation{
    display: flex;
    width: inherit;
    height: min(1.389dvw,20px);
    /* font-size: min(0.972dvw,14px); */
    gap: min(1.111dvw,16px);
    justify-content: center;
}
.account_operation div h4{
    color: #757575;
    font-style: normal;
    font-weight: 400;
    font-size: min(0.972dvw,14px);

}
h4 > span{
    text-decoration: underline;
    /* cursor: pointer; */

}
.account_operation button{
    border: 0px;
    cursor: pointer;
    background-color: inherit;
    
}
.account_operation button h4{
    color: #26AC34;
    font-size: min(0.972dvw,14px);
    font-weight: 700;
    line-height: 144%; /* 20.16px */
    letter-spacing: min(0.014dvw,0.2px);
}

@media (width <=744px){
    .signIn{
        padding: min(13.441dvw,100px) 0px min(20.161dvw,150px) 0px;
    }
    .container_signIn{
        width: min(47.312dvw,352px);
        /* height: min(47.312dvw,344px); */
        height: fit-content;
        gap: min(2.151dvw,16px);
    }
    .container_signIn h3{
        height: min(4.839dvw,36px);
        font-size:min(3.226dvw,24px) ;
    }
    .wrapper_input{
        gap: min(1.613dvw,12px);
    }
    .errorMsg {
        gap: min(0.538dvw,4px);
    }
    .wrapper_other_login h4{
        height: min(2.688dvw,20px);
        font-size: min(1.882dvw,14px);
    }
    .wrapper_password{
        height: min(6.452dvw,48px);
        border: min(0.134dvw,1px) solid #E0E0E0;
        border-radius: min(0.538dvw,4px);

    }

    .email{
        padding: min(1.613dvw,12px) min(2.688dvw,20px);
        border: min(0.134dvw,1px) solid #E0E0E0;
        border-radius: min(0.538dvw,4px);
        height: min(6.452dvw,48px);
        font-size: min(2.151dvw,16px);
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
        color: #212121;
    }
    .password{
        padding: min(1.613dvw,12px)  0px  min(1.613dvw,12px) min(2.688dvw,20px);;
        height: min(6.452dvw,48px);
        font-size: min(2.151dvw,16px);
    }

    .wrapper_errorMsg{
        height: min(4.57dvw,34px);
        padding: min( 1.075dvw,8px) min( 1.613dvw,12px);
        font-size: min( 1.613dvw,12px);
        border-radius: min( 0.538dvw,4px);
        gap: min( 1.075dvw,8px);
    }
    .wrapper_errorMsg img{
        width: min(2.151dvw, 16px);
        height: min(2.151dvw, 16px);
    }
    .wrapper_errorMsg p{
        font-size:min( 1.613dvw,12px);
    }
    .wrapper_password button{
        width: min(3.226dvw,24px) ;
        margin-right: min(2.688dvw,20px);
        
    }
    .wrapper_password button img{
        width: inherit;
        height: auto;
    }
    .signIn_button{
        height: min(5.376dvw,40px);
        padding:min(1.075dvw,8px)  min(1.613dvw,12px);
        font-size: min(2.151dvw,16px);
        border-radius: min(0.538dvw,4px);
    }
    
    .other_login button img{
        width: min(3.763dvw,28px);
        height: min(3.763dvw,28px);
    }
    .account_operation{
        height: min(2.688dvw,20px)_;
        font-size: min(1.882dvw,14px);
        gap: min(2.151dvw,16px);
    }
    .account_operation div h4, 
    .account_operation button h4{
        font-size: min(1.882dvw,14px);
    }
    
}

@media (width <=432px){
    .signIn{
        padding: min(26.596dvw,100px) 0px min(39.894dvw,150px) 0px;
    }
    .container_signIn{
        width: min(91.489dvw,344px);
        height: min(73.404dvw,276px);
        gap: min(3.191dvw,12px);
    }
    .container_signIn h3{
        height: min(7.447dvw,28px);
        font-size: min(4.787dvw,18px);
    }
    .wrapper_input{
        gap: min(2.128dvw,8px);
    }
    .errorMsg {
        gap: min(1.064dvw,4px);
    }
    .wrapper_other_login h4{
        height: min(5.319dvw,20px);
        font-size: min(3.723dvw,14px);
    }
    .wrapper_password{
        height: min(9.574dvw,36px);
        border:min(0.266dvw,1px) solid #E0E0E0;
        border-radius: min(1.064dvw,4px);
    }

    .email{
        padding: min(2.128dvw,8px) min(3.191dvw,12px);
        border-radius:min(1.064dvw,4px) ;
        border: 1px solid #E0E0E0;
        height: min(9.574dvw,36px);
        font-size: min(3.723dvw,14px);
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
        color: #212121;
    }
    .password{
        padding: min(2.128dvw,8px) 0px min(2.128dvw,8px) min(3.191dvw,12px);
        height: min(9.574dvw,36px);
        font-size: min(3.723dvw,14px);

    }
    .wrapper_password button{
        width: min(5.319dvw,20px);
        margin-right: min(3.191dvw,12px);

    }
    .wrapper_errorMsg{
        height: min( 9.043dvw,34px);
        padding: min(2.128dvw,8px) min(3.191dvw,12px);
        font-size: min(3.191dvw,12px);
        border-radius: min(1.064dvw,4px);
        gap: min(2.128dvw,8px);
    }
    .wrapper_errorMsg img{
        width: min(4.255dvw, 16px);
        height: min(4.255dvw, 16px);
    }
    .wrapper_errorMsg p{
        font-size:min(3.191dvw,12px);
    }
    .signIn_button{
        height: min(9.574dvw,36px);
        padding:min(2.128dvw,8px) min(3.191dvw,12px);
        font-size: min(3.723dvw,14px);
        border-radius:min(1.064dvw,4px);
    }
    .other_login{
        height: min(10.638dvw,40px);
        gap: min(4.255dvw,16px);
    }
    .other_login button img{
        width:  min(3.723dvw,14px);
        height:  min(3.723dvw,14px);
    }
    .account_operation{
        height: min(4.255dvw,16px);
        font-size: min(3.191dvw,12px);
        gap: min(3.191dvw,12px);
    }
    .account_operation div h4, 
    .account_operation button h4{
        font-size: min(3.191dvw,12px);
    }
}
</style>