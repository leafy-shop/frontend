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
    width: 448px;
    height: 148px;
    flex-direction: column;
    background-color: #fff;
    padding: 32px 40px;
    border-radius: 8px;
    gap: 24px;
}

.confirm_delete h5 {
    display: flex;
    width: 100%;
    height: 24px;
    font-size: 16px;
    font-weight: 500;
    /* text-align: center; */
    justify-content: center;
    align-items: center;
}

.confirm_delete div {
    display: flex;
    width: 100%;
    height: fit-content;
    gap: 8px;
    justify-content: center;
    align-items: center;
}

.confirm_delete div button {
    display: flex;
    width: 80px;
    height: 36px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 8px 12px;
    box-shadow: 0px 1px 2px 0px #0000000D;
    cursor: pointer;
}

.confirm_delete div button:nth-child(1) {
    border: 1px solid;
    border-color: #E0E0E0;
    background-color: #fff;
    color: #212121;

}

.confirm_delete div button:nth-child(2) {
    background-color: #26AC34;
    color: #fff;
    border: none;
}
</style>