<script setup>
import validation from '../../JS/validation'
import {onUpdated,onMounted,computed,onBeforeMount} from 'vue'
/*
ติดปัญหาเกี่ยวกับการรันตัวเลขเดี๋ยวต้องจัดการทีหลัง
*/
const props =defineProps({
    rating:{
        type:Number,
        required:true,
        default:0
    },
    name:{
        type:String,
        required:true
    },
    isGap:{
        type:Boolean,
        default:true
    },
    size:{
        type:Number,
        required:true,
        default:100
    }
})
const name=computed(()=>props.name)
const ratingF=computed(()=>Math.floor(props.rating))
const gapValue=computed(()=>{
    if(props.isGap){
        return 'star_list_gap'
    }else return 'star_list_no_gap'
    
})
const changeSize=(number,unit='px')=>{
    let changed = (props.size/100)*number
        return `${changed+unit}`
}

onMounted(()=>{
    validation.ratingStar(ratingF.value,`star_item_${props.name}`)
})
onUpdated(()=>{
    validation.ratingStar(ratingF.value,`star_item_${props.name}`)
})
onBeforeMount(()=>{
    validation.ratingStar(ratingF.value,`star_item_${props.name}`)

})
</script>
<template>
    <div :id="`star_list_${name}`" 
    :class="[gapValue]"
    >
        <svg v-for="(star,index) in 5" :key="`${index}_${name}`" :class="`star_item_${name}    star`" xmlns="http://www.w3.org/2000/svg" class="star_item"   width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path 
                d="M9.04897 2.92708C9.34897 2.00608 10.652 2.00608 10.951 2.92708L12.021 6.21908C12.0863 6.41957 12.2134 6.59426 12.384 6.71818C12.5547 6.84211 12.7601 6.90892 12.971 6.90908H16.433C17.402 6.90908 17.804 8.14908 17.021 8.71908L14.221 10.7531C14.05 10.8771 13.9227 11.0521 13.8573 11.2529C13.7919 11.4538 13.7918 11.6702 13.857 11.8711L14.927 15.1631C15.227 16.0841 14.172 16.8511 13.387 16.2811L10.587 14.2471C10.4162 14.1231 10.2105 14.0563 9.99947 14.0563C9.78842 14.0563 9.58277 14.1231 9.41197 14.2471L6.61197 16.2811C5.82797 16.8511 4.77397 16.0841 5.07297 15.1631L6.14297 11.8711C6.20815 11.6702 6.20803 11.4538 6.14264 11.2529C6.07725 11.0521 5.94994 10.8771 5.77897 10.7531L2.97997 8.72008C2.19697 8.15008 2.59997 6.91008 3.56797 6.91008H7.02897C7.24002 6.91013 7.44568 6.84342 7.6165 6.71948C7.78732 6.59554 7.91455 6.42073 7.97997 6.22008L9.04997 2.92808L9.04897 2.92708Z"
                    />
        </svg>
    </div>
    <!-- {{ ratingF }} -->
</template>
<style scoped>
    .star_list_gap{
        display: flex;
        /* justify-content: center; */
        /* flex-direction: row; */
        /* gap: v-bind("props.isGap==true?'min(0.278dvw, 4px)':'0px'") ; */
        gap: min(v-bind(changeSize(0.278,'dvw')), v-bind(changeSize(4))) !important;
    }
    .star_list_no_gap{
        display: flex;
        justify-content: center;
        gap: 0px !important;
    }
    .star{
        width: min(v-bind(changeSize(1.389,'dvw')),v-bind(changeSize(20))); 
        height: min(v-bind(changeSize(1.389,'dvw')), v-bind(changeSize(20)));
    }
/* mobile */
@media (width<=432px){
    .star_list_gap{
        display: flex;
        /* justify-content: center; */
        /* flex-direction: row; */
        /* gap: v-bind("props.isGap==true?'min(0.278dvw, 4px)':'0px'") ; */
        gap: min(v-bind(changeSize(0.926,'dvw')), v-bind(changeSize(4))) !important;
    }
    .star_list_no_gap{
        display: flex;
        justify-content: center;
        gap: 0px !important;
    }
    .star{
        width: min(v-bind(changeSize(3.704,'dvw')),v-bind(changeSize(16))); 
        height: min(v-bind(changeSize(3.704,'dvw')), v-bind(changeSize(16)));
    }
}
/* @media(width<=744px){
    .star_list_gap{
        gap: min(v-bind(changeSize(0.538,'dvw')),v-bind(changeSize(4)));
    }
    .star_list_no_gap{
        gap: 0px;
    }
    .star{
        width: min(v-bind(changeSize(2.688,'dvw')),v-bind(changeSize(20)));
        height: min(v-bind(changeSize(2.688,'dvw')),v-bind(changeSize(20)));
    }
} */
</style>