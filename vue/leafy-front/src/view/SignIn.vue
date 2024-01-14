<script setup>
import{computed, ref}from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios';
import fetch from '../JS/api'
import BaseMenu from '../components/BaseMenu.vue';
import Basefooter from '../components/BaseFooter.vue';
import validation from '../JS/validation'

const myRouter =useRouter()
const goBack=()=>myRouter.go(-1)
const email=ref('')
const password=ref('')

// status for login
const signInStatus=ref(undefined)
const errorMsg=ref("")

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
        console.log(msg)
        console.log(status)
        
        if(status){
            goBack()
        }else{
            signInStatus.value=status
            errorMsg.value=msg
        }
    }
    
}

// eye icon
const showPasswordStatus=ref(false)
const showPassword=computed(()=>{
    let returnType = showPasswordStatus.value===true?'text':'password'  
    return returnType
})


</script>
<template>
    <BaseMenu/>
    <div class="signIn">
        <div class="container_signIn">
            <h3>
                Sign in
            </h3>
            <div class="wrapper_input">
                <input :style="[signInStatus==false?'border-color:#FCA5A5;':'']" class="signIn_input email" v-model="email" type="text" placeholder="you@example.com">
                <div :style="[signInStatus==false||passwordStatus==false?'border-color:#FCA5A5;':'']" class="wrapper_password">
                    <input class="signIn_input password" v-model="password" :type="showPassword" placeholder="password" >
                    <button @click="showPasswordStatus=!showPasswordStatus" >
                        <img src="../assets/icon/close_eye_icon.svg" alt="close_eye">
                    </button>
                </div>
                <div v-show="signInStatus==false||passwordStatus==false" class="wrapper_errorMsg">
                    <img src="../assets/icon/error_icon.png" alt="error_icon">
                    <p>{{ errorMsg }}</p>
                </div>
            </div>
            <button class="signIn_button" @click="login"> 
                Sign in
            </button>
            <div class="wrapper_other_login">
                <h4>
                    or
                </h4>
                <div class="other_login">
                    <button>
                        <img src="../assets/icon/Google.png" alt="google">
                    </button>
                    <button>
                        <img src="../assets/icon/Facebook_color.png" alt="facebook">
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
                <button>
                    <h4>
                        Sign Up
                    </h4>
                </button>
            </div>
        </div>
        
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
    padding: min(6.944dvw,100px) 0px min(20.833dvw,300px) 0px;
    /* box-sizing: border-box; */
    background-color: #F5F5F5;
}

.container_signIn{
    display: flex;
    width: min(28.889dvw,416px);
    height: min(25.278dvw,364px);
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
    gap: 12px;
}

.wrapper_errorMsg{
    display: flex;
    width: auto;
    height: 34px;
    padding: 8px 12px;
    font-size: 12px;
    border-radius: 4px;
    background-color: rgba(245, 72, 74, 0.08);
    gap: 8px;
}
.wrapper_errorMsg img{
    width: 15px;
    height: 15px;
}
.wrapper_errorMsg p{
    width: 100%;
    font-size:12px ;
    font-style: normal;
    font-weight: 400;
    line-height: 136%; /* 16.32px */
    letter-spacing: 0.2px;
    color: #F75555;
    overflow: hidden;
    text-overflow: ellipsis;
}
.wrapper_password{
    display: flex;
    height: inherit;
    height: min(3.333dvw,48px);
    border: min(0.069dvw,1px) solid ;
    border-radius: 4px;
    overflow: hidden;
    border-color: #E0E0E0;
    background-color: #FFF;
}
.wrapper_password:focus-within{
    outline: auto;
}
.signIn_input{
    width: 100%;
    height: min(3.333dvw,48px);
    font-size: min(1.111dvw,16px);
    font-weight: 400;
    /* border-color: #E0E0E0; */
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    
}
.email{
    padding: min(0.833dvw,12px) min(1.389dvw,20px);
    border: min(0.069dvw,1px) solid;
    border-radius: 4px;
    border-color: #E0E0E0;
    background-color: #FFF;
} 
.email:focus-within{
    outline: auto;
}
.password{
    width: 100%;
    height: 100%;
    padding: min(0.833dvw,12px) 0px min(0.833dvw,12px) min(1.389dvw,20px);
    border:0px;
    outline: none;
    font-size: min(1.111dvw,16px);
}
.wrapper_password button{
    width: min(1.667dvw,24px);
    height: auto;
    border: 0px;
    margin-right: min(1.389dvw,20px);
    background-color: inherit;
    cursor: pointer;
}
.wrapper_password button img{
    width: min(1.667dvw,24px);
    height: min(1.667dvw,24px);

}
.signIn_button{
    width: inherit;
    height: min(3.611dvw,52px);
    font-size: min(1.25dvw,18px);
    font-weight: 500;
    line-height: 156%; /* 28.08px */
    letter-spacing: min(0.014dvw,0.2px);
    background-color: #26AC34;
    color: #FFFFFF;
    border-radius: 4px;
    border-color: inherit;
    cursor: pointer;
    padding: 12px;
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
    border-radius: 4px;
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
        padding: 100px 0px 150px 0px;
    }
    .container_signIn{
        width: 352px;
        height: 344px;
        gap: 16px;
    }
    .container_signIn h3{
        height: 36px;
        font-size:24px ;
    }
    .wrapper_other_login h4{
        height: 20px;
        font-size: 14px;
    }
    .wrapper_password{
        height: 48px;
        border: 1px solid;
    }
    .signIn_input{
        height: 48px;
        font-size: 16px;
    }
    .email{
        padding: 12px 20px;
        border: 1px solid;
    }
    .password{
        padding: 12px  0px 12px 20px;
    }
    .wrapper_password button{
        width: 24px;
        margin-right: 20px;
    }
    .wrapper_password button img{
        width: inherit;
        height: auto;
    }
    .signIn_button{
        height: 40px;
        padding:8px  12px;
        font-size: 16px;
    }
    .other_login{
        height: 52px;
        gap: 16px;
    }
    .other_login button img{
        width: 28px;
        height: 28px;
    }
    .account_operation{
        height: 20px;
        font-size: 14px;
        gap: 16px;
    }
    .account_operation div h4, 
    .account_operation button h4{
        font-size: 14px;
    }
    
}

@media (width <=376px){
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
    .wrapper_other_login h4{
        height: min(5.319dvw,20px);
        font-size: min(3.723dvw,14px);
    }
    .wrapper_password{
        height: min(9.574dvw,36px);
        border:1px solid;
    }
    .signIn_input{
        height: min(9.574dvw,36px);
        font-size: min(3.723dvw,14px);
    }
    .email{
        padding: min(2.128dvw,8px) min(3.191dvw,12px);
    }
    .password{
        padding: min(2.128dvw,8px) 0px min(2.128dvw,8px) min(3.191dvw,12px);
    }
    .wrapper_password button{
        width: min(5.319dvw,20px);
        margin-right: min(3.191dvw,12px);

    }
    .signIn_button{
        height: min(9.574dvw,36px);
        padding:min(2.128dvw,8px) min(3.191dvw,12px);
        font-size: min(3.723dvw,14px);
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