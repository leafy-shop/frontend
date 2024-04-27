<script setup>
import { useRouter } from 'vue-router';
const myRouter=useRouter()
const goHome=()=>myRouter.push({name:'Home'})
</script>
<template>
       <div class="wrapper_server_error">
        <div class="server_error">
            <div class="text_detail">
                <img src="../assets/coming_soon.png" alt="coming_soon_img">
                <h5>
                    Coming Soon
                </h5>
                <p>
                    Currently only desktop devices are supported.
                </p>
            </div>
            <div>
                <button @click="goHome" class="btn_home">
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
    gap: min(2.778dvw,40px);
    animation: show_element ease-in 1s;
}
.text_detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: inherit;
    height: fit-content;
}
.text_detail img {
    width: inherit;
    height: fit-content;
}
.text_detail h5 {
    font-weight: 700;
    font-size: min(3.333dvw,48px);
    line-height: 150%;
    color: #212121;
}
.text_detail p {
    font-weight: 500;
    font-size: min(1.25dvw,18px);
    line-height: 156%;
    color: #212121;
}
.btn_home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    width: fit-content;
    height: min(2.778dvw,40px);
    background: #26AC34;
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) rgba(0, 0, 0, 0.05);
    border-radius: min(0.278dvw,4px);
    font-weight: 500;
    font-size: min(1.111dvw,16px);
    line-height: 150%;
    letter-spacing: min(0.014dvw,0.2px);
    color: #FFFFFF;
    border: none;
    cursor: pointer;
}
.btn_home:hover {
    background-color: #168A22;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
.btn_home:active {
    background-color: #58d264;
}

/* mobile */
@media (width<=432px){
    .server_error{
        width: min(92.593dvw,400px);
        gap: min(9.259dvw,40px);
    }
    .text_detail h5 {
        font-size: min(11.111dvw,48px);
    }
    .text_detail p {
        font-size: min(4.167dvw,18px);
    }
    .btn_home {
        
        padding: min(1.852dvw,8px) min(2.778dvw,12px);
        height: min(9.259dvw,40px);
        border-radius: min(0.926dvw,4px);
        font-size: min(3.704dvw,16px);
    }
}
</style>