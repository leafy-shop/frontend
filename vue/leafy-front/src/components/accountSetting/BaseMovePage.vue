<script setup>
import {computed,onUpdated} from 'vue'
const emit=defineEmits(["returnCalculatePage","previousPage","nextPage"])
const props=defineProps({
    name:{
        type:String,
        default:'',
        required:true
    },
    currentPage:{
        type:Number,
        default:0
    },
    totalAmountItem:{
        type:Number,
        default:0
    }
})

const calculatePage=computed(()=>{
    let returnData={}
    returnData["startWith"]=(props.currentPage-1)*10+1
    returnData["endWith"]=(10*props.currentPage)>props.totalAmountItem?props.totalAmountItem:(10*props.currentPage)
    return returnData
})

onUpdated(()=>{
     emit('returnCalculatePage',calculatePage.value)
})
</script>
<template>
    <div v-show="props.totalAmountItem!=0" class="move_page">
        <p>
            Showing 
            <span>{{calculatePage.startWith}}</span> to 
            <span>{{calculatePage.endWith}}</span> of 
            <span>{{props.totalAmountItem}}</span> entries
        </p>
        <div>
            <button @click="$emit('previousPage')">
                Previous
            </button>
            <button @click="$emit('nextPage')">
                Next
            </button>
        </div>
    </div>
</template>
<style scoped>

.move_page{
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: space-between;
    align-items: center;
    
}
.move_page p{
    width: fit-content;
    height: min(1.389dvw,20px);
    font-size: min(0.972dvw,14px);
    font-weight: 400;
    
}
.move_page p span{
    font-weight: 500; 
    color: #212121;
}
.move_page div{
    display: flex;
    width: fit-content;
    height: min(2.5dvw,36px);
    gap: min(0.833dvw,12px);
}
.move_page div button{
    display: flex;
    width: fit-content;
    height: 100%;
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    border: min(0.069dvw,1px) solid;
    border-color: #E0E0E0;
    background-color: #fff;
    border-radius: min(0.278dvw,4px);
    cursor: pointer;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    letter-spacing: min(0.014dvw,0.2px);
    color: #212121;
}
</style>