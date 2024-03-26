<script setup>

</script>
 
<template>
  <!-- use this key to reload page -->
  <router-view :key="$route.fullPath"></router-view>
</template>
<style>
/* @custom-media --narrow-window (max-width: 30em); */
.menu {
    position: sticky;
    top: 0;
    z-index: 999;
}
</style>

