<script setup>

</script>
<template>
<button class="chat">
        <img src="../assets/icon/chat_icon.svg" alt="chat_icon">
        <span>chat</span>
</button>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.chat{
    display: flex;
    position: fixed;
    right: min(1.042dvw,15px);
    bottom: min(1.042dvw,15px);
    width: min(6.597dvw,95px);
    height: min(2.778dvw,40px);
    padding:min(0.556dvw,8px) min(1.111dvw,16px);
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: #26AC34;
    box-shadow: 0px 0px 10px 0px rgba(4, 6, 15, 0.20);
    border: none;
    z-index: 99;
    cursor: pointer;
}
.chat img{
    width: min(1.389dvw,20px);
    height:  min(1.389dvw,20px);
}
.chat span{
    /* margin: auto min(0.347dvw,5px); */
    color: white;
    font-size: min(1.111dvw,16px);
    text-transform: capitalize;
    font-weight: 500;
}


@media (width<=744px){
    .chat{
        width: min(10.081dvw,75px);
        height: min(3.763dvw,28px);
        padding: min(0.538dvw,4px) min(1.613dvw,12px);
    }
    .chat img{
        width: min(2.151dvw,16px);
        height: min(2.151dvw,16px);
    }
    .chat span{
        font-size: min(1.882dvw,14px);
    }
}

@media (width<=376px){
    .chat{
        width: min(10.638dvw,40px);
        height: min(8.511dvw,32px);
        padding: min(1.064dvw,4px) min(2.128dvw,8px);
        border-radius: min(2.128dvw,8px);
    }
    .chat img{
        width: min(6.383dvw,24px);
        height: min(6.383dvw,24px);
    }
    .chat span{
        display: none;
    }
}
</style>