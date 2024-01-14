<script setup>
import {ref,onUpdated}from 'vue'
const emit =defineEmits(['sortItem'])
const props =defineProps({
    isShowFilter:{
        type:Boolean,
        require:true,
        default:false
    }
})

const isShowFilter=ref(false)

const showFilter=()=>{
    isShowFilter.value=!isShowFilter.value //false => true
    return emit('sortItem',{show: isShowFilter.value})
}


onUpdated(()=>{
    // for update sync value every time change for filter button
    isShowFilter.value =isShowFilter.value==true?props.isShowFilter:!isShowFilter.value
    // console.log("now this value of :"+isShowFilter.value)
})
</script>
<template>
    <div class="wrapper_sort">
        <!-- <div class="sort_type">

        </div>
        <div class="sort_move">

        </div> -->
        <div class="filter_b">
            <button @click="showFilter(props.isShowFilter)">
                filter
            </button>
        </div>
    </div>
</template>
<style scoped>

.filter_b{
    display: none;
}

@media(width<=376px){
    .filter_b{
        display: block;
    }
}
</style>