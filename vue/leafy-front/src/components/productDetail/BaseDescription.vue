<script setup>
import { computed, onBeforeMount, onBeforeUpdate, onMounted, onUpdated,ref } from 'vue';
const props = defineProps({
    description: String
})
const showDescription=ref('')

const msg=computed(()=>{
    let text=props.description
    if(text==undefined||text==null){
        text=''
        showDescription.value=false
    }else{
        if(text.length==0){
            showDescription.value=false
        }else{
            showDescription.value=true
        }
    }
    return text.replace(/\n/g, '<br>');
})
// const text =ref('')
const assignDescription=()=>{
    let element =  document.getElementById("content_description")
    element.innerHTML=msg.value
}
onMounted(()=>{
    assignDescription()
    // document.getElementById('content').innerHTML=msg.value
    // text.value=`${msg.value}`
})
onBeforeUpdate(()=>{
    assignDescription()
})

</script>
<template>
    <div v-show=" showDescription" class="wrapper_description">
        <h5>
            Product Description
        </h5>
        <!-- for show content long text -->
        <div class="description">
            <p id="content_description">
                
            </p>
        </div>
    </div>
</template>
<style scoped>
*{
    box-sizing: border-box
}
.wrapper_description{
    display: flex;
    width: 100%;
    height: fit-content;
    padding: min(1.389dvw, 20px);
    background-color: #fff;
    border-radius: min(0.556dvw, 8px);
    gap: min(0.833dvw, 12px);
    flex-direction: column;
    color: #212121;
}
.wrapper_description h5 {
    font-size: min(1.389dvw, 20px);
    line-height: 160%;
    font-weight: 500;
    color: #212121;
}
.description p{
    display: flex;
    width: 100%;
    height: fit-content;
    font-size: min(0.972dvw, 14px);
    letter-spacing: min(0.014dvw, 0.2px);
    word-break: normal;
    white-space: pre-line;
    resize: none;
    border: none;
    background-color: transparent;
}

/* mobile */
@media (width<=432px){
    .wrapper_description{
        padding: 12px 20px;
        border-radius:  9px;
        gap: 8px;
    }
    .wrapper_description h5 {
        font-size: 16px;
    }
    .description p{
        font-size: 14px;
    }
    br::before{
        white-space: pre-line;
    }
}
</style>