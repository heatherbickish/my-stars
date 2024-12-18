<script setup>
import Navbar from './components/Navbar.vue';
import { AppState } from './AppState.js';
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
  </footer>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
