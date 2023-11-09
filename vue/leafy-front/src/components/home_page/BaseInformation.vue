<script setup>

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
            <button>
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
    height:425px;
    position:relative;
    background-color: rgb(167, 167, 167);
    overflow: hidden;

}
/* .container_information img{
    width: 100%;
    height: auto;
} */
.information_perfect_plant{
    position:absolute;
    width:600px;
    height:auto;
    padding:3px;
    left:180px;
    top:100px;
    z-index: 3;
    /* background-color: white; */
}
.information_perfect_plant h1{
    font-weight: 700;
    font-size: 48px;
    margin:0px 0px 20px 0px;
    color:#252525;
}
.information_perfect_plant p{
    margin: 20px 0px 0px 0px;
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
    height:auto;
    padding-top:5px; 
}
.information_life_greener h3{
    width:1120px;
    height:auto;
    margin:auto;
    margin-top:60px;
    margin-bottom: 30px;
    text-align: center;
    font-size: 20px;
    text-transform: uppercase;
    
    color:#252525;
    
}
.information_life_greener div{
    width:1120px;
    height: auto;
    margin:auto;
    margin-bottom:40px;
}
.information_life_greener div p{
    text-align: center;
    font-size: 16px;
    font-weight: 400;
}
</style>
