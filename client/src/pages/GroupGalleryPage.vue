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
<p class="text-light">group gallery page</p>

</template>


<style lang="scss" scoped>

</style>
