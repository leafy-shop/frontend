<script setup>
import { useRoute } from 'vue-router';
let {params}=useRoute()
// let id=params.id
</script>
<template>
    this is profile page {{ params.id }}
</template>
<style scoped>
</style>