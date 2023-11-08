<script setup>

</script>
<template>
    <div class="container_history">
        <div class="wrapper_history_img">
            <img src="../../assets/vue.svg" alt="history_img">
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
    
}
/* .container_history div{
    width:100%;
    height:auto;
    margin:auto;
    
} */
.wrapper_history_img{
    flex-grow: 8;
    /* width:608px;
    height:500px; */
    overflow:hidden;
    


}
.wrapper_history_img img{
    width:100%;
    height:100%;
    /* background-color: blue; */
}
.wrapper_history{
    flex-grow: 10;
    /* width:; */
    display:flex;
    padding:0px 30px 0px 30px;
    flex-direction: column;
    justify-content: center;
}
.wrapper_history p{
    width:640px;
    height: auto;
    padding-top:20px
}
.wrapper_history h3{
    width:640px;
    height: auto;
    font-size:24px;
    font-weight: 700;
    color:#26AC34;
}
</style>