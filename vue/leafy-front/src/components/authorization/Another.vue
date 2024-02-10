<script setup>
import {useRouter} from 'vue-router'
const props =defineProps({
    ShowSignUp:{
        type:Boolean,
        default:true,
        require:true
    }
})
const myRouter =useRouter()
const goSignUp=()=>myRouter.push({name:'SignUp'})
const goSignIn=()=>myRouter.push({name:'SignIn'})
</script>
<template>
    <div class="wrapper_other_login">
        <h4>
            or
        </h4>
        <div class="other_login">
            <button>
                <img src="../../assets/icon/google.png" alt="google">
            </button>
            <button>
                <img src="../../assets/icon/facebook_color.png" alt="facebook">
            </button>
        </div>
    </div>
    <div v-if="ShowSignUp" class="account_operation">
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
    </div>
    <div v-else class="account_operation">
        <div>
            <h4>
                Already have an account?
            </h4>
        </div>
        <hr>
        <button @click="goSignIn">
            <h4>
                Sign In
            </h4>
        </button>
    </div>
</template>
<style scoped>
.wrapper_other_login{
    display: flex;
    width: auto;
    height: fit-content;
    flex-direction: column;
    gap: min(0.833dvw,12px);
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
    height: fit-content;
    gap: min(1.111dvw,16px);
}
.other_login button{
    display: flex;
    width: min(13.889dvw,200px);
    height: min(3.611dvw,52px);
    flex-grow: 1;
    border: 0px;
    justify-content: center;
    align-items: center;
    border-radius: min(0.278dvw,4px);
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
.account_operation button{
    border: 0px;
    cursor: pointer;
    background-color: inherit;
    
}
.account_operation div h4 span{
    text-decoration: underline;
}
.account_operation button:hover h4{
    text-decoration: underline;
    text-decoration-color: #26AC34;
}
.account_operation div h4{
    color: #757575;
    font-style: normal;
    font-weight: 400;
    font-size: min(0.972dvw,14px);

}
.account_operation button h4{
    color: #26AC34;
    font-size: min(0.972dvw,14px);
    font-weight: 700;
    line-height: 144%; /* 20.16px */
    letter-spacing: min(0.014dvw,0.2px);
}
@media (width <=744px){
     
    .wrapper_other_login h4{
        height: min(2.688dvw,20px);
        font-size: min(1.882dvw,14px);
    }
    .other_login button{
        width: min(26.882dvw,200px);
        height: min(6.989dvw,52px);
    }
    .other_login button img{
        width: min(3.763dvw,28px);
        height: min(3.763dvw,28px);
    }
    .account_operation{
        height: min(2.688dvw,20px);
        gap: min(2.151dvw,16px);
    }
    .account_operation div h4, 
    .account_operation button h4{
        font-size: min(1.882dvw,14px);
    }
}
@media (width <=376px){
    .wrapper_other_login h4{
        height: min(5.319dvw,20px);
        font-size: min(3.723dvw,14px);
    }
    .other_login{
        height: min(10.638dvw,40px);
        gap: min(4.255dvw,16px);
    }
    .other_login button{
        width: min(43.617dvw,164px);
        height:  min(10.638dvw,40px);
    }
    .other_login button img{
        width:  min(6.383dvw,24px);
        height:  min(6.383dvw,24px);
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