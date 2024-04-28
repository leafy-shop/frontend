<script setup>
import{ref} from 'vue'
const props=defineProps({
    name:{
        type:String,
        default:'',
        required:true
    },
    headerConfirm:{
        type:String,
        default:'',
    },
    submitTitle:{
        type:String,
        default:''
    },
    showConfirm:{
        type:Boolean,
        default:false
    }
})
</script>
<template>
    <div v-show="props.showConfirm" :id="props.name" class="wrapper_confirm_delete">
        <div class="confirm_delete">
            <h5>
                {{ props.headerConfirm }}
            </h5>
            <div>
                <button @click="$emit('cancel')">
                    Cancel
                </button>
                <button @click="$emit('submit')">
                    {{props.submitTitle}}
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_confirm_delete {
    display: flex;
    position: fixed;
    width: 100%;
    height: 100dvh;
    background-color: #00000040;
    top: 0;
    left: 0;
    z-index: 999;
    /* opacity: 25%; */
    justify-content: center;
    align-items: center;
}

.confirm_delete {
    display: flex;
    width: min(31.111dvw,448px);
    height: min(10.278dvw,148px);
    flex-direction: column;
    background-color: #fff;
    padding: min(2.222dvw,32px) min(2.778dvw,40px);
    border-radius: min(0.556dvw,8px);
    gap: min(1.667dvw,24px);
}

.confirm_delete h5 {
    display: flex;
    width: 100%;
    height: min(1.667dvw,24px);
    font-size: min(1.111dvw,16px);
    font-weight: 500;
    justify-content: center;
    align-items: center;
}

.confirm_delete div {
    display: flex;
    width: 100%;
    height: fit-content;
    gap: min(0.556dvw,8px);
    justify-content: center;
    align-items: center;
}

.confirm_delete div button {
    display: flex;
    width: min(5.556dvw,80px);
    height: min(2.5dvw,36px);
    justify-content: center;
    align-items: center;
    border-radius: min(0.278dvw,4px);
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000D;
    cursor: pointer;
}

.confirm_delete div button:nth-child(1) {
    border: min(0.069dvw,1px) solid;
    border-color: #E0E0E0;
    background-color: #fff;
    color: #212121;

}

.confirm_delete div button:nth-child(2) {
    background-color: #26AC34;
    color: #fff;
    border: none;
}
/* mobile */
@media (width<=432px){
    
    .confirm_delete {
        display: flex;
        width: min(81.481dvw,352px);
        height: min(25dvw,108px);
        padding: min(4.63dvw,20px);
        border-radius: min(1.852dvw,8px);
        gap: min(4.63dvw,20px);
    }

    .confirm_delete h5 {
        display: flex;
        width: 100%;
        height: min(5.556dvw,24px);
        font-size: min(3.241dvw,14px);
    }

    .confirm_delete div {
        gap: min(1.852dvw,8px);
    }

    .confirm_delete div button {
        display: flex;
        width: 100%;
        height: min(8.333dvw,36px);
        border-radius: min(0.926dvw,4px);
        padding: min(1.852dvw,8px) min(2.778dvw,12px);
        box-shadow: 0px 1px 2px 0px #0000000D;
    }

    .confirm_delete div button:nth-child(1) {
        border: min(0.231dvw,1px) solid #E0E0E0;

    }

}
</style>