<script setup>
import StarMap from '@/components/StarMap.vue';
</script>


<template>
  <div class="star-bg celestialMap">
    <StarMap />
  </div>
</template>


<style lang="scss" scoped>
.star-bg {
  background-image: url(https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
  background-position: center;
  background-size: cover;
}

@media (max-width: 600px) {
  #celestialMap {
    height: 2cap;
    /* Adjust height on smaller screens */
  }
}
</style>
