<script setup>
import {computed} from 'vue'
const props = defineProps({
    name:{
        type:String,
        default:''
    },
    showEmpty:{
        type:Boolean,
        default:undefined
        //false== empty
        //undefined== loading
    },
    title:{
        type:String,
        default:''
    }
})
const showEmpty=computed(()=>props.showEmpty)

</script>
<template>
    <div v-if="showEmpty!=true" class="wrapper_empty">
        <h4 v-if="showEmpty==false">
            {{ props.title }}
        </h4>
        <div v-else-if="showEmpty==undefined" class="loader"></div>
    </div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_empty{
    display: flex;
    width: 100%;
    height: 200px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color:#fff;
    border: none;
    border-radius: 4px;
}
.wrapper_empty > h4{
    width: fit-content;
    height: fit-content;
    font-size: 14px;
    font-weight: 500;
    color:#000000;
}
/* HTML: <div class="loader"></div> */
.loader {
  width: 65px;
  height: 30px;
  position: relative;
}
.loader:before {
  content: "";
  position: absolute;
  border-radius: 50px;
  box-shadow: 0 0 0 3px inset #26AC34;
  animation: l3 0.75s infinite alternate;
}
@keyframes l3 {
  0% {
    inset: 0 35px 0 0;
  }
  50% {
    inset: 0 0 0 0;
  }
  100% {
    inset: 0 0 0 35px;
  }
}
</style>