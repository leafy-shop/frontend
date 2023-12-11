<script setup>

</script>
<template>
<div class="solution">
    <div class="container_solution">
        <div>
            <img src="../../assets/home_p/icon/recommend.png" alt="recommend_icon">
            <h3>
                Recommend
            </h3>
            <p>
                Products that meet your needs
            </p>
        </div>
        <div>
            <img src="../../assets/home_p/icon/delivery.png" alt="Delivery_icon">
            <h3>
                Free Delivery
            </h3>
            <p>
                For all orders above ฿1000
            </p>
        </div>
        <div>
            <img src="../../assets/home_p/icon/communicate.png" alt="communicate_icon">
            <h3>
                Communicate
            </h3>
            <p>
                For better information
            </p>
        </div>
        <div>
            <img src="../../assets/home_p/icon/inspiration.png" alt="inspiration_icon">
            <h3>
                Inspiration
            </h3>
            <p>
                Landscape design for designer
            </p>
        </div>
    </div>
</div>
</template>
<style scoped>
*{
    margin:0;
    background-color: #F5F5F5;
}
.solution{
    width: auto;
    height: 296px;
}
.container_solution{
    display:flex;
    width:auto;
    height: 100%;
    align-items: center;
    justify-content: center;
    gap: 32px;
    /* margin:auto; */
    /* padding:3px; */
    
}
.container_solution div{
    width: 256px;
    height: 164px;
    display: flex;
    flex-direction: column;
    /* margin:0 16px 0 16px; */
    text-align: center;
    
    

}
.container_solution div img{
    width:100px;
    height: 100px;
    margin: auto;
}

.container_solution div h3{
    font-size: 18px;
    margin:12px 0px 0px 0px;

}
.container_solution div p{
    font-size: 16px;
    
}
</style>