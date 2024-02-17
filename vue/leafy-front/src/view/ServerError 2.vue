<script setup>
import { useRouter } from 'vue-router';
const myRouter=useRouter()
const goHome=()=>myRouter.push({name:'Home'})
</script>
<template>
       <div class="wrapper_server_error">
        <div class="server_error">
            <div>
                <img src="../assets/500.png" alt="500_img">
            </div>
            <div>
                <h5>
                    Oops!
                </h5>
                <p>
                    Internal Server Error -Lost Among the Trees
                </p>
            </div>
            <div>
                <button @click="goHome">
                    Go Home
                </button>
            </div>
        </div>

    </div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_server_error{
    display: flex;
    width: 100dvw;
    height: 100dvh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.server_error{
    display: flex;
    width: 400px;
    height: fit-content;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.server_error div:nth-child(1) {
    width: inherit;
    height: auto;
}
.server_error div:nth-child(1) img{
    width: inherit;
    height: auto;
}
.server_error div:nth-child(2){
    width: inherit;
    height: fit-content;
    text-align: center;
}
</style>