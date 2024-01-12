<script setup>
import {useRoute} from 'vue-router'
const {params} = useRoute()
</script>
<template>
    this gallery {{params.search}}
</template>
<style scoped>
</style>