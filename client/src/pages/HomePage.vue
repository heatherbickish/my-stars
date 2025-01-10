<script setup>
import { AppState } from "@/AppState";
import GroupCard from "@/components/GroupCard.vue";
import { groupsService } from "@/services/GroupsService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { computed, onMounted, ref } from "vue";

const groups = computed(() => AppState.groups);
const account = computed(() => AppState.account)

const editableSearchQuery = ref('')

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

async function searchGroups() {
  try {
    await groupsService.searchGroups(editableSearchQuery.value)
  }
  catch (error) {
    Pop.meow(error);
    logger.error(error)
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
  <section class="row justify-content-around py-4">
    <div class="col-md-2">
      <section class="row mb-4">
        <div class="col-md-12">
          <div class="top-box p-3">
            <div>
              <h2>Groups</h2>
            </div>
            <div class="mb-3">
              <form @submit.prevent="searchGroups()">
                <div class="d-flex">
                  <label for="searchQuery" class="form-label"></label>
                  <input v-model="editableSearchQuery" type="text" placeholder="Search groups" id="searchQuery"
                    class="form-control me-2" style="width: 80%;">
                  <button class="btn btn-outline-info search-btn" type="submit"><i class="mdi mdi-magnify"></i></button>
                </div>
              </form>
            </div>
            <router-link :to="{ name: 'Account' }">
              <div class="mb-3" role="button">
                <span class="mdi mdi-account-group-outline"></span>
                Your Groups
              </div>
            </router-link>
            <div class="mb-3" role="button">
              <span class="mdi mdi-compass-rose"></span>
              Discover
            </div>
            <router-link :to="{ name: 'Create' }" v-if="account">
              <div role="button" class="create-btn d-flex justify-content-center align-items-center">
                <i class="mdi mdi-plus"></i>
                <span>Create Group</span>
              </div>
            </router-link>
          </div>
        </div>
      </section>

    </div>
    <div class="col-md-9">
      <section class="row groups-box p-3">
        <h2>A Universe of Groups</h2>
        <div v-for="group in groups" :key="group.id" class="col-md-3 mb-4">
          <GroupCard :groupProp="group" />
        </div>
      </section>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');

.top-box {
  background-color: rgba(100, 100, 100, 0.5);
  border-radius: 20px;
  color: white;
}

h2 {
  color: #d8d8d5;
  font-family: "Luckiest Guy", serif;
}

.search-btn {
  color: white;
  border: 1px solid white;

}

.create-btn {
  width: 100%;
  height: 40px;
  background-color: #a58b18;
  color: white;
  font-family: "Luckiest Guy", serif;
  border-radius: 9px;
}

.groups-box {
  background-color: rgba(100, 100, 100, 0.5);
  border-radius: 20px;
}
</style>
