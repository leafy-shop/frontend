<script setup>
const props=defineProps({
    name:{
        type:String,
        required:true,
        default:''
    },
    disabled:{
        type:Boolean,
        default:false
    }
})
</script>
<template>
    <!-- submit -->
    <div :id="name" class="submit">
        <button @click="$emit('goBack')">
            Cancel
        </button>
        <button @click="$emit('submit')" :disabled="props.disabled" :class="[props.disabled==true?'btn_disable':'']">
            Save
        </button>
    </div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.btn_disable{
    cursor: not-allowed !important;
    background-color: #BDBDBD !important;
    border: none !important;
}
.submit {
    display: flex;
    width: 100%;
    height: min(4.167dvw,60px);
    padding: min(0.833dvw,12px) min(1.389dvw,20px);
    gap: min(0.556dvw,8px);
    justify-content: end !important;
    align-items: center !important;
    background-color: #FAFAFA;
}

.submit button {
    width: min(5.556dvw,80px);
    height: min(2.5dvw,36px);
    border: min(0.069dvw,1px) solid;
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    border-radius: min(0.278dvw,4px);
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000D;
    cursor: pointer;
}

.submit button:nth-child(1) {
    border-color: #E0E0E0;
    background-color: #fff;
    color: #212121;
}

.submit button:nth-child(2) {
    border-color: #26AC34;
    background-color: #26AC34;
    color: #fff;
}

/* mobile */
@media (width<=432px){
    .submit {
        height: fit-content;
        padding: 0px 20px 20px 20px;
        gap: 8px;
        justify-content: end;
    }
    .submit button {
        width: 100%;
        height: 36px;
        border: 1px solid;
        padding: 8px 12px;
        border-radius: 4px;
        box-shadow: 0px 1px 2px 0px #0000000D;
    }
}
</style>