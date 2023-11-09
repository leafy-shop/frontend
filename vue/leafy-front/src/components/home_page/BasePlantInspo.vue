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
    width: auto;
    height: 714px;
    flex-direction: column;
    justify-content: center;

}
.wrapper_plant_inspo h3{
    text-align: center;
    font-size: 24px;
    padding:20px;
    text-transform: capitalize;
}
.container_plant_inspo{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 30px;
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
    border-radius: 10px;
    
}
.plant_type h4{
    font-size: 22px;
    margin-top: 20px;
}
.plant_type p{
    margin-top: 10px;
}
.plant_type button{
    width: 60px;
    height: 30px;
    margin-top: 10px ;
    border-color:rgb(133, 133, 133) ;
    border-radius: 4px;
    
}
</style>