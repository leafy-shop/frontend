<script setup>
import { useRouter } from 'vue-router';
const myRouter=useRouter()
const goShop=(searchValue="hello this search")=>myRouter.push({name:"Shop",params:{search:searchValue}})
</script>
<template>
    <div class="wrapper_plant_inspo">
        <h3>
            PLANT INSPO
        </h3>
        <div class="overflow_plant_inspo">
            <div class="container_plant_inspo">
                <div class="plant_type">
                    <img src="../../assets/home_p/home_plant_style_tall.png" alt="larg_tall_img">
                    <h4>
                        Large & Tall Plants
                    </h4>
                    <p>
                        Floor standing plants for instant wellbeing greenery. Choose from elegant indoor palms, stylish fiddle leaf figs and beautiful indoor trees.
                    </p>
                    <button @click="goShop('larg plant')">
                        Shop
                    </button>
                </div>
                <div class="plant_type">
                    <img src="../../assets/home_p/home_plant_style_hanging.png" alt="larg_tall_img">
                    <h4>
                        Trailing & Hanging Plants
                    </h4>
                    <p>
                        Create a sanctuary of lush green trails with Golden Pothos plants or add some romance with the leaves of a Philodendron Sweetheart indoor plant.
                    </p>
                    <button @click="goShop('hanging Plant')">
                        Shop
                    </button>
                </div>
                <div class="plant_type">
                    <img src="../../assets/home_p/home_plant_style_house.png" alt="larg_tall_img">
                    <h4>
                        Easy Care Houseplants
                    </h4>
                    <p>
                        Choose from the sculpted good looks of Sansevieria houseplants to rugged and resilient indoor Yucca plants or relax with on trend ZZ houseplants.
                    </p>
                    <button @click="goShop('house Plant')">
                        Shop
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.wrapper_plant_inspo{
    display: flex;
    width: 100%;
    /* height: 688px; */
    height: fit-content;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    background-color: #F5F5F5;
    padding: min(2.778dvw, 40px) min(11.111dvw, 160px);
    gap: min(1.389dvw, 20px);
    align-items: center;
}

.wrapper_plant_inspo h3{
    /* width: min(77.778dvw, 1120px); */
    width: auto;
    /* height:  min(4.167dvw, 60px); */
    height: fit-content;
    text-align: center;
    font-size:  min(1.667dvw, 24px);
    padding-bottom: min(0.833dvw, 12px);
    /* margin: 0px auto 0px auto; */
    text-transform: capitalize;
    box-sizing: border-box;
    border-bottom: min(0.069dvw, 1px) solid #E0E0E0;
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    color:#252525;
    align-self: stretch;
}
.container_plant_inspo{
    display: flex;
    /* width: fit-content; */
    height: fit-content;
    width: min(77.778dvw, 1120px);
    flex-direction: row;
    justify-content: left;
    align-items: center;
    /* margin-top: 20px; */
    gap: min(2.222dvw, 32px);
}
.plant_type{
    display: flex;
    width: min(24.444dvw, 352px);
    height: min(36.667dvw, 528px);
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
}
.plant_type img{
    width: min(24.444dvw, 352px);
    height: min(25dvw, 360px);
    border-radius: min(0.556dvw, 8px);
}
.plant_type h4{
    font-size:  min(1.25dvw, 18px);
    margin-top:  min(1.389dvw, 20px);
}
.plant_type p{
    width: inherit;
    height: fit-content;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 150%; 
    letter-spacing: min(0.014dvw, 0.2px);
    font-size: min(1.111dvw, 16px);
    color: #212121;
    margin-top: min(0.278dvw, 4px);
}

.plant_type button{
    width: min(4.444dvw, 64px);
    height: min(2.5dvw, 36px);
    margin-top: min(1.111dvw, 16px);
    font-size: min(0.972dvw, 14px);
    font-weight: 500;
    line-height: 144%; /* 20.16px */
    letter-spacing: min(0.014dvw, 0.2px);
    padding: min(0.556dvw, 8px) min(0.833dvw, 12px);
    border: min(0.069dvw, 1px) solid;
    border-color: #E0E0E0;
    border-radius: min(0.278dvw, 4px);
    background-color: #FFFFFF;
    box-sizing: border-box;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.plant_type button:hover {
    color: #26AC34;
    background: #fff;
    border-color: #26AC34;
}

@media (width<=744px){
    .wrapper_plant_inspo{
        padding: min(2.688dvw, 20px) min(5.914dvw, 44px);
        gap: min(2.151dvw, 16px);
    }
    .wrapper_plant_inspo h3{
        /* height: min(6.452dvw, 48px); */
        font-size: min(2.688dvw, 20px);
        padding: min(1.075dvw, 8px) 0px;
        letter-spacing: min(0.032dvw, 0.24px);
    }
    .container_plant_inspo{
        /* height: fit-content; */
        width: min(88.172dvw, 656px);
        gap: min(2.151dvw, 16px);
    }
    .plant_type{
        width: min(27.957dvw, 208px);
        /* height: min(57.527dvw, 428px); */
        height: fit-content;
        /* gap: min(1.613dvw, 12px); */
    }
    .plant_type img{
        width: min(27.967dvw, 208px);
        height: min(37.634dvw, 280px);
        border-radius: min(1.075dvw, 8px);
    }
    .plant_type h4 {
        /* margin-top: min(2.151dvw, 16px); */
        font-size: min(1.882dvw, 14px);
        margin-top: min(1.613dvw, 12px);
    }
    .plant_type p{
        font-size: min(1.882dvw, 14px);
        margin-top: min(0.537dvw, 4px);
    }
    /* .plant_type button{
        margin-top: min(1.613dvw, 12px);
    } */
    .plant_type button{
        margin-top: min(1.613dvw, 12px);
        width: min(7.93dvw, 59px);
        height: min(4.301dvw, 32px);
        font-size: min(1.613dvw, 12px);
        padding: min(1.075dvw, 8px) min(1.613dvw, 12px);
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
        border-radius: min(0.537dvw, 4px);
    }
}

@media (width<=376px){
    .wrapper_plant_inspo{
        padding: min(6.383dvw, 24px) min(4.255dvw, 16px) min(7.713dvw, 28px) min(4.255dvw, 16px);
        gap: min(2.128dvw, 8px);
        /* display: flex; */
    }
    .wrapper_plant_inspo h3{
        /* height: min(7.447dvw, 28px); */
        font-size: min(3.723dvw, 14px);
        padding: min(1.064dvw, 4px) 0px;
        letter-spacing: min(0.053dvw, 0.2px);
    }
    .container_plant_inspo{
        gap: min(2.128dvw, 8px);
    }
    .overflow_plant_inspo{
        overflow-x: auto;
    }
    .plant_type{
        width: min(44.681vw, 168px);
        height: fit-content;
        flex-grow: none;
    }
    .plant_type p{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        /* height: 72px; */
        overflow: hidden;
        font-size: min(3.191dvw, 12px);
        margin-top: min(1.064dvw, 4px);
    }
    .plant_type img{
        width: min(44.681dvw, 168px);
        height: min(58.511dvw, 220px);
        border-radius: min(1.064dvw, 4px);
    }
    .plant_type h4 {
        margin-top: min(2.128dvw, 8px);
        font-size: min(3.191dvw, 12px);
    }
    .plant_type button{
        margin-top: min(2.128dvw, 8px);
        /* width: min(15.691dvw, 59px); */
        width: fit-content;
        height: min(6.383dvw, 24px);
        font-size: min(3.191dvw, 12px);
        padding: min(1.064dvw, 4px) min(2.128dvw, 8px);
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
        border-radius: min(1.064dvw, 4px);
    }
}
</style>