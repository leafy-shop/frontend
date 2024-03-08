<script setup>

</script>
<template>
    <div class="container_history">
        <div class="wrapper_history_img">
            <img src="../../assets/home_p/home_history.png" alt="history_img">
        </div>
        <div class="wrapper_history">
            <h3>
                The Art of Tree Landscaping
            </h3>
            <p>
                Get inspired by the concept of tree-centric garden design. Learn how to plan and create a garden that revolves around the beauty and grace of various tree species.
            </p>
        </div>
    </div>
</template>

<style scoped>
.container_history{
    width: auto;
    height: min(34.722dvw, 500px);
    display: flex;
    background-color: inherit;
    justify-content: center;
    background-color: #F5F5F5;
}
/* .container_history div{
    width:100%;
    height:auto;
    margin:auto;
    
} */
.wrapper_history_img{
    /* width: min(55.556dvw, 800px); */
    width: 56%;
    height: 100%;
    overflow: hidden;
}
.wrapper_history_img img{
    /* width: min(55.556dvw, 800px); */
    width: 100%;
    height: min(34.722dvw, 500px);
    /* height: auto; */
    justify-content: center;
    align-items: center;
}
.wrapper_history{
    /* flex-grow: 10; */
    /* width:640px; */
    width: 44%;
    height: min(34.722dvw, 500px);
    display: flex;
    padding: min(2.222dvw, 32px) min(11.111dvw, 160px) min(2.222dvw, 32px) min(2.222dvw, 32px);
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    gap: min(1.389dvw, 20px);
}
.wrapper_history p{
    width:100%;
    height: fit-content;
    font-size: min(1.111dvw, 16px);
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: min(0.014dvw, 0.2px);
    /* margin-top:20px */
}
.wrapper_history h3{
    width:100%;
    height: fit-content;
    font-size: min(1.667dvw, 24px);
    font-weight: 700;
    color:#26AC34;
}

@media (width<=744px){
    .container_history{
        height: min(48.387dvw, 360px);
        width:auto;
    }
    .wrapper_history{
        /* width: 380px; */
        width: 51%;
        height: inherit;
        padding: min(2.151dvw, 16px) min(5.914dvw, 44px) min(2.151dvw, 16px) min(2.151dvw, 16px);
    }
    .wrapper_history_img {
        width: min(48.925dvw, 364px);
        height: inherit;
    }
    .wrapper_history_img img{
        /* width: min(48.925dvw, 364px); */
        height: min(48.387dvw, 360px);
        width: 100%;
        /* height: auto; */
    }
    .wrapper_history p {
        width:100%;
        height: fit-content;
        font-size: min(1.882dvw, 14px);
        font-weight: 400;
        line-height: 144%; /* 20.16px */
        letter-spacing: min(0.027dvw, 0.2px);
    }
    .wrapper_history h3{
        font-size: min(2.688dvw, 20px);
    }
}

@media (width <=432px){
    .container_history{
        height: min(83.333dvw, 360px);
        width: auto;
        flex-direction: column;
    }
    .wrapper_history_img {
        width: inherit;
        height: min(55.556dvw, 240px);
    }
    .wrapper_history_img img{
        width: 110%;
        height: min(55.556dvw, 240px);
    }
    .wrapper_history{
        width: inherit;
        height: fit-content;
        padding: min(4.63dvw,20px);
        gap: min(1.852dvw,8px);
        text-align: center;
    }
    .wrapper_history h3{
        font-size: min(3.704dvw,16px);
        letter-spacing: min(0.046dvw, 0.2px);
        line-height: 150%;
    }
    .wrapper_history p{
        font-size: min(2.778dvw,12px);
        font-style: normal;
        font-weight: 400;
        line-height: 136%;
        letter-spacing: min(0.046dvw, 0.2px);
    }
}

/* @media (width <=376px){
    .container_history{
        height: min(95.745dvw, 360px);
        width: auto;
        flex-direction: column;
    }
    .wrapper_history_img img{
        width: 110%;
        height: min(63.83dvw, 240px);
    }
    .wrapper_history_img {
        width: inherit;
        height: 67%;
    }
    .wrapper_history{
        width: inherit;
        height: 33%;
        padding: min(5.319dvw, 20px) min(4.255dvw, 16px);
        gap: min(2.128dvw, 8px);
        text-align: center;
    }
    .wrapper_history h3{
        font-size: min(4.255dvw, 16px);
    }
    .wrapper_history p{
        font-size: min(3.191dvw, 12px);
        font-style: normal;
        font-weight: 400;
        line-height: 136%;
        letter-spacing: min(0.053dvw, 0.2px);
    }
} */
</style>