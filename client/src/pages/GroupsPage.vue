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
        <h2>All Groups</h2>
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
            <div
              role="button"
              class="create-btn d-flex justify-content-center align-items-center"
            >
              <i class="mdi mdi-plus"></i>
              <span>Create new group</span>
            </div>
          </div>
        </div>
      </section>
      <section class="row">
        <div class="col-md-12">
          <div>
            <h3>Groups you've joined</h3>
            <section class="row">
              <div class="col-md-12 mb-2">
                <div class="d-flex align-items-center">
                  <img
                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/464867109_27749994744585796_3644695157781953097_n.jpg?stp=c254.0.312.312a_dst-jpg_s100x100_tt6&_nc_cat=100&ccb=1-7&_nc_sid=33e84f&_nc_ohc=Zxr63WNcMPAQ7kNvgG4VNd9&_nc_zt=23&_nc_ht=scontent-sea1-1.xx&_nc_gid=A4sgFqLX-kjq7CzGcMpupX-&oh=00_AYDyxyKxG2aHdaqDDSbuhdPYIYtc9qNYjFNTn2jx_tewYg&oe=676F4E28"
                    alt=""
                    class="me-2"
                  />
                  <div>
                    <span>Nebula Network</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12 mb-2">
                <div class="d-flex align-items-center">
                  <img
                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/464867109_27749994744585796_3644695157781953097_n.jpg?stp=c254.0.312.312a_dst-jpg_s100x100_tt6&_nc_cat=100&ccb=1-7&_nc_sid=33e84f&_nc_ohc=Zxr63WNcMPAQ7kNvgG4VNd9&_nc_zt=23&_nc_ht=scontent-sea1-1.xx&_nc_gid=A4sgFqLX-kjq7CzGcMpupX-&oh=00_AYDyxyKxG2aHdaqDDSbuhdPYIYtc9qNYjFNTn2jx_tewYg&oe=676F4E28"
                    alt=""
                    class="me-2"
                  />
                  <div>
                    <span>Nebula Network</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="d-flex align-items-center">
                  <img
                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/464867109_27749994744585796_3644695157781953097_n.jpg?stp=c254.0.312.312a_dst-jpg_s100x100_tt6&_nc_cat=100&ccb=1-7&_nc_sid=33e84f&_nc_ohc=Zxr63WNcMPAQ7kNvgG4VNd9&_nc_zt=23&_nc_ht=scontent-sea1-1.xx&_nc_gid=A4sgFqLX-kjq7CzGcMpupX-&oh=00_AYDyxyKxG2aHdaqDDSbuhdPYIYtc9qNYjFNTn2jx_tewYg&oe=676F4E28"
                    alt=""
                    class="me-2"
                  />
                  <div>
                    <span>Nebula Network</span>
                  </div>
                </div>
              </div>
            </section>
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
