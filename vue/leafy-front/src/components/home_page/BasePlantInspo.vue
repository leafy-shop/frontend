<script setup>

</script>
<template>
    <div class="wrapper_plant_inspo">
        <h3>
            plant inspo
        </h3>
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
</template>
<style scoped>
.wrapper_plant_inspo{
    display: flex;
    width: 100%;
    height: 688px;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    background-color: #F5F5F5;
}
.wrapper_plant_inspo h3{
    width: 1120px;
    height: 36px;
    text-align: center;
    font-size: 24px;
    padding:12px 0px;
    margin: 0px auto 0px auto;
    text-transform: capitalize;
}
.container_plant_inspo{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 32px;
}
.plant_type{
    display: flex;
    width: 352px;
    height: 536px;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
}
.plant_type img{
    width: 352px;
    height: 360px;
    border-radius: 8px;
    
}
.plant_type h4{
    font-size: 18px;
    
    margin-top: 20px;
}
.plant_type p{
    margin-top: 10px;
}
.plant_type button{
    width: 64px;
    height: 36px;
    margin-top: 10px ;
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
</style>