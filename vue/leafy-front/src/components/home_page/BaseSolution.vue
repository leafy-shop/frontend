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
    height: 284px;
    padding: 60px 160px;
    box-sizing: border-box;
}
.container_solution{
    display:flex;
    width: inherit;
    height: fit-content;
    align-items: center;
    justify-content: center;
    gap: 32px;
    /* margin:auto; */
    /* padding:3px; */
    
}
.container_solution div{
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    /* margin:0 16px 0 16px; */
    text-align: center;
    
    

}
.container_solution div img{
    width:100px;
    height: 100px;
    margin: 0px auto ;
}

.container_solution div h3{
    font-size: 18px;
    margin:12px 0px 0px 0px;

}
.container_solution div p{
    font-size: 16px;
    
}

@media (width <=744px){
    .solution{
        height: 236px;
        padding: 40px 44px;
    }
    .container_solution{
        gap: 16px;
    }
    .container_solution div{
        width: 152px;
        height: 156px;
    }
    .container_solution div img{
        width: 80px;
        height: auto;
    }
    .container_solution div h3{
        font-size: 16px;
    }
    .container_solution div p{
        font-size: 14px;
    }
}

@media (width <=376px){
    .solution{
        height: 120px;
        padding: 28px 16px;
    }
    .container_solution{
        gap: 8px;
    }
    .container_solution div{
        width: 80px;
        height: 64px;
    }
    .container_solution div img{
        width: 48px;
        height: auto;
    }
    .container_solution div h3{
        font-size: 10px;
        margin-top: 4px;
    }
    .container_solution div p{
        display: none;
    }
    
}
</style>