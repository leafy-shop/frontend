<script setup>
import { useRouter } from 'vue-router';
const myRouter=useRouter()
const goShop=()=>myRouter.push({name:'Shop'})
</script>
<template>
    <div class="container_information">
        <div class="information_perfect_plant">
            <h1>
                Perfect Plant
            </h1>
            <hr>
            <p>
                A beautiful house is as much about its surroundings as its bricks and mortar, something that the best garden designers all understand. We've completely updated our list of the finest of them all.
            </p>
            <button @click="goShop">
                Shop Collection >
            </button>
        </div>
        <img class="info_image" src="../../assets/home_p/home_information.jpg" alt="info_image">
    </div>
    <div class="information_life_greener">
        <h3>
            make life greener
        </h3>
        <div >
            <p>
                "Look deep into nature and then you will understand everything better."
            </p><br>
            <p>~ Albert Einstein ~</p><br>
            <p>
                We believe in the power of plants to lift the spirit, calm the mind and clean the air.
            </p>            
        </div>
        
        
    </div>
</template>
<style scoped>
*{
    font-size: 16px;
    margin:0;
}
.container_information{
    width:auto;
    height:452px;
    position:relative;
    background-color: rgb(167, 167, 167);
    overflow: hidden;

}
/* .container_information img{
    width: 100%;
    height: auto;
} */
.information_perfect_plant{
    /* position:absolute; */
    position:relative;
    box-sizing: border-box;
    width:100%;
    height:100%;
    padding:100px 160px;
    /* left:180px;
    top:100px; */
    z-index: 3;
    /* background-color: white; */
}
.information_perfect_plant h1{
    width: 394px;
    height: 72px;
    font-weight: 700;
    font-size: 48px;
    /* margin:0px 0px 20px 0px; */
    /* text-justify: center; */
    line-height: 150%;
    color:#252525;
}
.information_perfect_plant p{
    width: 576px;
    color:#252525;
}
.information_perfect_plant button{
    width:165px;
    height:40px;
    margin-top:18px;
    border:none;
    border-radius: 8px;
    font-weight: 500;
    background-color: #26AC34;
    color:white;
    cursor: pointer;

}
.information_perfect_plant button:hover{
    background-color: gray;
}
hr{
    width:96px;
    height:8px;
    margin: 20px 0px;
    background-color: #252525;
    
}
.info_image{
    position: absolute;
    width: 100%;
    height: auto;
    top: -300px;
    left: 0;
    z-index: 1;
}

.information_life_greener{
    width:auto;
    height:292px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding:40px 160px ; 
}
.information_life_greener h3{
    width:1120px;
    height:32px;
    display: flex;
    margin: 20px auto ;
    justify-content: center;
    font-size: 20px;
    text-transform: uppercase;
    border-bottom: 1px solid ;
    border-color: #E0E0E0;
    color:#252525;
    
}
.information_life_greener div{
    width:1120px;
    height: 120px;
    margin:20px auto 0px auto;
    
}
.information_life_greener div p{
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: 0.2px;
}
</style>
