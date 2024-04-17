<script setup>
import {computed,onUpdated,onBeforeUpdate,ref} from 'vue'
const emit=defineEmits(['getShowAlertChange'])
const props=defineProps({
    name:{
        type:String,
        default:'',
        required:true
    },
    alertStatus:{
        type:Number,
        default:0
    },
    showAlert:{
        type:Boolean,
        default:false
    },
    second:{
        type:Number,
        default:2
    },
    
    alertDetail:{
        type:String,
        default:''
    }
})
const myTimeOut=ref(undefined)
const alertStatus=computed(()=>{
    let newAlertType=undefined
    if(props.alertStatus>2){ //more then 2
        newAlertType=2
    }else
    if(props.alertStatus<0){
        newAlertType=0
    }else{
        newAlertType=props.alertStatus
    }
    return newAlertType
})
const showAlert=computed(()=>{
    if(props.showAlert==true){
        myTimeOut.value=setTimeout(()=>emit('getShowAlertChange',false), props.second*1000) //2 second 
    }
    return props.showAlert
})

// if click
const closeAlertNow=()=>{
    clearTimeout(myTimeOut.value) //clear time out
    return emit('getShowAlertChange',false)
}


</script>
<template>
    <!-- over lay -->
    <div @click="closeAlertNow" :id="props.name" v-if="showAlert" class="overlay_alert">
        <!-- 0 -->
        <div v-if="alertStatus==0" class="alert_ok alert_box">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711Z" fill="#34D399"/>
            </svg>
            <!-- detail -->
            <p>
                {{ props.alertDetail }}
            </p>
        </div>
        <!-- 1 -->
        <div v-else-if="alertStatus==1 " class="alert_error alert_box">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L8.58579 10L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L10 11.4142L11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.4142 10L12.7071 8.70711C13.0976 8.31658 13.0976 7.68342 12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L10 8.58579L8.70711 7.29289Z" fill="#F87171"/>
            </svg>
            <p>
                {{ props.alertDetail }}
            </p>
        </div>
        <!-- 2 -->
        <div v-else-if="alertStatus==2 " class="alert_warining alert_box">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.25706 3.09858C9.02167 1.73928 10.9788 1.73928 11.7434 3.09858L17.3237 13.0191C18.0736 14.3523 17.1102 15.9996 15.5805 15.9996H4.4199C2.89025 15.9996 1.92682 14.3523 2.67675 13.0191L8.25706 3.09858ZM11.0001 12.9998C11.0001 13.552 10.5524 13.9998 10.0001 13.9998C9.44784 13.9998 9.00012 13.552 9.00012 12.9998C9.00012 12.4475 9.44784 11.9998 10.0001 11.9998C10.5524 11.9998 11.0001 12.4475 11.0001 12.9998ZM10.0001 4.99976C9.44784 4.99976 9.00012 5.44747 9.00012 5.99976V8.99976C9.00012 9.55204 9.44784 9.99976 10.0001 9.99976C10.5524 9.99976 11.0001 9.55204 11.0001 8.99976V5.99976C11.0001 5.44747 10.5524 4.99976 10.0001 4.99976Z" fill="#FBBF24"/>
            </svg>
            <p>
                {{ props.alertDetail }}
            </p>
        </div>
    </div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.overlay_alert{
    display: flex;
    position: fixed;
    width: 100%;
    height: 100dvh;
    background-color:#00000040;
    top: 0;
    left: 0;
    z-index: 999;
    justify-content: center;
    align-items: start;
    padding: min(3.472dvw,50px);
    cursor: pointer;
}
.alert_box{
    display: flex;
    width: fit-content;
    min-width: min(24.444dvw,352px);
    max-width: 70%;
    height: fit-content;
    border: none;
    border-radius: min(0.417dvw,6px);
    padding: min(1.111dvw,16px);
    gap: min(0.833dvw,12px);
    /* background-color: #121212; */
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000F;
    align-items: center;

}
.alert_box p{
    display: flex;
    width:fit-content;
    max-width: 100%;
    height: fit-content;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    font-weight: 500;
    color: #fff;
}
/* ok */
.alert_ok{
    background-color: #ECFDF5;
}
.alert_ok p{
    color: #065F46;
}

/* error */
.alert_error{
    background-color: #FEF2F2;
}
.alert_error p{
    color: #991B1B;
}

/* wraning */
.alert_warining{
    background-color: #fefcf2;
}
.alert_warining p{
    color: #91991b;
}
</style>