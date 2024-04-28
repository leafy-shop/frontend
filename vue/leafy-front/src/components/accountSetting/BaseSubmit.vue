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
    font-weight: 500;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    letter-spacing: min(0.014dvw,0.2px);
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
        padding: 0px min(4.63dvw,20px) min(4.63dvw,20px) min(4.63dvw,20px);
        gap: min(1.852dvw,8px);
        justify-content: end;
    }
    .submit button {
        width: 100%;
        height: min(8.333dvw,36px);
        border: min(0.231dvw,1px) solid;
        padding: min(1.852dvw,8px) min(2.778dvw,12px);
        border-radius: min(0.926dvw,4px);
        box-shadow: 0px 1px 2px 0px #0000000D;
    }
}
</style>