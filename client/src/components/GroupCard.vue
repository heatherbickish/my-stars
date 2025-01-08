<script setup>
import { Group } from "@/models/Group";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";

defineProps({
  groupProp: { type: Group, required: true },
});

</script>

<template>
  <div class="card shadow">
    <img class="card-img-top cover-img img-fluid" :src="groupProp.coverImg" alt="Card image cap" />
    <div class="card-body text-center">
      <h5>{{ groupProp.name }}</h5>
      <div>
        <span>{{ groupProp.memberCount }} members</span>
      </div>
      <router-link :to="{ name: 'Group Details Page', params: { groupId: groupProp.id } }">
        <div role="button" class="join-btn d-flex justify-content-center align-items-center">
          <span>Visit Group</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cover-img {
  height: 30dvh;
  width: 100%;
  object-fit: cover;
}

.join-btn {
  width: 100%;
  height: 40px;
  background-color: lightblue;
  color: blue;
}
</style>
