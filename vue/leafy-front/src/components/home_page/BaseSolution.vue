<script setup>

</script>
<template>
<div class="solution">
    <div class="container_solution">
        <div class="info">
            <img src="../../assets/home_p/icon/recommend.png" alt="recommend_icon">
            <div class="info_detail">
                <h3>
                    Recommend
                </h3>
                <p>
                    Products that meet your needs
                </p>
            </div>
        </div>
        <div class="info">
            <img src="../../assets/home_p/icon/delivery.png" alt="Delivery_icon">
            <div class="info_detail">
                <h3>
                    Free Delivery
                </h3>
                <p>
                    For all orders above ฿1000
                </p>
            </div>
        </div>
        <div class="info">
            <img src="../../assets/home_p/icon/communicate.png" alt="communicate_icon">
            <div class="info_detail">
                <h3>
                    Communicate
                </h3>
                <p>
                    For better information
                </p>
            </div>
            
        </div>
        <div class="info">
            <img src="../../assets/home_p/icon/inspiration.png" alt="inspiration_icon">
            <div class="info_detail">
                <h3>
                    Inspiration
                </h3>
                <p>
                    Landscape design for designer
                </p>
            </div>
            
        </div>
    </div>
</div>
</template>
<style scoped>
*{
    margin:0;
    background-color: #F5F5F5;
}
.solution {
    width: auto;
    /* height: min(19.722dvw, 284px); */
    height: fit-content;
    padding: min(4.167dvw, 60px) min(11.111dvw, 160px);
    box-sizing: border-box;
}
.container_solution {
    display:flex;
    width: inherit;
    height: fit-content;
    align-items: center;
    justify-content: center;
    gap: min(2.222dvw, 32px);
}
.container_solution div {
    width: min(17.778dvw, 256px);
    height: fit-content;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
}
.info {
    display: flex;
    flex-direction: column;
    gap: min(0.833dvw, 12px);
}
.info img{
    width: min(6.944dvw, 100px);
    height: min(6.944dvw, 100px);
}

.info h3{
    font-size: min(1.25dvw, 18px);
    line-height: 156%;
}
.info p {
    font-size: min(1.111dvw, 16px);
    letter-spacing: min(0.014dvw, 0.2px);
    line-height: 150%;
    /* padding-top: min(0.278dvw, 4px); */
}
.info_detail {
    display: flex;
    flex-direction: column;
    gap: 0px;
}

@media (width <=744px){
    .solution{
        height: min(31.72dvw, 236px);
        padding: min(5.376dvw, 40px) min(5.914dvw, 44px);
    }
    .container_solution{
        gap: min(2.151dvw, 16px);
    }
    .container_solution div{
        width: min(20.43dvw, 152px);
        height: min(20.968dvw, 156px);
    }
    .info {
        gap: min(1.613dvw, 12px);
    }
    .info img{
        width: min(10.753dvw, 80px);
        height: auto;
    }
    .info h3{
        font-size: min(2.151dvw, 16px);
        line-height: 150%;
    }
    .info p{
        font-size: min(1.882dvw, 14px);
        letter-spacing: min(0.027dvw, 0.2px);
        line-height: 144%;
    }
}

@media (width <=432px){
    .solution{
        height: min(28.704dvw, 124px);
        padding: min(6.481dvw,28px) min(4.63dvw,20px);
    }
    .container_solution{
        gap: min(1.852dvw,8px);
    }
    .container_solution div{
        width: min(18.519dvw, 80px);
        height: min(15.741dvw, 68px);
        gap: min(1.852dvw,8px);
    }
    .container_solution div img{
        width: min(11.111dvw, 48px);
        height: auto;
    }
    .container_solution div h3{
        font-size: min(2.315dvw,10px);
        /* margin-top: min(0.926dvw,4px); */
        line-height: 120%;
        letter-spacing: min(0.046dvw, 0.2px);
    }
    .container_solution div p{
        display: none;
    }
}

/* @media (width <=376px){
    .solution{
        height: min(31.915dvw, 120px);
        padding: min(7.713dvw, 28px) min(4.255dvw, 16px);
    }
    .container_solution{
        gap: min(2.128dvw, 8px);
    }
    .container_solution div{
        width: min(21.277dvw, 80px);
        height: min(17.021dvw, 64px);
    }
    .container_solution div img{
        width: min(12.766dvw, 48px);
        height: auto;
    }
    .container_solution div h3{
        font-size: min(2.66dvw, 10px);
        margin-top: min(1.064dvw, 4px);
    }
    .container_solution div p{
        display: none;
    }
} */
</style>