<script setup>
import {useRoute} from 'vue-router'
const {params}=useRoute()
</script>
<template>
    this is SignUp (email): {{ params.email }}
</template>
<style scoped>
</style>