<script setup>
import { ref ,onBeforeMount,onMounted} from 'vue'
import {useRouter} from 'vue-router'
import cookie from '../JS/cookie';
import validation from '../JS/validation'
const myRouter=useRouter()
const goSignUp=(email)=>myRouter.push({name:'SignUp',params:{email:validation.encrypt(email)}})
const email = ref('')
const customerService = [
    { name: "How To Buy", link: '' },
    { name: "How To Sell", link: '' },
    { name: "Payment Methods", link: '' },
    { name: "Shipping & Delivery", link: '' },
    { name: "Return & Refund", link: '' },
    { name: "Contact Us", link: '' }
]
const information = [
    { name: "About Us", link: '' },
    { name: "Leafy Policies", link: '' },
    { name: "Privacy Policy", link: '' },
    { name: "Cookies", link: '' },
    { name: "Terms & Conditions", link: '' }
]

const showSignUp=ref(true)
onMounted(()=>{
    let location =window.location.href.split('/')[4]
    if(location.includes('sign')){
        showSignUp.value=false
    }
})
onBeforeMount(()=>{
    showSignUp.value=cookie.checkKeyPass()==true?false:true
})
</script>
<template>
    <footer class="container_footer">
        <div v-show="showSignUp" class="wrapper_register">
            <div class="register">
                <h3>
                    BECOME A LEAFY
                </h3>
                <p>
                    SIGN UP FOR INSPO & OFFERS IN YOUR INBOX
                </p>
                <div class="container_sign_up">
                    <input v-model="email" type="text" placeholder="Enter your email address...">
                    <button @click="goSignUp(email)">
                        SIGN UP
                    </button>
                </div>
            </div>
            <img src="../assets/home_p/home_footer_register.jpg" alt="background_img">
        </div>
        <div class="container_information">
            <div class="wrapper_information">
                <div class="service">
                    <h3>
                        customer service
                    </h3>
                    <div>
                        <button v-for="(service, index) of customerService" :key="index">{{ service.name }}</button>
                    </div>

                </div>

                <div class="information">
                    <h3>
                        information
                    </h3>
                    <div>
                        <button v-for="(info, index) of information" :key="index">{{ info.name }}</button>
                    </div>
                </div>

                <div class="container_business">
                    <div class="payment">
                        <h3>
                            payment
                        </h3>
                        <div class="wrapper_payment">
                            <button>
                                <img src="../assets/icon/visa_icon.png" alt="visa_icon">
                            </button>
                            <button>
                                <img src="../assets/icon/master_card_icon.png" alt="master_card_icon">
                            </button>
                            <button>
                                <img src="../assets/icon/jcb_icon.png" alt="jcb_icon">
                            </button>
                            <button>
                                <img src="../assets/icon/cash_on_icon.png" alt="cash_on_icon">
                            </button>
                        </div>

                    </div>
                    <div class="logistic">
                        <h3>
                            logistics
                        </h3>
                        <div class="wrapper_logistic">
                            <button>
                                <img src="../assets/icon/thaipost_icon.png" alt="visa_icon">
                            </button>
                            <button>
                                <img src="../assets/icon/kerry_icon.png" alt="visa_icon">
                            </button>
                        </div>

                    </div>

                </div>

                <div class="follow">
                    <h3>
                        follow us
                    </h3>
                    <p>
                        We believe in the power of plants to lift the spirit, calm the mind and clean the air.
                    </p>
                    <p>
                        Leafy brings you the wellbeing benefits of greenery in style.
                    </p>
                    <div class="wrapper_follow_link">
                        <button>
                            <img src="../assets/icon/facebook.png" alt="facebook_icon">
                        </button>
                        <button>
                            <img src="../assets/icon/instagram.png" alt="instragram_icon">
                        </button>
                        <button>
                            <img src="../assets/icon/line.png" alt="line_icon">
                        </button>
                    </div>
                </div>
            </div>

        </div>
        <div class="copylight">
            <div>
                <h5>
                    Privacy Policy
                </h5>
                <svg xmlns="http://www.w3.org/2000/svg" width="3" height="2" viewBox="0 0 3 2" fill="none">
                    <circle cx="1.5" cy="1" r="1" fill="#9E9E9E"/>
                </svg>
                <h5>
                    Terms & Conditions
                </h5>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="5.99995" cy="5.99995" r="4.3" stroke="#616161"/>
                    <mask id="path-2-inside-1_2997_22034" fill="white">
                        <path d="M7.60372 7.12285C7.80384 7.26297 7.85491 7.5425 7.68048 7.71355C7.42712 7.96199 7.12044 8.1525 6.78146 8.26922C6.30224 8.43423 5.78309 8.44329 5.29841 8.29511C4.81372 8.14692 4.38839 7.8491 4.08337 7.44433C3.77835 7.03956 3.60931 6.54861 3.60046 6.04186C3.59162 5.53511 3.74343 5.03856 4.03413 4.62339C4.32484 4.20822 4.73952 3.89574 5.21873 3.73073C5.69795 3.56572 6.21711 3.55666 6.70179 3.70484C7.04463 3.80966 7.35778 3.98935 7.61965 4.2288C7.79994 4.39366 7.75866 4.6748 7.56356 4.82182C7.36845 4.96884 7.0936 4.92287 6.89665 4.77833C6.76017 4.67817 6.60703 4.60097 6.44314 4.55086C6.13711 4.4573 5.80933 4.46302 5.50676 4.56721C5.20418 4.67139 4.94236 4.86869 4.75881 5.13082C4.57527 5.39295 4.47942 5.70646 4.485 6.02642C4.49059 6.34638 4.59732 6.65635 4.7899 6.91192C4.98249 7.16749 5.25104 7.35553 5.55706 7.44909C5.86308 7.54265 6.19087 7.53693 6.49344 7.43275C6.65548 7.37695 6.80584 7.29445 6.93874 7.18958C7.13052 7.03826 7.40361 6.98272 7.60372 7.12285Z"/>
                    </mask>
                    <path d="M7.60372 7.12285C7.80384 7.26297 7.85491 7.5425 7.68048 7.71355C7.42712 7.96199 7.12044 8.1525 6.78146 8.26922C6.30224 8.43423 5.78309 8.44329 5.29841 8.29511C4.81372 8.14692 4.38839 7.8491 4.08337 7.44433C3.77835 7.03956 3.60931 6.54861 3.60046 6.04186C3.59162 5.53511 3.74343 5.03856 4.03413 4.62339C4.32484 4.20822 4.73952 3.89574 5.21873 3.73073C5.69795 3.56572 6.21711 3.55666 6.70179 3.70484C7.04463 3.80966 7.35778 3.98935 7.61965 4.2288C7.79994 4.39366 7.75866 4.6748 7.56356 4.82182C7.36845 4.96884 7.0936 4.92287 6.89665 4.77833C6.76017 4.67817 6.60703 4.60097 6.44314 4.55086C6.13711 4.4573 5.80933 4.46302 5.50676 4.56721C5.20418 4.67139 4.94236 4.86869 4.75881 5.13082C4.57527 5.39295 4.47942 5.70646 4.485 6.02642C4.49059 6.34638 4.59732 6.65635 4.7899 6.91192C4.98249 7.16749 5.25104 7.35553 5.55706 7.44909C5.86308 7.54265 6.19087 7.53693 6.49344 7.43275C6.65548 7.37695 6.80584 7.29445 6.93874 7.18958C7.13052 7.03826 7.40361 6.98272 7.60372 7.12285Z" stroke="#616161" stroke-width="2" mask="url(#path-2-inside-1_2997_22034)"/>
                </svg>                
                <h5>
                    2023 Leafy. All rights reserved.
                </h5>                
            </div>

            <!-- <button>
                <img src="../assets/vue.svg" alt="chat_icon">
                <span>chat</span>
            </button> -->
        </div>


    </footer>
</template>
<style scoped>
.container_footer {
    width: auto;
    height: fit-content;
    margin-top: min(0.347dvw,5px) 0px;
    background-color: #F5F5F5;
}
.wrapper_register{
    width: auto;
    /* height: min(14.167dvw,204px); */
    height: fit-content;

    display: flex;
    flex-direction: column;
    position: relative;
    background-color: black;
    justify-content: center;
    box-sizing: border-box;
    overflow: hidden;
    /* z-index: ; */
    box-sizing: border-box;

}
.register {
    display: flex;
    flex-direction: column;
    width: inherit;
    height: inherit;
    /* position: relative; */
    padding: min(2.778dvw,40px) min(11.111dvw,160px);
    gap: 16px;
    z-index: 2;
    box-sizing: border-box;
}

.wrapper_register img {
    position: absolute;
    left: 0;
    top:0;
    width: 100%;
    height: auto;
    z-index: 1;
    opacity: 100%;
    opacity: 50%;
    /* background: linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url(<path-to-image>), lightgray 50% / cover no-repeat; */
}

.register h3 {
    font-size: min(1.389dvw,20px);
    color: #FFFFFF;
    /* z-index: 2; */
}

.register p {
    font-size: min(1.111dvw,16px);
    /* margin: min(1.042dvw,15px) 0px; */
    color: #FFFFFF;
}

.container_sign_up {
    display: flex;
    height: fit-content;
    /* height: min(2.5dvw,36px); */
    gap: min(0.556dvw,8px);
}

.container_sign_up input {
    width: min(22.222dvw,320px);
    height: min(2.5dvw,36px);
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    border-radius: min(0.278dvw,4px);
    /* outline: none; */
    border: none;
    box-sizing: border-box;
    font-size: min(0.972dvw,14px);
}

.container_sign_up button {
    width: min(5.764dvw,83px);
    height: min(2.5dvw,36px);
    border-radius: min(0.278dvw,4px);
    border: none;
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    /* margin-left: min(0.694dvw,10px); */
    cursor: pointer;
    background-color: #26AC34;
    color: white;
    box-sizing: border-box;
    font-size: min(0.972dvw,14px);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}

.container_information {
    width: auto;
    height: min(18.056dvw,260px);
    padding: min(4.167dvw,60px) min(11.111dvw,160px);
    box-sizing: border-box;
    background-color: #EEE;
}

.wrapper_information {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: min(2.222dvw,32px);
}

.wrapper_information div {
    width: min(17.778dvw,256px);
    height: min(9.722dvw,140px);
}

.service {
    display: flex;
    flex-direction: column;
    gap: min(0.833dvw,12px);
}
.service div {
    display: flex;
    height: fit-content;
    flex-direction: column;
}
.service h3 {
    /* margin-bottom: 10px; */
    text-transform: uppercase;
    font-size: min(0.833dvw,12px);
}

.service div button {
    width: fit-content;
    height: fit-content;
    border: none;
    /* padding: 5px; */
    cursor: pointer;
    text-align: left;
    font-size: min(0.833dvw,12px);
    background-color: inherit;
    font-weight: 400;
    line-height: 136%; /* 16.32px */
    letter-spacing: min(0.014dvw,0.2px);
    color: #616161;
}


.information {
    display: flex;
    flex-direction: column;
    gap: min(0.833dvw,12px);
}
.information div{
    display: flex;
    height: fit-content;
    flex-direction: column;
}
.information h3 {
    /* margin-bottom: 10px; */
    text-transform: uppercase;
    font-size: min(0.833dvw,12px);
}

.information div button {
    width: fit-content;
    height: auto;
    border: none;
    /* padding: 5px; */
    cursor: pointer;
    text-align: left;
    font-size: min(0.833dvw,12px);
    background-color: inherit;
    font-weight: 400;
    line-height: 136%; /* 16.32px */
    letter-spacing: min(0.014dvw,0.2px);
    color: #616161;
}

.container_business {
    display: flex;
    flex-direction: column;
    gap: min(1.389dvw,20px);
}

.container_business h3 {
    text-transform: uppercase;
    font-size: min(0.833dvw,12px);
}

div>.payment {
    display: flex;
    width: fit-content;
    height: min(3.333dvw,48px);
    gap: min(0.833dvw,12px);
    flex-direction: column;

}

div>.logistic {
    display: flex;
    width: auto;
    height: min(3.333dvw,48px);
    gap: min(0.833dvw,12px);
    flex-direction: column;
}

div>.wrapper_payment {
    display: flex;
    width: auto;
    height: fit-content;
    /* margin: 10px 0px 10px 0px; */
    align-items: center;
    /* justify-content: center; */
    gap: 12px;
}

.wrapper_payment button {
    width: min(2.778dvw,40px);
    height: min(1.389dvw,20px);
    border: none;
    cursor: pointer;
    background-color: inherit;
}

.wrapper_payment button img {
    width: 100%;
    height: auto;
}

div>.wrapper_logistic {
    display: flex;
    width: auto;
    height: fit-content;
    /* margin: 10px 0px 10px 0px; */
    align-items: center;
    /* justify-content: center; */
    gap: min(0.833dvw,12px);
}

.wrapper_logistic button {
    width: min(2.778dvw,40px);
    height: min(1.389dvw,20px);
    border: none;
    cursor: pointer;
    background-color: inherit;
}

.wrapper_logistic button img {
    width: 100%;
    height: auto;
}

.follow {
    display: flex;
    flex-direction: column;
    gap: min(0.833dvw,12px);
}

.follow h3 {
    font-size:min(0.833dvw,12px);
    text-transform: uppercase;
}

.follow p {
    font-size: min(0.833dvw,12px);
    /* margin-top: 6%; */
    line-height: 136%; /* 16.32px */
    letter-spacing: min(0.014dvw,0.2px);  
    color: #616161;
}

div>.wrapper_follow_link {
    display: flex;
    width: auto;
    height: fit-content;
    /* margin: 6% 0px auto 0px; */
    gap: min(0.694dvw,10px);
}


.wrapper_follow_link button {
    border: none;
    cursor: pointer;
    background-color: inherit;
}

.wrapper_follow_link button img {
    width: min(1.389dvw,20px);
    height: min(1.389dvw,20px);
}

.copylight {
    display: flex;
    width: auto;
    height: min(4.722dvw,68px);
    padding: min(1.667dvw,24px) min(11.111dvw,160px);
    justify-content: end;
    align-items: center;
    border-top: min(0.069dvw,1px) solid;
    border-color: rgb(197, 197, 197);
    box-sizing: border-box;
    gap: min(0.278dvw,4px);
    justify-content: center;
}
.copylight div:nth-child(1){
    display: none;
}
.copylight div:nth-child(2){
        display: flex;
        gap: min(0.278dvw,4px);
    }

.copylight div:nth-child(2) svg {
    display: flex;
    width: min(1.389dvw,20px);
    height: min(1.389dvw,20px);
}

.copylight div h5 {
    display: flex;
    font-size: min(0.972dvw,14px);
    font-weight: 400;
    color: #616161;
    justify-content: center;
    align-items: center;
    
}


@media (width <=744px) {
    .wrapper_register{
        /* height: min(19.892dvw,148px); */
        height: fit-content;

    }
    .register {
        padding: min(2.688dvw,20px) min(5.914dvw,44px);
        gap: min(1.613dvw,12px);
    }


    .register h3 {
        font-size: min(2.419dvw,18px);

    }

    .register p {
        font-size: min(1.882dvw,14px);
    }

    .container_sign_up {
        display: flex;
        height: fit-content;
        /* height: min(4.839dvw,36px); */
        gap: min(1.075dvw,8px);
    }

    .container_sign_up input {
        width: min( 43.011dvw,320px);
        height: min( 4.839dvw,36px);
        padding: min( 4.839dvw,8px) min( 1.613dvw,12px);
        border-radius: min( 0.538dvw,4px);
        font-size: min( 1.882dvw,14px);
    }

    .container_sign_up button {
        width: min( 11.156dvw,83px);
        height: min( 4.839dvw,36px);
        border-radius: min( 0.538dvw,4px);
        padding: min( 1.075dvw,8px) min( 1.613dvw,12px);
        font-size: min( 1.882dvw,14px);
    }

    .container_information {
        width: auto;
        height: min(29.032dvw,216px);
        padding: min(5.376dvw,40px) min(5.914dvw,44px);

    }

    .wrapper_information {
        gap: min(2.151dvw,16px);
    }

    .wrapper_information div {
        width: min(20.43dvw,152px);
        height: min(18.28dvw,136px);
    }

    .service > h3, .service div button, 
    .information h3, .information div button  {
        font-size: min(1.344dvw,10px);
    }

    div>.wrapper_payment {
        display: grid;
        grid-template-columns: auto auto auto;
        height: fit-content;
        gap: min(1.075dvw,8px);
    }
    div>.wrapper_logistic{
        height: fit-content;
        gap: min(1.075dvw,8px);
    }
    .wrapper_payment button {
        width: min(5.376dvw,40px);
        height: min(2.688dvw,20px);

    }
    .wrapper_logistic button {
        width: min(5.376dvw,40px);
        height: min(2.688dvw,20px);

    }


    .follow h3, .follow p {
        font-size: min(1.344dvw,10px);
    }

    div>.wrapper_follow_link {
        height: fit-content;
        gap: min(1.075dvw,8px);
    }

    .wrapper_follow_link button img {
        width: min(2.016dvw,15px);
        height: min(2.016dvw,15px);
    }

    .copylight {
        height: min(6.452dvw,48px);
        padding: min(2.151dvw,16px) min(5.914dvw,44px);
    }
    .copylight div:nth-child(2){
        gap: min(0.538dvw,4px);
    }
    .copylight div:nth-child(2) svg{
        
        width: min(2.151dvw,16px);
        height: min(2.151dvw,16px);
    }

    .copylight div h5 {
        font-size: min(1.613dvw,12px);
        font-weight: 400;
        color: #616161;
    }
}

@media (width <=376px) {
    .wrapper_register{
        height: fit-content;
        /* height: min(47.872dvw,180px); */
    }
    .register {
        /* align-items: center; */
        gap: min(3.191dvw,12px);
        /* align-self: stretch; */
        padding: min(7.447dvw,28px) min(4.255dvw,16px);
        
    }
    .register h3 {
        font-size: min(4.255dvw,16px);
        text-align: center;
    }

    .register p {
        font-size: min(3.191dvw,12px);
        margin: 0px;
        text-align: center;
    }

    .container_sign_up {
        width: min(91.489dvw,344px);
        height: fit-content;
        /* height: min(15.957dvw,60px); */
        display: flex;
        flex-direction: column;
        gap: min(2.128dvw,8px);
    }

    .container_sign_up input {
        width: inherit;
        height: min(6.383dvw,24px);
        padding: min(1.064dvw,4px) min(2.128dvw,8px);
        font-size: min(3.191dvw,12px);
         border-radius: min(1.064dvw,4px);
    }

    .container_sign_up button {
        width: inherit;
        height: min(6.383dvw,24px);
        padding: min(1.064dvw,4px) min(2.128dvw,8px);
        font-size: min(3.723dvw,14px);
        border-radius: min(1.064dvw,4px);
    }

    .container_information {
        display: none;
    }

    .copylight {
        display: flex;
        flex-direction: column;
        width: auto;
        height: min(17.021dvw,64px);
        padding: min(1.064dvw,4px);
        gap: min(2.128dvw,8px);
        padding: min(4.255dvw,16px);
    }
    
    .copylight div:nth-child(2){
        gap: min(1.064dvw,4px);
    }
    .copylight div:nth-child(2) svg{
        width: min(3.191dvw,12px);
        height: min(3.191dvw,12px);
    }
    .copylight div:nth-child(1) {
        display: flex;
        flex-direction: row;
        gap: min(2.128dvw,8px);
    }
    .copylight div:nth-child(1) svg{
        margin: auto;
        width: min(0.532dvw,2px);
        height: min(0.532dvw,2px);
    }
    .copylight div h5 {
        font-size: min(2.66dvw,10px);
        font-weight: 400;
        color: #616161;
    }
}
</style>