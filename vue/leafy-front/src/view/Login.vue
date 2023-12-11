<script setup>
import{computed, ref}from 'vue'
import axios from 'axios';
import fetch from '../JS/api'
import BaseMenu from '../components/BaseMenu.vue';
import Basefooter from '../components/basefooter.vue';
const email=ref('')
const password=ref('')

// status for login
const status=ref(undefined)

const login =async()=>{
  console.log(email.value,password.value)
  fetch.login(email.value,password.value)
}

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
            <input class="signIn_input email" v-model="email" type="text" placeholder="you@example.com">
            <div class="wrapper_password">
                <input class="signIn_input password" v-model="password" :type="showPassword" placeholder="password" >
                <button @click="showPasswordStatus=!showPasswordStatus" >
                    <img src="../assets/icon/close_eye_icon.svg" alt="close_eye">
                </button>
            </div>
            <button class="signIn_button" @click="login"> 
                Sign in
            </button>
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
.signIn{
    width: auto;
    height: fit-content;
    padding: 100px 512px 300px 512px;
    box-sizing: border-box;
    background-color: #F5F5F5;
}

.container_signIn{
    display: flex;
    width: 416px;
    height: 364px;
    flex-direction: column;
    gap: 16px;
    margin: auto;
}
.container_signIn h3 {
    width: inherit;
    height: 36px;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
}
.container_signIn h4{
    width: inherit;
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    color: #757575;
    text-align: center;
}
.wrapper_password{
    display: flex;
    height: inherit;
    height: 48px;
    border: 1px solid ;
    border-radius: 4px;
    overflow: hidden;
    border-color: #E0E0E0;
    background-color: #FFF;
}
.wrapper_password:focus-within{
    outline: auto;
}
.signIn_input{
    width: inherit;
    height: 48px;
    font-size: 16px;
    font-weight: 400;
    box-sizing: border-box;
    
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    
}
.email{
    padding: 12px 20px;
    border: 1px solid;
    border-radius: 4px;
    border-color: #E0E0E0;
    background-color: #FFF;
} 
.password{
    width: 370px;
    padding: 12px 0px 12px 20px;
    border:0px;
    outline: none;
}
.wrapper_password button{
    width: 24px;
    height: 100%;
    border: 0px;
    margin-right: 20px;
    box-sizing: border-box;
    background-color: inherit;
    cursor: pointer;
}
.wrapper_password button img{
    width: 24px;
    height: 24px;

}
.signIn_button{
    width: inherit;
    height: 52px;
    font-size: 18px;
    font-weight: 500;
    line-height: 156%; /* 28.08px */
    letter-spacing: 0.2px;
    background-color: #26AC34;
    color: #FFFFFF;
    border-radius: 4px;
    border-color: inherit;
    cursor: pointer;
}
.other_login{
    display: flex;
    width: inherit;
    height: 52px;
    gap: 16px;
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
    width: 28px;
    height: 28px;
}
.account_operation{
    display: flex;
    width: inherit;
    height: 20px;
    font-size: 14px;
    gap: 16px;
    justify-content: center;
}
h4 > span{
    text-decoration: underline;
    cursor: pointer;
}
.account_operation button{
    border: 0px;
    cursor: pointer;
    background-color: inherit;
    
}
.account_operation button h4{
    color: #26AC34;
    font-weight: 700;
    line-height: 144%; /* 20.16px */
    letter-spacing: 0.2px;
}
</style>