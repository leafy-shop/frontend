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
    <div class="submit">
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
    height: 60px;
    padding: 12px 20px;
    gap: 8px;
    justify-content: end;
    background-color: #FAFAFA;
}

.submit button {
    width: 80px;
    height: 36px;
    border: 1px solid;
    padding: 8px 12px;
    border-radius: 4px;
    box-shadow: 0px 1px 2px 0px #0000000D;
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

</style>