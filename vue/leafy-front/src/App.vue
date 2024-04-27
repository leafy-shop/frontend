<script setup>

</script>
 
<template>
  <!-- use this key to reload page -->
  <router-view :key="$route.fullPath"></router-view>
</template>
<style>
*{
    box-sizing:border-box;
}
/* @custom-media --narrow-window (max-width: 30em); */
.menu {
    position: sticky;
    top: 0;
    z-index: 999;
}
.inportant_input::after{
    content: '*';
    color: #F75555;
}
</style>

