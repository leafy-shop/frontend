<script setup>
</script>
<template>
<div class="wrapper_orders">
    <div class="orders">

    </div>
</div>   
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_orders{
    display: flex;
    width: 100%;
    height: fit-content;
    padding: 20px;
    gap: 24px;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    border: none;
    border-radius: 8px;
    background-color: #fff;
}
.orders{
    display: flex;
    width: 100%;
    height: inherit;
    flex-direction: column;
    gap: 24px;
}
</style>
