<script setup>
import { AppState } from '@/AppState';
import { groupsService } from '@/services/GroupsService';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const posts = computed(() => AppState.posts);
const foundPosts = computed(() => AppState.posts.filter(post => post.imgUrl != ''))
const group = computed(() => AppState.activeGroup)

watch(route, () => {
  getGroupById()
  getPostsByGroupId()
}, { immediate: true });


async function getGroupById() {
  try {
    const groupId = route.params.groupId
    await groupsService.getGroupById(groupId)
  }
  catch (error) {
    Pop.meow(error);
    logger.error('[GETTING GROUP BY ID]', error)
  }
}

async function getPostsByGroupId() {
  try {
    const groupId = route.params.groupId
    await postsService.getPostsByGroupId(groupId)
  }
  catch (error) {
    Pop.meow(error);
    logger.error('[GETTING POST BY GROUP ID]', error)
  }
}
</script>


<template>
  <section class="row text-light">
    <div class="col-md-12">
      <div class="ms-3 mt-3">
        <span>Snapshots from</span>
        <h1>{{ group.name }}</h1>
        <div class="row">
          <div v-for="foundPost in foundPosts" :key="foundPost.id" class="col-md-3">
            <div class="m-3 picture-box d-flex flex-column justify-content-end"
              :style="{ backgroundImage: `url(${foundPost.imgUrl})` }">
              <small class="text-light text-end p-2">posted by {{ foundPost.creator.name }}</small>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

</template>


<style lang="scss" scoped>
.picture-box {
  height: 45dvh;
  width: 100%;
  object-fit: cover;
  background-position: center;
  border: 1px solid white;
}
</style>
