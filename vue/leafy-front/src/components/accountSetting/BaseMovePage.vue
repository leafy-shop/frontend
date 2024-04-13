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
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    
}
.move_page p span{
    font-weight: 500 ; 
    color: #374151;
}
.move_page div{
    display: flex;
    width: fit-content;
    height: 36px;
    gap: 12px;
}
.move_page div button{
    display: flex;
    width: fit-content;
    height: 100%;
    padding: 8px 12px;
    border: 1px solid;
    border-color: #E0E0E0;
    background-color: #fff;
    border-radius: 4px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
}
</style>