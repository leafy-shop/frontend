<script setup>
import {useRoute} from 'vue-router'
const {params} = useRoute()
</script>
<template>
this is gallery detail : {{params.id}}
</template>
<style scoped>
</style>