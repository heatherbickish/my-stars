<script setup>
import { AppState } from "@/AppState";
import GroupCard from "@/components/GroupCard.vue";
import { groupsService } from "@/services/GroupsService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { computed, onMounted } from "vue";

const groups = computed(() => AppState.groups);

onMounted(() => {
  getAllGroups();
});

async function getAllGroups() {
  try {
    await groupsService.getAllGroups();
  } catch (error) {
    Pop.meow(error);
    logger.error(error);
  }
}
</script>

<template>
  <section class="row justify-content-center">
    <div class="col-md-2">
      <div>
        <!-- <h2>All Groups</h2> -->
      </div>
    </div>
  </section>
  <section class="row">
    <div class="col-md-2">
      <section class="row mb-4">
        <div class="col-md-12">
          <div class="top-box p-3">
            <div>
              <h2>Groups</h2>
            </div>
            <div class="mb-3">
              <i class="mdi mdi-magnify"></i>
              <input type="text" placeholder="Search groups" />
            </div>
            <div class="mb-3" role="button">
              <span class="mdi mdi-account-group-outline"></span>
              Your Groups
            </div>
            <div class="mb-3" role="button">
              <span class="mdi mdi-compass-rose"></span>
              Discover
            </div>
            <router-link :to="{ name: 'Create' }">
              <div role="button" class="create-btn d-flex justify-content-center align-items-center">
                <i class="mdi mdi-plus"></i>
                <span>Create new group</span>
              </div>
            </router-link>
          </div>
        </div>
      </section>

    </div>
    <div class="col-md-10">
      <section class="row">
        <div v-for="group in groups" :key="group.id" class="col-md-3 mb-4">
          <GroupCard :groupProp="group" />
        </div>
      </section>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.top-box {
  background-color: yellow;
}

.create-btn {
  width: 100%;
  height: 40px;
  background-color: lightblue;
  color: blue;
}
</style>
