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
        <img class="info_image" src="../../assets/home_p/home_information.png" alt="info_image">
    </div>
    <div class="information_life_greener">
        <h3>
            make life greener
        </h3>
        <div >
            <p>
                "Look deep into nature and then you will understand everything better."
            </p>
            <p>~ Albert Einstein ~</p>
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
    /* background-color: rgb(167, 167, 167); */
    overflow: hidden;
    background-color: #EAE9E5;
    background-image: linear-gradient(#EAE9E5,#E7E8E3);
}
/* .container_information img{
    width: 100%;
    height: auto;
} */
.information_perfect_plant{
    display: flex;
    flex-direction: column;
    gap: 20px;

    position:relative;
    box-sizing: border-box;
    width:inherit;
    height:inherit;
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
    /* display: flex; */
    width: 576px;
    height: 72px;
    font-weight: 400;
    color:#252525;
}
.information_perfect_plant button{
    width:165px;
    height:40px;
    /* margin-top:18px; */
    border:none;
    padding: 8px 8px 8px 12px;
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
    background-color: #252525;
    box-sizing: border-box;
}
.info_image{
    position: absolute;
    width: auto;
    height: 100%;
    /* top: -300px; */
    /* right: 0; */
    right: 0;
    top: 0;
    z-index: 1;
}

.information_life_greener{
    width:auto;
    height:292px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding:40px 160px ; 
    gap: 20px;
}
.information_life_greener h3{
    width:inherit;
    height:72px;
    display: flex;
    padding: 20px 0px;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    text-transform: uppercase;
    border-bottom: 1px solid ;
    border-color: #E0E0E0;
    color:#252525;
    box-sizing: border-box;
}
.information_life_greener div{
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    /* gap: 6px; */
    width:auto;
    height: 120px;
    margin: auto;
    box-sizing: border-box;
    /* margin:20px auto 0px auto; */
    
}
.information_life_greener div p{
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: 0.2px;
}

@media (width <= 744px){
    .container_information{
        width: auto;
        height: 308px;
    }
    .information_perfect_plant{
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 40px 44px;
        
    }
    .information_perfect_plant h1{
        width: 356px;
        height: 60px;
        font-size: 40px;
    }
    .information_perfect_plant p{
        width: 356px;
        height: 80px;
        font-size: 14px;
    }
    hr{
        width: 96px;
        height: 4px;
    }
    .information_perfect_plant button{
        width: 146px;
        height: 36px;
        font-size: 14px;
    }
    .info_image{
        width: auto;
        height: 100%;
        right: 0;
        bottom: 0;
    }

    .information_life_greener{
        height: 236px;
        padding: 20px 44px;
    }
    .information_life_greener h3{
        width: inherit;
        height: 60px;
        font-size: 18px;
        padding: 16px 0px;
    }
    .information_life_greener div{
        width: inherit;
        height: 100px;
    }
    .information_life_greener div p{
        font-size: 14px;
    }
}

@media (width<=376px){
    .container_information{
        width: auto;
        height: 226px;
        background-color: #E7E8E3;
    }
    .information_perfect_plant{
        padding: 28px 16px;
        gap: 8px;
    }
    .information_perfect_plant h1{
        width: 292px;
        height: 36px;
        font-size: 24px;
    }
    hr{
        width: 48px;
        height: 2px;
        /* margin: 8px 0px 8px 8px; */
    }
    .information_perfect_plant p{
        width: 292px;
        height: 64px;
        font-size: 12px;
    }
    .information_perfect_plant button{
        height: 32px;
        margin-top: 12px;
    }
    .info_image{
        width: inherit;
        right: 0;
        bottom: 0;
    }
    .information_life_greener{
        height: 188px;
        padding: 20px 16px;
        gap: 8px;
    }
    .information_life_greener h3{
        height: 20px;
        padding: 0px 0px 8px 0px;
        font-size: 14px;
    }
    .information_life_greener div{
        height: 112px;
        margin: 0px;
    }
    .information_life_greener div p{
        font-size: 12px;
        line-height: 136%; /* 16.32px */
        letter-spacing: 0.2px;
    }
}
</style>
