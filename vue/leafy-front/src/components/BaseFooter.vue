<script setup>
import{ref} from 'vue'
const email =ref('')
const customerService=[
    {name:"How To Buy",link:''},
    {name:"How To Sell",link:''},
    {name:"Payment Methods",link:''},
    {name:"Shipping & Delivery",link:''},
    {name:"Return & Refund",link:''},
    {name:"Contact Us",link:''}
]
</script>
<template>
    <footer class="container_footer">
        <div class="register">
            <img src="../assets/vue.svg" alt="background_img">
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

        <div class="container_information">
            <div class="wrapper_information">
                <div class="service">
                    <h3>
                        CUSTOMER SERVICE
                    </h3>
                    <button v-for="(service,index) of customerService" :key="index">{{ service.name }}</button>   

                </div>
                <div class="information">

                </div>
            </div>
        </div>

    </footer>
</template>
<style scoped>
.container_footer{
    width: auto;
    height:fit-content;
    margin-top:5 0px;
}
.register{
    width:auto;
    height:204px;
    position: relative;
    padding: 0% 10% 0% 10%;
    display:flex;
    flex-direction: column;
    background-color: green;
    justify-content: center;
    overflow:hidden;
}
.register img{
    position:absolute;
    left:0;
    width:100%;
    height:100%;
    z-index: 1;
}
.register h3{
    font-size: 20px;
    color:#FFFFFF;
    z-index: 2;
}
.register p{
    margin: 15px 0px 15px 0px;
    color:#FFFFFF;
    z-index: 2;
}
.container_sign_up input{
    width:280px;
    height: 30px;
    padding:3px 5px 3px 5px;
    border-radius: 4px;
    /* outline: none; */
    border:none;
}
.container_sign_up button{
    width:83px;
    height:36px;
    border-radius: 4px;
    border:none;
    margin-left: 10px;
}

.container_information{
    width:auto;
    height:264px;
}
.wrapper_information{
    width:auto;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.wrapper_information div{
    width:256px;
    height:fit-content;
}
.service{
    display: flex;
    flex-direction: column;
    
}
.service h3{
    margin-bottom: 10px;
}
.service button{
    width:fit-content;
    height: auto;
    border:none;
    padding: 5px;
    cursor: pointer;
    text-align: left;
}
</style>