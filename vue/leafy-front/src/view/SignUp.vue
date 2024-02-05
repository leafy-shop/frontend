<script setup>
import {useRoute} from 'vue-router'
import {ref,onMounted,computed} from 'vue'
import BaseMenu from '../components/BaseMenu.vue';
import BaseFooter from '../components/BaseFooter.vue';
import Another from '../components/authorization/Another.vue';
import validation from '../JS/validation'
const {params}=useRoute()

const firstN=ref('')
const lastN=ref('')
const email =ref('')
const password=ref('')
const confirmP=ref('')
const phoneNumber=ref('')

// eye icon
const showPasswordStatus=ref(false)
const showPassword=computed(()=>{
    let returnType = showPasswordStatus.value===true?'text':'password'  
    return returnType
})
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
            <!-- first name -->
            <div class="input_item">
                <h5>
                    First Name
                </h5>
                <input type="text" v-model="firstN">
            </div>
            <!-- last name -->
            <div class="input_item">
                <h5>
                    Last Name
                </h5>
                <input type="text" v-model="lastN">
            </div>
            <!-- email -->
            <div class="input_item">
                <h5>
                    Email
                </h5>
                <input type="email" v-model="email">
            </div>
            <!-- password -->
            <div class="input_item input_password">
                <h5>
                    Password
                </h5>
                <div>
                    <input :type="showPassword"  v-model="password">
                    <button @click="showPasswordStatus=!showPasswordStatus">
                        <img src="../assets/icon/close_eye_icon.svg" alt="close_eye_icon">
                        
                    </button>
                </div>
            </div>
            <!-- confirm password -->
            <div class="input_item input_password">
                <h5>
                    Confirm Password
                </h5>
                <div>
                    <input :type="showPassword" v-model="confirmP">
                    <button @click="showPasswordStatus=!showPasswordStatus">
                        <img src="../assets/icon/close_eye_icon.svg" alt="close_eye_icon">
                    </button>
                </div>
            </div>
            <!-- Phone Number -->
            <div class="input_item">
                <h5>
                    Phone Number
                </h5>
                <input type="text" v-model="phoneNumber">
            </div>
            <!-- Sign Up -->
            <button>
                Sign Up
            </button>
            <!-- other way -->
            <Another/>
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
    padding: min(6.944dvw,100px) 0px min(20.833dvw,300px) 0px;
    background-color: #F5F5F5;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.container_sign_up{
    width: 416px;
    height: 760px;
}

.input_password div{
    display: flex;
}

</style>