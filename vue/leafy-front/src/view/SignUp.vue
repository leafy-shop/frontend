<script setup>
import {useRoute,useRouter} from 'vue-router'
import {ref,onMounted,computed} from 'vue'
import BaseMenu from '../components/BaseMenu.vue';
import BaseFooter from '../components/BaseFooter.vue';
import Another from '../components/authorization/Another.vue';
import validation from '../JS/validation'
import fetch from '../JS/api';
import BaseAlert from '../components/BaseAlert.vue';
const {params}=useRoute()

//for move to sign-up page
const myRouter=useRouter() 
const goSignIn=()=>myRouter.push({name:'SignIn'})

// for receive data
const firstN=ref('')
const lastN=ref('')
const userN=ref('')
const email =ref(params.email?validation.decrypt(params.email):'')
const password=ref('')
const confirmP=ref('')
const phoneNumber=ref('')
const errorMSG=ref('')

// status
const firstNS=ref(false)
const lastNS=ref(false)
const userNS=ref(false)
const emailS=ref(false)
const passwordS=ref(false)
const confirmPS=ref(false)
const phoneNumberS=ref(false)
//msg
const firstNM=ref('')
const lastNM=ref('')
const userNM=ref('')
const emailM=ref('')
const passwordM=ref('')
const confirmPM=ref('')
const phoneNumberM=ref('')

// alert attribute
const isShowAlert=ref(false)
const alertType=ref(0)
const alertDetail=ref('')
const alertTime=ref(2)

// for show error 
const isShowE=ref(false)
// eye icon
const showPasswordStatus=ref(false)
const showPassword=computed(()=>{
    let returnType = showPasswordStatus.value===true?'text':'password'  
    return returnType
})

// for choose data to clear
const clearAll={
    data(){
        firstN.value=''
        lastN.value=''
        userN.value=''
        email.value =''
        password.value=''
        confirmP.value=''
        phoneNumber.value=''
        errorMSG.value=[]
    },
    msg(){
        firstNM.value=''
    lastNM.value=''
    userNM.value=''
    emailM.value=''
    passwordM.value=''
    confirmPM.value=''
    phoneNumberM.value=''
    },
    alert(){
        firstNS.value=false
        lastNS.value=false
        userNS.value=false
        emailS.value=false
        passwordS.value=false
        confirmPS.value=false
        phoneNumberS.value=false
    }
}

const signUp=async()=>{
    clearAll.msg()
    clearAll.alert()
    isShowE.value=false
    let isNotReady=false
    
    //this will check and set value to false if invalid data
    //other condition
    if(!validation.textRange(password.value,20,8)){passwordM.value="Password must have length 8-20 characters";confirmPM.value="Password must have length 8-20 characters";isNotReady=true;passwordS.value=true }
    if(password.value!=confirmP.value){passwordM.value="Password not match.";confirmPM.value="Password not match.";isNotReady=true;passwordS.value=true;confirmPS.value=true}
    if(!validation.number(phoneNumber.value)){phoneNumberM.value="Incorrect phone number format.";isNotReady=true;phoneNumberS.value=true }
    if(!validation.email(email.value)){emailM.value="Invalid Email ";isNotReady=true;emailS.value=true }
    if(validation.number(firstN.value)){firstNM.value="First name must be letters only.";isNotReady=true;firstNS.value=true}
    if(validation.number(lastN.value)){lastNM.value="Last name must be letters only.";isNotReady=true;lastNS.value=true}
    if(!validation.textRange(phoneNumber.value,11,10)){phoneNumberM.value="Incorrect phone number format.";isNotReady=true;phoneNumberS.value=true }
    if(confirmP.value.length==0){confirmPM.value="Need information: 'Confirm Password'.";isNotReady=true;confirmPS.value=true }
   // if(phoneNumber.value.length==0){phoneNumberM.value="Need information: 'Phone number'.";isNotReady=true;phoneNumberS.value=true}

    //name
    if(!validation.text(firstN.value)){firstNM.value="First name must be letters only.";isNotReady=true;firstNS.value=true}
    if(!validation.text(lastN.value)){lastNM.value="Last name must be letters only.";isNotReady=true;lastNS.value=true}
    if(firstN.value.length==0){firstNM.value="Need information: 'First name'.";isNotReady=true;firstNS.value=true}
    if(lastN.value.length==0){lastNM.value="Need information: 'Last name'.";isNotReady=true;lastNS.value=true}
    //account
    if(userN.value.length==0){userNM.value="Need information: 'Username'.";isNotReady=true;userNS.value=true}
    if(email.value.length==0){emailM.value="Need information: 'Email'.";isNotReady=true;emailS.value=true}    
    if(password.value.length==0){passwordM.value="Need information: 'Password'.";isNotReady=true;passwordS.value=true}
    
    // console.log(isNotReady)
    if(!isNotReady){
        let userData={
            "em": email.value,
            "pw": password.value,
            "un": userN.value,
            "fn": firstN.value,
            "ln": lastN.value,
            "pn": phoneNumber.value
        }
        let {status,msg}=await fetch.signUp(userData)

        //if status not good will show error
        if(await status){
            isShowE.value=false
            console.log('created user successful!!')
            goSignIn()
        }else
        if(await msg=='400'||await msg=='403'){
            isShowE.value=true
            // console.log(msg)
            errorMSG.value='This account is already in our system!'
        }else{
            isShowAlert.value=true
            alertType.value=1
            alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
            alertTime.value=10
        }
    }
}

// reset show alert status
const getShowAlertChange=(input)=>{
    isShowAlert.value=input
    alertType.value=0
    alertDetail.value=''
    alertTime.value=2
}

// const
onMounted(()=>{
    validation.navigationTo()
    // email.value=validation.decrypt(params.email) 
})
</script>
<template>
    <BaseMenu/>
    <div class="wrapper_sign_up">
    <!-- this is SignUp (email): {{ params.email }} -->
        <div class="container_sign_up">
            <h4>
                Sign Up
            </h4>
            
            <div class="input_list">
                <!-- username -->
                <div class="input_item">
                    <h5 class="inportant_input">
                        Username
                    </h5>
                    <input :style="[userNS==true?'border-color:red;':'']" type="text"   maxlength="50" v-model="userN">
                    <h6>
                        You can only set a username once.
                    </h6>
                    <div v-show="userNS" class="wrapper_errorMsg">
                            <div >
                                <img src="../assets/icon/error_icon.png" alt="error_icon">
                                <p>
                                    {{ userNM }}
                                </p>
                            </div>
                        </div>
                </div>
                <!-- first name -->
                <div class="input_item">
                    <h5 class="inportant_input">
                        First name
                    </h5>
                    <input :style="[firstNS==true?'border-color:red;':'']" type="text"   maxlength="50" v-model="firstN">
                    <div v-show="firstNS" class="wrapper_errorMsg">
                        <div >
                            <img src="../assets/icon/error_icon.png" alt="error_icon">
                            <p>
                                {{ firstNM }}
                            </p>
                        </div>
                    </div>
                </div>
                <!-- last name -->
                <div class="input_item">
                    <h5 class="inportant_input">
                        Last name
                    </h5>
                    <input :style="[lastNS==true?'border-color:red;':'']" type="text"   maxlength="50" v-model="lastN">
                    <div v-show="lastNS" class="wrapper_errorMsg">
                        <div >
                            <img src="../assets/icon/error_icon.png" alt="error_icon">
                            <p>
                                {{ lastNM }}
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- email -->
                <div class="input_item">
                    <h5 class="inportant_input">
                        Email
                    </h5>
                    <input :style="[emailS==true?'border-color:red;':'']" type="email" placeholder="you@example.com" maxlength="100" v-model="email">
                    <div v-show="emailS" class="wrapper_errorMsg">
                        <div >
                            <img src="../assets/icon/error_icon.png" alt="error_icon">
                            <p>
                                {{ emailM }}
                            </p>
                        </div>
                    </div>
                </div>
                <!-- password -->
                <div class=" input_password">
                    <h5 class="inportant_input">
                        Password
                    </h5>
                    <label for="password_1">
                        <div :style="[passwordS==true?'border-color:red;':'']">
                            <input :type="showPassword" id="password_1" maxlength="20" v-model="password">
                            <button @click="showPasswordStatus=!showPasswordStatus">
                                <!-- <img src="../assets/icon/close_eye_icon.svg" alt="close_eye_icon"> -->
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.7302 5.07319C11.1449 5.02485 11.5685 5 12 5C16.664 5 20.3999 7.90264 22 12C21.6054 13.0104 21.0809 13.9482 20.4447 14.7877M6.51962 6.51944C4.47955 7.76406 2.90111 9.69259 2 12C3.60014 16.0974 7.33603 19 12 19C14.0376 19 15.898 18.446 17.4806 17.4804M9.87877 9.87859C9.33582 10.4215 9 11.1715 9 12C9 13.6569 10.3431 15 12 15C12.8285 15 13.5785 14.6642 14.1214 14.1212" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4 4L20 20" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </button>
                        </div>
                    </label>
                    <div v-show="passwordS" class="wrapper_errorMsg">
                        <div >
                            <img src="../assets/icon/error_icon.png" alt="error_icon">
                            <p>
                                {{ passwordM }}
                            </p>
                        </div>
                    </div>
                </div>
                <!-- confirm password -->
                <div class="input_password">
                    <h5 class="inportant_input">
                        Confirm password
                    </h5>
                    <label for="password_2">
                        <div :style="[confirmPS==true?'border-color:red;':'']">
                            <input :type="showPassword" id="password_2"  maxlength="20" v-model="confirmP">
                            <button @click="showPasswordStatus=!showPasswordStatus">
                                <!-- <img src="../assets/icon/close_eye_icon.svg" alt="close_eye_icon"> -->
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.7302 5.07319C11.1449 5.02485 11.5685 5 12 5C16.664 5 20.3999 7.90264 22 12C21.6054 13.0104 21.0809 13.9482 20.4447 14.7877M6.51962 6.51944C4.47955 7.76406 2.90111 9.69259 2 12C3.60014 16.0974 7.33603 19 12 19C14.0376 19 15.898 18.446 17.4806 17.4804M9.87877 9.87859C9.33582 10.4215 9 11.1715 9 12C9 13.6569 10.3431 15 12 15C12.8285 15 13.5785 14.6642 14.1214 14.1212" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4 4L20 20" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </button>
                        </div>
                    </label>
                    <div v-show="confirmPS" class="wrapper_errorMsg">
                        <div >
                            <img src="../assets/icon/error_icon.png" alt="error_icon">
                            <p>
                                {{ confirmPM }}
                            </p>
                        </div>
                    </div>
                </div>
                <!-- Phone Number -->
                <div class="input_item">
                    <h5 class="inportant_input">
                        Phone number
                    </h5>
                    <input :style="[phoneNumberS==true?'border-color:red;':'']" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" type="tel" placeholder="000-000-0000" maxlength="11" v-model="phoneNumber">
                    <div v-show="phoneNumberS" class="wrapper_errorMsg">
                        <div >
                            <img src="../assets/icon/error_icon.png" alt="error_icon">
                            <p>
                                {{ phoneNumberM }}
                            </p>
                        </div>
                    </div>   
                </div>
                           
            </div>
            
            <!-- Sign Up -->
            <div class="btn_msg">
                <button @click="signUp" class="sign_up_bt">
                    Sign Up
                </button>
                <div v-show="isShowE" class="wrapper_errorMsg">
                    <div>
                        <img src="../assets/icon/error_icon.png" alt="error_icon">
                        <p>
                            {{ errorMSG }}
                        </p>
                    </div>
                </div>  
            </div>
               
            <!-- other way -->
            <Another :-show-sign-up="false" />
            <BaseAlert name="gallery_detail_alert" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange"/>

        </div>
    </div>
    <BaseFooter/>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_sign_up{
    display: flex;
    width: auto;
    height: fit-content;
    padding: min(3.472dvw,50px) 0px ;
    background-color: #F5F5F5;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.container_sign_up{
    display: flex;
    width: min(28.889dvw,416px);
    height: fit-content;
    flex-direction: column;
    gap: min(1.111dvw,16px) 
}
.container_sign_up h4{
    width: inherit;
    height: min(2.5dvw,36px);
    font-size: min(1.667dvw,24px);
    text-align: center;
    font-weight: 700;
}
.input_list{
    display: flex;
    width: inherit;
    height: fit-content;
    flex-direction: column;
    gap: min(0.833dvw,12px);
}
.input_item{
    display: flex;
    width: inherit;
    height: fit-content;
    flex-direction: column;
    gap: min(0.278dvw,4px);
}
.input_item h6{
    width: inherit;
    height: min(1.389dvw,20px);
    font-weight: 400;
    font-size: min(0.972dvw,14px);
    color: #9e9e9e;
}
.input_item h5{
    font-size:min(1.111dvw,16px) ;
    font-weight: 500;
}
.input_item input{
    width: inherit;
    height: min(3.333dvw,48px);
    font-size: min(1.111dvw,16px);
    font-weight: 300;
    padding: min(0.833dvw,12px) min(1.389dvw,20px);
    border: min(0.069dvw,1px) solid #E0E0E0;
    border-radius: min(0.278dvw,4px);
}
.input_item input:hover {
    border: min(0.069dvw, 1px) solid #26AC34;
    background-color: #FFF;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
.input_item input:focus-within{
    border-color: #26AC34;
}
.input_password{
    display: flex;
    width: inherit;
    height: fit-content;
    flex-direction: column;
    gap: min(0.278dvw,4px);
}
.input_password h5{
    font-size: min(1.111dvw,16px);
    font-weight: 500;
}
.input_password label div{
    display: flex;
    width: inherit;
    height: min(3.333dvw,48px);
    border: min(0.069dvw,1px) solid #E0E0E0;
    background-color: #FFFFFF;
    border-radius: min(0.278dvw,4px);
    padding: min(0.833dvw,12px) min(1.389dvw,20px);;
    cursor: text;
}
.input_password label div:focus-within{
    /* outline: auto; */
    border: min(0.069dvw, 1px) solid #26AC34;
}
.input_password label div:hover {
    border: min(0.069dvw, 1px) solid #26AC34;
    background-color: #FFF;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
.input_password label div:hover svg path{
    stroke: #26AC34;
}
.input_password label div input{
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: min(1.111dvw,16px);
    font-weight: 300;
}
.input_password label div button{
    border: none;
    background-color: inherit;
    cursor: pointer;
}
.input_password label div button svg{
    width: min(1.667dvw,24px);
    height: min(1.667dvw,24px);
    
}
.btn_msg {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: min(0.278dvw,4px);
}
.sign_up_bt{
    display: flex;
    justify-content: center;
    align-items: center;
    /* width: inherit; */
    width: 100%;
    height: min(3.611dvw,52px);
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    font-size: min(1.25dvw,18px);
    font-weight: 500;
    line-height: 156%; /* 28.08px */
    letter-spacing: min(0.014dvw,0.2px);
    background-color: #26AC34;
    color: #FFFFFF;
    border: none;
    border-radius: min(0.278dvw,4px);
    cursor: pointer;
    box-shadow: 0px 1px 2px 0px #0000000D;
}
.sign_up_bt:hover {
    /* border: min(0.069dvw, 1px) solid #26AC34;
    color: #26AC34; */
    background-color: #168A22;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
.sign_up_bt:active{
    background-color: #58d264;
}

.wrapper_errorMsg{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    font-size: min(0.833dvw,12px);
    border-radius: min(0.278dvw,4px);
    background-color: rgba(245, 72, 74, 0.08);
    gap: min(0.556dvw,8px)
}
.wrapper_errorMsg div{
    display: flex;
    width: inherit;
    height: inherit;
    gap: min(0.278dvw,4px);
}
.wrapper_errorMsg div img{
    width: min(1.042dvw,15px);
    height: min(1.042dvw,15px);
}
.wrapper_errorMsg div p{
    width: 100%;
    font-size:min(0.833dvw,12px);
    font-style: normal;
    font-weight: 400;
    line-height: 136%; /* 16.32px */
    letter-spacing: 0.2px;
    color: #F75555;
    overflow: hidden;
    text-overflow: ellipsis;
}

@media (width<=744px){
    .wrapper_sign_up{
        padding:min(6.72dvw,50px) 0px ;
    }
    .container_sign_up{
        width: min(47.312dvw,352px);
        gap:  min(2.151dvw,16px);
    }
    .container_sign_up h4{
        height: min(4.839dvw,36px);
        font-size: min(3.226dvw,24px);
    }
    .input_list{
        gap: min(1.613dvw,12px);
    }
    .input_item{
        gap: min(0.538dvw,4px);
    }
    .input_item h5{
        height: min(3.226dvw,24px);
        font-size: min(2.151dvw,16px);
    }
    .input_item h6{
        height: min(2.688dvw,20px);
        font-size: min(1.882dvw,14px);
    }
    .input_item input{
        height: min(6.452dvw,48px);
        font-size: min(2.151dvw,16px);
        padding: min(1.613dvw,12px) min(2.688dvw,20px);
        border: min(0.134dvw,1px) solid #E0E0E0;
        border-radius: min(0.538dvw,4px);
    }
    .input_password{
        gap: min(0.538dvw,4px);
    }
    .input_password h5{
        font-size: min(2.151dvw,16px);
    }
    .input_password label div{
        height: min(6.452dvw,48px);
        border: min(0.134dvw,1px) solid #E0E0E0;
        border-radius: min(0.538dvw,4px);
        padding: min(1.613dvw,12px) min(2.688dvw,20px);
    }
    .input_password label div input{
        font-size: min(2.151dvw,16px);
    }
    .input_password label div button svg{
        width: min(3.226dvw,24px);
        height: min(3.226dvw,24px);
    }
    .btn_msg {
        gap: min(0.538dvw,4px);
    }
    .sign_up_bt{
        height: min(5.376dvw,40px);
        padding:min(1.075dvw,8px)  min(1.613dvw,12px);
        font-size: min(2.151dvw,16px);
        border-radius: min(0.538dvw,4px);
    }
    .wrapper_errorMsg{
        padding: min(1.075dvw,8px) min(1.613dvw,12px);
        font-size:min(1.613dvw,12px);
        border-radius:min(0.538dvw,4px);
        gap: min(1.075dvw,8px);
    }
    .wrapper_errorMsg div{
        gap: min(0.538dvw,4px);
    }
    .wrapper_errorMsg div img{
        width:min(2.016dvw,15px) ;
        height: min(2.016dvw,15px) ;
    }
    .wrapper_errorMsg div p{
        font-size: min(1.613dvw,12px);
    }
    
}
@media (width<=432px){
    .wrapper_sign_up{
        padding: min(10.638dvw,40px) 0px ;
    }
    .container_sign_up{
        width: min(91.489dvw,344px);
        gap: min(3.191dvw,12px);
    }
    .container_sign_up h4{
        height: min(7.447dvw,28px);
        font-size: min(4.787dvw,18px);
    }
    .input_list{
        gap: min(3.191dvw,12px);
    }
    .input_item{
        gap: min(1.064dvw,4px);
    }
    .input_item h5{
        height: min(5.319dvw,20px);
        font-size: min(3.723dvw,14px);
    }
    .input_item h6{
        height: min(4.255dvw,16px);
        font-size: min(3.191dvw,12px);
    }
    .input_item input{
        height: min(9.574dvw,36px);
        font-size: min(3.723dvw,14px);
        padding: min(2.128dvw,8px) min(3.191dvw,12px);
        border: min(0.266dvw,1px) solid #E0E0E0;
        border-radius: min(1.064dvw,4px);
    }
    .input_password{
        gap: min(1.064dvw,4px);
    }
    .input_password h5{
        font-size: min(3.723dvw,14px);
    }
    .input_password label div{
        height: min(9.574dvw,36px);
        border: min(0.266dvw,1px) solid #E0E0E0;
        border-radius: min(1.064dvw,4px);
        padding: min(2.128dvw,8px) min(3.191dvw,12px);
    }
    .input_password label div input{
        font-size: min(3.723dvw,14px);
    }
    .input_password label div button svg{
        width: min(5.319dvw,20px);
        height: min(5.319dvw,20px);
    }
    .btn_msg {
        gap: min(1.064dvw,4px);
    }
    .sign_up_bt{
        height: min(9.574dvw,36px);
        padding:min(2.128dvw,8px) min(3.191dvw,12px);
        font-size: min(3.723dvw,14px);
        border-radius:min(1.064dvw,4px);
    }
    .wrapper_errorMsg{
        padding: min(2.128dvw,8px) min(3.191dvw,12px);
        font-size: min(3.191dvw,12px);
        border-radius: min(1.064dvw,4px);
        gap: min(2.128dvw,8px);
    }
    .wrapper_errorMsg div{
        gap: min(1.064dvw,4px);
    }
    .wrapper_errorMsg div img{
        width:min(3.989dvw,15px) ;
        height: min(3.989dvw,15px) ;
    }
    .wrapper_errorMsg div p{
        font-size: min(3.191dvw,12px);
    }
}
</style>