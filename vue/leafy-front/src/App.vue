<script setup>

</script>
 
<template>
  <!-- use this key to reload page -->
  <router-view :key="$route.fullPath"></router-view>
</template>
<style>
*{
    box-sizing:border-box;
    /* color: #212121; */
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
@keyframes show_element {
  0% {
    opacity: 0;
  }
  30%{
    opacity: 80;
  }
  100% {
    opacity: 100;
  }
}
</style>

