<script setup>
import { AppState } from "@/AppState";
import GroupCard from "@/components/GroupCard.vue";
import { computed } from "vue";

const groups = computed(() => AppState.groups)

</script>


<template>
  <div class="col-md-10">
    <section class="row">
      <!-- <div v-for="group in groups" :key="group.id" class="col-md-3 mb-4">
        <GroupCard :groupProp="groups" />
      </div> -->
    </section>
  </div>
</template>


<style lang="scss" scoped></style>