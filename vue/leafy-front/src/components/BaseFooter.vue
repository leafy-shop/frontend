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
        <div class="wrapper_register">
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
    margin-top: min(0.347dvw,5px) 0px;
}
.wrapper_register{
    width: auto;
    height: min(14.167dvw,204px);
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
    height: min(2.5dvw,36px);
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
    background-color: green;
    color: white;
    box-sizing: border-box;
    font-size: min(0.972dvw,14px);
}

.container_information {
    width: auto;
    height: min(18.056dvw,260px);
    padding: min(4.167dvw,60px) min(11.111dvw,160px);
    box-sizing: border-box;
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

.copylight img {
    width: min(1.389dvw,20px);
    height: min(1.389dvw,20px);
}

.copylight h4 {
    font-size: min(0.972dvw,14px);
    font-weight: 500;
}


@media (width <=744px) {
    


    .wrapper_register{
        height: min(19.892dvw,148px);
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
        height: min(4.839dvw,36px);
        gap: min(1.075dvw,8px);
    }

    .container_sign_up input {
        width: min( 43.011dvw,320px);
        height: min( 4.839dvw,36px);
        padding: min( 4.839dvw,8px) min( 1.613dvw,12px);
        border-radius: 4px;
        font-size: min( 1.882dvw,14px);
    }

    .container_sign_up button {
        width: min( 11.156dvw,83px);
        height: min( 4.839dvw,36px);
        border-radius: min( 0.538vw,4px);
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

    .service h3, .service div button, 
    .information h3, .information button  {
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

    .copylight img {
        width: min(2.151dvw,16px);
        height: min(2.151dvw,16px);
    }

    .copylight h4 {
        font-size: min(1.613dvw,12px);
    }
}

@media (width <=376px) {
    .wrapper_register{
        height: min(47.872dvw,180px);
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
        height: min(15.957dvw,60px);
        display: flex;
        flex-direction: column;
        gap: min(2.128dvw,8px);
    }

    .container_sign_up input {
        width: inherit;
        height: min(6.383dvw,24px);
        padding: min(1.064dvw,4px) min(2.128dvw,8px);
        font-size: min(3.191dvw,12px);

    }

    .container_sign_up button {
        width: inherit;
        height: min(7.447dvw,28px);
        padding: min(1.064dvw,4px) min(2.128dvw,8px);
        font-size: min(3.723dvw,14px);
    }

    .container_information {
        display: none;
    }

    .copylight {
        padding: min(1.064dvw,4px);
    }

    .copylight img {
        width: min(3.191dvw,12px);
        height: min(3.191dvw,12px);
    }

    .copylight h4 {
        font-size: min(2.66dvw,10px);
        font-weight: 500;
    }
}
</style>