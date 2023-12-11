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
    width:fit-content;
    height:fit-content;
}
.wrapper_history_img img{
    width:800px;
    height:500px;
    justify-content: center;
    align-items: center;
}
.wrapper_history{
    /* flex-grow: 10; */
    width:640px;
    height:500px;
    display:flex;
    padding:32px 160px 32px 32px;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
}
.wrapper_history p{
    width:100%;
    height: fit-content;
    margin-top:20px
}
.wrapper_history h3{
    width:100%;
    height: fit-content;
    font-size:24px;
    font-weight: 700;
    color:#26AC34;
}
</style>