<script setup>
import Navbar from "./components/Navbar.vue";
import { AppState } from "./AppState.js";
import ModalWrapper from "./components/ModalWrapper.vue";
</script>

<template>
  <header class="container-fluid p-0">
    <Navbar />
  </header>
  <main class="container-fluid">
    <router-view />
  </main>
  <footer></footer>
  <ModalWrapper />
</template>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
