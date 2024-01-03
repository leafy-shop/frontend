<script setup>
import { ref } from 'vue'
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
</script>
<template>
    <footer class="container_footer">
        <div class="register">
            <h3>
                BECOME A LEAFY
            </h3>
            <p>
                SIGN UP FOR INSPO & OFFERS IN YOUR INBOX
            </p>
            <div class="container_sign_up">
                <input v-model="email" type="text" placeholder="Enter your email address...">
                <button @click="console.log(email)">
                    SIGN UP
                </button>
            </div>
            <img src="../assets/home_p/home_footer_register.jpg" alt="background_img">
        </div>

        <div class="container_information">
            <div class="wrapper_information">
                <div class="service">
                    <h3>
                        customer service
                    </h3>
                    <button v-for="(service, index) of customerService" :key="index">{{ service.name }}</button>

                </div>

                <div class="information">
                    <h3>
                        information
                    </h3>
                    <button v-for="(info, index) of information" :key="index">{{ info.name }}</button>
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
            <img src="../assets/copylight.svg" alt="copylight_icon">
            <h4>
                2023 Leafy. All rights reserved.
            </h4>
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
    margin-top: 5 0px;
}

.register {
    width: auto;
    height: 204px;
    position: relative;
    padding: 40px 160px;
    display: flex;
    flex-direction: column;
    background-color: black;
    justify-content: center;
    overflow: hidden;
}

.register img {
    position: absolute;
    left: 0;
    top: 0px;
    width: 100%;
    height: auto;
    z-index: 1;
    opacity: 50%;
    /* background: linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url(<path-to-image>), lightgray 50% / cover no-repeat; */
}

.register h3 {
    font-size: 20px;
    color: #FFFFFF;
    z-index: 2;
}

.register p {
    margin: 15px 0px 15px 0px;
    color: #FFFFFF;
    z-index: 2;
}

.container_sign_up {
    z-index: 2;
}

.container_sign_up input {
    width: 280px;
    height: 30px;
    padding: 3px 5px 3px 5px;
    border-radius: 4px;
    /* outline: none; */
    border: none;
}

.container_sign_up button {
    width: 83px;
    height: 36px;
    border-radius: 4px;
    border: none;
    margin-left: 10px;
    cursor: pointer;
    background-color: green;
    color: white;
}

.container_information {
    width: auto;
    height: 264px;
}

.wrapper_information {
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 4%;
}

.wrapper_information div {
    width: 256px;
    height: 180px;
}

.service {
    display: flex;
    flex-direction: column;
}

.service h3 {
    margin-bottom: 10px;
    text-transform: uppercase;
    font-size: 12px;
}

.service button {
    width: fit-content;
    height: auto;
    border: none;
    padding: 5px;
    cursor: pointer;
    text-align: left;
    font-size: 12px;
    background-color: inherit;
}


.information {
    display: flex;
    flex-direction: column;
}

.information h3 {
    margin-bottom: 10px;
    text-transform: uppercase;
    font-size: 12px;
}

.information button {
    width: fit-content;
    height: auto;
    border: none;
    padding: 5px;
    cursor: pointer;
    text-align: left;
    font-size: 12px;
    background-color: inherit;
}

.container_business {
    display: flex;
    flex-direction: column;
}

.container_business h3 {
    text-transform: uppercase;
    font-size: 12px;
}

div>.payment {
    /* display: flex; */
    width: auto;
    height: 50%;
    /* flex-direction: column; */

}

div>.logistic {
    /* display: flex; */
    width: auto;
    height: 50%;
    /* flex-direction: column; */
}

div>.wrapper_payment {
    display: flex;
    width: auto;
    height: fit-content;
    margin: 10px 0px 10px 0px;
    align-items: center;
    /* justify-content: center; */
    gap: 10%;
}

.wrapper_payment button {
    width: 40px;
    height: fit-content;
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
    margin: 10px 0px 10px 0px;
    align-items: center;
    /* justify-content: center; */
    gap: 10%;
}

.wrapper_logistic button {
    width: 40px;
    height: fit-content;
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
}

.follow h3 {
    font-size: 12px;
    text-transform: uppercase;
}

.follow p {
    font-size: 12px;
    margin-top: 6%;
}

div>.wrapper_follow_link {
    display: flex;
    width: auto;
    height: fit-content;
    margin: 6% 0px auto 0px;
    gap: 10px;
}

.wrapper_follow_link button {
    border: none;
    cursor: pointer;
    background-color: inherit;
}

.wrapper_follow_link button img {
    width: 20px;
    height: 20px;
}

.copylight {
    display: flex;
    width: auto;
    height: 68px;
    padding: 24px 160px;
    justify-content: end;
    align-items: center;
    border-top: 1px solid;
    border-color: rgb(197, 197, 197);
    box-sizing: border-box;
}

.copylight img {
    width: 20px;
    height: 20px;
    margin: 3px;
}

.copylight h4 {
    font-size: 14px;
    font-weight: 500;
}

/* .copylight button{
    display: flex;
    width: 95px;
    height: 40px;
    margin: auto 10px auto 10px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: #26AC34;
    box-shadow: 0px 0px 10px 0px rgba(4, 6, 15, 0.20);
    border: none;

}
.copylight button img{
    width: 20px;
    height: 20px;
    
}
.copylight button span{
    margin: auto 5px auto 5px;
    color: white;
    font-size: 16px;
    text-transform: capitalize;
    font-weight: 500;
} */

@media (width <=744px) {
    .container_sign_up {
        z-index: 2;
    }

    .register {
        gap: 12px;
        align-self: stretch;
        padding: 20px 44px;
    }

    .register img {
        left: 0;
        top: 0;
    }

    .container_sign_up input {
        width: 280px;
        height: 30px;
        padding: 3px 5px;
        border-radius: 4px;
        /* outline: none; */
        border: none;
    }

    .container_sign_up button {
        width: 83px;
        height: 36px;
        border-radius: 4px;
        border: none;
        margin-left: 10px;
        cursor: pointer;
    }

    .container_information {
        width: auto;
        height: 264px;
    }

    .wrapper_information {
        width: auto;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 16px;
        padding: 0px 44px;
    }

    .wrapper_information div {
        width: 256px;
        height: 180px;
    }

    .service {
        display: flex;
        flex-direction: column;
    }

    .service h3 {
        margin-bottom: 10px;
        text-transform: uppercase;
        font-size: 10px;
    }

    .service button {
        width: fit-content;
        height: auto;
        border: none;
        padding: 5px;
        cursor: pointer;
        text-align: left;
        font-size: 10px;
        background-color: inherit;
    }

    .information {
        display: flex;
        flex-direction: column;
    }

    .information h3 {
        margin-bottom: 10px;
        text-transform: uppercase;
        font-size: 10px;
    }

    .information button {
        width: fit-content;
        height: auto;
        border: none;
        padding: 5px;
        cursor: pointer;
        text-align: left;
        font-size: 10px;
        background-color: inherit;
    }

    .container_business h3 {
        text-transform: uppercase;
        font-size: 10px;
    }

    div>.payment {
        width: auto;
        height: 50%;
    }

    div>.logistic {
        width: auto;
        height: 50%;
    }

    div>.wrapper_payment {
        display: flex;
        width: auto;
        height: fit-content;
        margin: 10px 0px 10px 0px;
        align-items: center;
        /* justify-content: center; */
        gap: 10%;
    }

    .wrapper_payment button {
        width: 40px;
        height: fit-content;
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
        margin: 10px 0px 10px 0px;
        align-items: center;
        /* justify-content: center; */
        gap: 10%;
    }

    .wrapper_logistic button {
        width: 40px;
        height: fit-content;
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
    }

    .follow h3 {
        font-size: 12px;
        text-transform: uppercase;
    }

    .follow p {
        font-size: 12px;
        margin-top: 6%;
    }

    div>.wrapper_follow_link {
        display: flex;
        width: auto;
        height: fit-content;
        margin: 6% 0px auto 0px;
        gap: 10px;
    }

    .wrapper_follow_link button {
        border: none;
        cursor: pointer;
        background-color: inherit;
    }

    .wrapper_follow_link button img {
        width: 20px;
        height: 20px;
    }

    .copylight {
        display: flex;
        width: auto;
        height: 68px;
        padding: 24px 160px;
        justify-content: end;
        align-items: center;
        border-top: 1px solid;
        border-color: rgb(197, 197, 197);
        box-sizing: border-box;
    }

    .copylight img {
        width: 20px;
        height: 20px;
        margin: 3px;
    }

    .copylight h4 {
        font-size: 14px;
        font-weight: 500;
    }
}

@media (width <=376px) {
    .register {
        align-items: center;
        gap: 12px;
        align-self: stretch;
        padding: 28px 16px;
    }

    .register img {
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
    }

    .register h3 {
        font-size: 20px;
        text-align: center;
    }

    .register p {
        font-size: 12px;
        margin: 0px;
        text-align: center;
    }

    .container_sign_up {
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        align-self: stretch;
    }

    .container_sign_up input {
        display: flex;
        width: 320px;
        padding: 4px 12px;
        align-items: center;
        align-self: stretch;
        margin: 0px;
    }

    .container_sign_up button {
        display: flex;
        width: 344px;
        padding: 4px 12px;
        align-items: center;
        align-self: stretch;
        justify-content: center;
        margin: auto;
        box-sizing: border-box;
    }

    .container_information {
        display: none;
        height: 0px;
    }

    .copylight {
        display: flex;
        height: auto;
        padding: 16px;
        justify-content: center;
        align-items: center;
        border-top: 1px solid;
        border-color: rgb(197, 197, 197);
        box-sizing: border-box;
    }

    .copylight img {
        width: 20px;
        height: 20px;
        margin: 3px;
    }

    .copylight h4 {
        font-size: 14px;
        font-weight: 500;
    }
}
</style>