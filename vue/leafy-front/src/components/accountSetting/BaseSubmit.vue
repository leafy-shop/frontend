<script setup>
const props=defineProps({
    cancel:{
        type:Function,
        required:true
    },
    submit:{
        type:Function,
        required:true
    }
})
</script>
<template>
    <!-- submit -->
    <div class="submit">
        <button @click="goBanks()">
            Cancel
        </button>
        <button @click="bankSubmit()">
            Save
        </button>
    </div>
</template>
<style scoped>
</style>