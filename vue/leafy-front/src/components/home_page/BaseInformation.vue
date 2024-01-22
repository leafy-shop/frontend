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
            <!-- <hr> -->
            <div class="hrLine"></div>
            <p>
                A beautiful house is as much about its surroundings as its bricks and mortar, something that the best garden designers all understand. We've completely updated our list of the finest of them all.
            </p>
            <button @click="goShop">
                Shop Collection
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.29279 14.7069C7.10532 14.5194 7 14.2651 7 13.9999C7 13.7348 7.10532 13.4804 7.29279 13.2929L10.5858 9.99992L7.29279 6.70692C7.11063 6.51832 7.00983 6.26571 7.01211 6.00352C7.01439 5.74132 7.11956 5.49051 7.30497 5.3051C7.49038 5.11969 7.74119 5.01452 8.00339 5.01224C8.26558 5.00997 8.51818 5.11076 8.70679 5.29292L12.7068 9.29292C12.8943 9.48045 12.9996 9.73475 12.9996 9.99992C12.9996 10.2651 12.8943 10.5194 12.7068 10.7069L8.70679 14.7069C8.51926 14.8944 8.26495 14.9997 7.99979 14.9997C7.73462 14.9997 7.48031 14.8944 7.29279 14.7069Z" fill="white"/>
                </svg>
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
    height: min(31.389dvw, 452px);
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
    gap: min(1.389dvw, 20px);
    align-items: flex-start;
    align-self: stretch;
    position: relative;
    box-sizing: border-box;
    width: inherit;
    height: inherit;
    padding: min(6.944dvw,100px) min(11.111dvw,160px);
    z-index: 3;
}
.information_perfect_plant h1{
    width: min(27.361dvw, 394px);
    height: min(5dvw, 72px);
    font-weight: 700;
    font-size: min(3.333dvw, 48px);
    /* margin:0px 0px 20px 0px; */
    /* text-justify: center; */
    line-height: 150%;
    color:#252525;
}
.information_perfect_plant p{
    /* display: flex; */
    font-size: min(1.111dvw, 16px);
    width: min(40dvw, 567px);
    height: min(5dvw, 72px);
    font-weight: 400;
    color:#252525;
}
.information_perfect_plant button {
    /* width: min(11.458dvw, 165px);
    height: min(2.778dvw, 40px); */
    border: min(0.069dvw, 1px) solid #26AC34;
    padding: min(0.556dvw, 8px) min(0.556dvw, 8px) min(0.556dvw, 8px) min(0.833dvw, 12px);
    font-weight: 500;
    background-color: #26AC34;
    color:white;
    cursor: pointer;
    font-size: min(1.111dvw, 16px);
    letter-spacing: min(0.014dvw, 0.2px);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: min(0.278dvw, 4px);
    border-radius: min(0.278dvw, 4px);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}

.information_perfect_plant button:hover{
    border: min(0.069dvw, 1px) solid #26AC34;
    color: #26AC34;
    background-color: #FFF;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
.information_perfect_plant svg{
    width: min(1.389dvw, 20px);
    height: min(1.389dvw, 20px);
}
.information_perfect_plant path:hover{
    fill: #26AC34;
}
.hrLine {
    width: min(6.667dvw, 96px);
    height: min(0.556dvw, 8px);
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
    width: auto;
    height: min(20.278dvw, 292px);
    box-sizing: border-box;
    display: flex;
    padding: min(1.389dvw, 20px) min(11.111dvw, 160px) min(2.778dvw, 40px) min(11.111dvw, 160px);
    flex-direction: column;
    align-items: center;
    gap: min(1.389dvw, 20px);
    align-self: stretch;
}
.information_life_greener h3{
    width: auto;
    height: min(5dvw, 72px);
    display: flex;
    padding: min(1.389dvw, 20px) 0px;
    justify-content: center;
    align-items: center;
    font-size: min(1.389dvw, 20px);
    text-transform: uppercase;
    border-bottom: min(0.069dvw, 1px) solid ;
    border-color: #E0E0E0;
    color:#252525;
    box-sizing: border-box;
    align-self: stretch;
    letter-spacing: min(0.017dvw, 0.24px);
}
.information_life_greener div{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* gap: 6px; */
    width:auto;
    height: min(8.333dvw, 120px);
    margin: auto;
    box-sizing: border-box;
    /* margin:20px auto 0px auto; */
}
.information_life_greener div p{
    text-align: center;
    font-size: min(1.111dvw, 16px);
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: min(0.014dvw, 0.2px);
}

@media (width <= 744px){
    .container_information{
        width: auto;
        height: min(41.398dvw, 308px);
    }
    .information_perfect_plant{
        display: flex;
        flex-direction: column;
        gap: min(1.111dvw, 16px);
        padding: min(5.376dvw, 40px) min(5.914dvw, 44px);
    }
    .information_perfect_plant h1{
        width: min(47.849dvw, 356px);
        height: min(8.065dvw, 60px);
        font-size: min(5.376dvw, 40px);
    }
    .information_perfect_plant p{
        width: min(47.849dvw, 356px);
        height: min(10.753dvw, 80px);
        font-size: min(1.882dvw, 14px);
    }
    .hrLine {
        width: min(6.667dvw, 96px);
        height: min(0.538dvw, 4px);
        background-color: #252525;
        box-sizing: border-box;
    }
    .information_perfect_plant button{
        width: min(19.624dvw, 146px);
        height: min(4.839dvw, 36px);
        font-size: min(1.882dvw, 14px);
        border-radius: min(0.538dvw, 4px);
        padding: min(1.075dvw, 8px) min(1.075dvw, 8px) min(1.075dvw, 8px) min(1.613dvw, 12px);
    }
    .information_perfect_plant svg{
        width: min(2.151dvw, 16px);
        height: min(2.151dvw, 16px);
    }
    .information_perfect_plant path:hover{
        fill: #26AC34;
    }
    .info_image{
        width: auto;
        height: 100%;
        right: 0;
        bottom: 0;
    }

    .information_life_greener{
        height: min(31.72dvw, 236px);
        padding: min(2.688dvw, 20px) min(5.914dvw, 44px) min(5.376dvw, 40px) min(5.914dvw, 44px);
        gap: min(2.151dvw, 16px);
    }
    .information_life_greener h3{
        width: inherit;
        height: min(8.065dvw, 60px);
        font-size: min(2.419dvw, 18px);
        padding: min(1.111dvw, 16px) 0px;
        letter-spacing: min(0.027dvw, 0.2px);
    }
    .information_life_greener div{
        width: inherit;
        height: min(13.441dvw, 100px);
    }
    .information_life_greener div p{
        font-size: min(1.882dvw, 14px);
        letter-spacing: min(0.027dvw, 0.2px);
    }
}

@media (width<=376px){
    .container_information{
        width: auto;
        height: min(60.106dvw, 226px);
        background-color: #E7E8E3;
    }
    .information_perfect_plant{
        padding: min(7.447dvw, 28px) min(4.255dvw, 16px);
        gap: min(2.128dvw, 8px);
    }
    .information_perfect_plant h1{
        width: min(77.66dvw, 292px);
        height: min(9.574dvw, 36px);
        font-size: min(6.383dvw, 24px);
    }
    .hrLine {
        width: min(12.766dvw, 48px);
        height: min(0.532dvw, 2px);
        background-color: #252525;
        box-sizing: border-box;
    }
    .information_perfect_plant p{
        width: min(77.66dvw, 292px);
        height: min(17.021dvw, 64px);
        font-size: min(3.192dvw, 12px);
    }
    .information_perfect_plant button{
        width: min(35.106dvw, 132px);
        height: min(8.511dvw, 32px);
        font-size: min(3.191dvw, 12px);
        border-radius: min(1.064dvw, 4px);
        padding: min(2.128dvw, 8px) min(2.128dvw, 8px) min(2.128dvw, 8px) min(3.191dvw, 12px);
    }
    .information_perfect_plant svg{
        width: min(4.255dvw, 16px);
        height: min(4.255dvw, 16px);
    }
    .information_perfect_plant path:hover{
        fill: #26AC34;
    }
    .info_image{
        width: inherit;
        right: 0;
        bottom: 0;
    }
    .information_life_greener{
        height: min(50dvw, 188px);
        padding: min(3.191dvw, 12px) min(4.255dvw, 16px) min(6.383dvw, 24px) min(4.255dvw, 16px);
        gap: min(3.191dvw, 12px);
    }
    .information_life_greener h3{
        height: min(11.702dvw, 44px);
        padding: min(3.191dvw, 12px) 0px;
        font-size: min(3.723dvw, 14px);
        letter-spacing: min(0.053dvw, 0.2px);
    }
    .information_life_greener div{
        height: min(29.787dvw, 112px);
        /* margin: 0px; */
    }
    .information_life_greener div p{
        font-size: min(3.192dvw, 12px);
        line-height: 136%; /* 16.32px */
        letter-spacing: min(0.053dvw, 0.2px);
    }
}
</style>
