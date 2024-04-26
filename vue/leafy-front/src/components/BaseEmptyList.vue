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
  height: min(13.889dvw,200px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color:#fff;
  border: none;
  border-radius: min(0.278dvw,4px);
}
.wrapper_empty > h4{
  width: fit-content;
  height: fit-content;
  font-size: min(0.972dvw,14px);
  line-height: 144%;
  font-weight: 500;
  color:#212121;
}
/* HTML: <div class="loader"></div> */
.loader {
  width: min(4.444dvw,64px);
  height: min(1.944dvw,28px);
  position: relative;
}
.loader:before {
  content: "";
  position: absolute;
  border-radius: min(3.472dvw,50px);
  box-shadow: 0 0 0 min(0.208dvw,3px) inset #26AC34;
  animation: l3 0.75s infinite alternate;
}
@keyframes l3 {
  0% {
    inset: 0 min(2.431dvw,35px) 0 0;
  }
  50% {
    inset: 0 0 0 0;
  }
  100% {
    inset: 0 0 0 min(2.431dvw,35px);
  }
}

/* mobile */
@media (width<=432px){
  .wrapper_empty{
      height: 200px;
      border-radius: 0px;
  }
  .wrapper_empty > h4{
    font-size: 14px;
  }
  .loader {
    width: 64px;
    height: 28px;
  }
  .loader:before {
    content: "";
    position: absolute;
    border-radius: 50px;
    box-shadow: 0 0 0 3px inset #26AC34;
    /* animation: l3 0.75s infinite alternate; */
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
}
</style>