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
    width:auto;
    height:500px;
    display:flex;
    background-color:inherit;
    justify-content: center;
    background-color: #F5F5F5;
}
/* .container_history div{
    width:100%;
    height:auto;
    margin:auto;
    
} */
.wrapper_history_img{
    width:56%;
    height:100%;
    overflow: hidden;
}
.wrapper_history_img img{
    width:800px;
    height:500px;
    justify-content: center;
    align-items: center;
   
}
.wrapper_history{
    /* flex-grow: 10; */
    /* width:640px; */
    width: 44%;
    height:500px;
    display:flex;
    padding:32px 160px 32px 32px;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    gap: 20px;
}
.wrapper_history p{
    width:100%;
    height: fit-content;
    /* margin-top:20px */
}
.wrapper_history h3{
    width:100%;
    height: fit-content;
    font-size:24px;
    font-weight: 700;
    color:#26AC34;
}

@media (width<=744px){
    .container_history{
        height: 360px;
    }
    .wrapper_history_img{
        width: 49%;
        height: inherit;
    }
    .wrapper_history{
        /* width: 380px; */
        width: 51%;
        height: inherit;
        padding: 16px 44px 16px 16px;
    }
    .wrapper_history h3{
        font-size: 20px;
    }
    .wrapper_history p{
        font-size: 14px;
    }
}

@media (width <=376px){
    .container_history{
        height: 360px;
        width: auto;
        flex-direction: column;
    }
    .wrapper_history_img img{
        width: 110%;
        height: auto;
    }
    .wrapper_history_img{
        width: inherit;
        height: 67%;
    }
    .wrapper_history{
        width: inherit;
        height: 33%;
        padding: 20px 16px;
        gap: 8px;
        text-align: center;
    }
    .wrapper_history h3{
        font-size: 16px;
    }
    .wrapper_history p{
        font-size: 12px;
    }
}
</style>