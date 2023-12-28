<script setup>

</script>
<template>
    <div class="wrapper_plant_inspo">
        <h3>
            plant inspo
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
                    <button>
                        Shop
                    </button>
                </div>
                <div class="plant_type">
                    <img src="../../assets/home_p/home_plant_style_hanging.png" alt="larg_tall_img">
                    <h4>
                        Large & Tall Plants
                    </h4>
                    <p>
                        Floor standing plants for instant wellbeing greenery. Choose from elegant indoor palms, stylish fiddle leaf figs and beautiful indoor trees.
                    </p>
                    <button>
                        Shop
                    </button>
                </div>
                <div class="plant_type">
                    <img src="../../assets/home_p/home_plant_style_house.png" alt="larg_tall_img">
                    <h4>
                        Large & Tall Plants
                    </h4>
                    <p>
                        Floor standing plants for instant wellbeing greenery. Choose from elegant indoor palms, stylish fiddle leaf figs and beautiful indoor trees.
                    </p>
                    <button>
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
    padding: 40px 160px;
    gap: 20px;
}
.wrapper_plant_inspo h3{
    width: auto;
    height: 60px;
    text-align: center;
    font-size: 24px;
    padding:12px 0px;
    /* margin: 0px auto 0px auto; */
    text-transform: capitalize;
    box-sizing: border-box;
}
.container_plant_inspo{
    display: flex;
    width: fit-content;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* margin-top: 20px; */
    gap: 32px;
}
.plant_type{
    display: flex;
    width: fit-content;
    height: fit-content;
    /* width: 352px;
    height: 536px; */
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
}
.plant_type img{
    /* width: 352px;
    height: 360px; */
    border-radius: 8px;
    width: 100%;
    height: auto;
    
}
.plant_type h4{
    font-size: 18px;
    margin-top: 20px;
}
.plant_type p{
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 144%; 
    letter-spacing: 0.2px;

}

.plant_type button{
    width: 64px;
    height: 36px;
    margin-top: 16px ;
    font-size: 14px;
    font-weight: 500;
    line-height: 144%; /* 20.16px */
    letter-spacing: 0.2px;
    padding: 8px 12px;
    border: 1px solid;
    border-color:#E0E0E0;
    border-radius: 4px;
    background-color: #FFFFFF;
    box-sizing: border-box;
    
}

@media (width<=744px){
    .wrapper_plant_inspo{
        padding: 20px 44px;
        gap: 16px;
    }
    .wrapper_plant_inspo h3{
        height: 48px;
        font-size: 20px;
        padding: 8px 0px;
    }
    .container_plant_inspo{
        gap: 16px;
    }
    .plant_type h4 {
        margin-top: 16px;
        font-size: 14px;
    }
    .plant_type p{
        font-size: 14px;
    }
    .plant_type button{
        margin-top: 12px;
    }
    .plant_type button{
        width: 59px;
        height: 24px;
        font-size: 12px;
        padding: 4px 12px;
    }
}

@media (width<=376px){
    .wrapper_plant_inspo{
        padding: 24px 16px;
        gap: 8px;
    }
    .wrapper_plant_inspo h3{
        height: 28px;
        font-size: 14px;
        padding: 4px 0px;
    }
    .container_plant_inspo{
        gap: 8px;
    }
    .overflow_plant_inspo{
        overflow-x: auto;
    }
    .plant_type{
        width: 168px;
        height: auto;
        flex-grow: none;
    }
    .plant_type p{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        /* height: 72px; */
        overflow: hidden;
    }
}
</style>