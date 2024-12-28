<script setup>
import { AppState } from '@/AppState';
import { groupsService } from "@/services/GroupsService";
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const group = computed(() => AppState.activeGroup)
const posts = computed(() => AppState.posts)
const account = computed(() => AppState.account);
const route = useRoute()

watch(route, () => {
  getGroupById()
  getPostsByGroupId()
}, { immediate: true })

// onMounted(() => {
//   getPosts()
// })

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
    logger.log(groupId)
    await postsService.getPostsByGroupId(groupId)
  }
  catch (error) {
    Pop.meow(error);
    logger.error('[GETTING POST BY GROUP ID]', error)
  }
}

async function deletePost(postId){
  try{
    const confirmed = await Pop.confirm("Are you sure you want to delete this post?");
    if(!confirmed) return;
    await postsService.deletePost(postId);
  }catch(error){
    Pop.meow(error);
    logger.error(error);
  }
}

</script>

<template>
  <div v-if="group">
    <section class="row img-box mb-4">
      <div class="col-md-12 px-5">
        <div>
          <div class="mt-3">
            <img :src="group.coverImg" alt="" class="cover-image">
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h1>{{ group.name }}</h1>
              <p>2100 members</p>
            </div>
            <div>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#postModal">
                Create Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION posts -->
    <section class="row justify-content-center">
      <div class="col-md-6">
        <section v-for="post in posts" :key="post.id" class="row">
          <div>
            <div class="col-md-12 shadow mb-5">
              <div>
                <div class="d-flex justify-content-between p-3">
                  <div class="d-flex">
                    <div>
                      <img :src="post.creator.picture" alt="" class="creator-img me-2" />
                    </div>
                    <div>
                      <p>{{ post.creatorId.name }}</p>
                      <span>{{ post.createdAt.toLocaleDateString() }}</span>
                    </div>
                  </div>
                  <div>
                    <button v-if="post.creatorId == account?.id" class="btn bg-warning me-2">Edit</button>
                    <button v-if="post.creatorId == account?.id" @click="deletePost(post.id)" class="btn bg-warning">Delete</button>
                  </div>
                </div>
                <p>
                  {{ post.body }}
                </p>

                <!-- SECTION comments -->
                <div class="mb-4">
                  <img :src="post.imgUrl" alt="" class="post-img" />
                </div>
                <div class="bg-light d-flex justify-content-center">
                  <div class="me-5 selectable rounded p-3 d-flex align-items-center">
                    <span class="mdi mdi-thumb-up-outline me-1 fs-4"></span>
                    <span>Like</span>
                  </div>
                  <div class="selectable rounded p-3 d-flex align-items-center">
                    <span class="mdi mdi-comment-text-outline me-1 fs-4"></span>
                    <span>Comment</span>
                  </div>
                </div>
                <div class="p-3">
                  <div class="d-flex shadow p-2 mb-3">
                    <div class="ms-2">
                      <img
                        src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-1/470201962_971788934996219_3257728217146353019_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=MtBZFTn_WRMQ7kNvgGaG3zt&_nc_zt=24&_nc_ht=scontent-sea1-1.xx&_nc_gid=ALPhz4ffIZAT-Q6roooPK0w&oh=00_AYAzu8N0SrTC_frYxuXKpimhjKUWgBb3vSpNTqlR46dv2A&oe=676F5AC0"
                        alt="" class="comment-creator-img me-2" />
                    </div>
                    <div>
                      <span class="fw-bold">George Jones</span>
                      <p>all dressed up and ready to hit town</p>
                    </div>
                  </div>
                  <div class="d-flex shadow p-2 mb-3">
                    <div class="ms-2">
                      <img
                        src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-1/470201962_971788934996219_3257728217146353019_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=MtBZFTn_WRMQ7kNvgGaG3zt&_nc_zt=24&_nc_ht=scontent-sea1-1.xx&_nc_gid=ALPhz4ffIZAT-Q6roooPK0w&oh=00_AYAzu8N0SrTC_frYxuXKpimhjKUWgBb3vSpNTqlR46dv2A&oe=676F5AC0"
                        alt="" class="comment-creator-img me-2" />
                    </div>
                    <div>
                      <span class="fw-bold">George Jones</span>
                      <p>all dressed up and ready to hit town</p>
                    </div>
                  </div>
                  <div class="d-flex shadow p-2 mb-3">
                    <div class="ms-2">
                      <img
                        src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-1/470201962_971788934996219_3257728217146353019_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=MtBZFTn_WRMQ7kNvgGaG3zt&_nc_zt=24&_nc_ht=scontent-sea1-1.xx&_nc_gid=ALPhz4ffIZAT-Q6roooPK0w&oh=00_AYAzu8N0SrTC_frYxuXKpimhjKUWgBb3vSpNTqlR46dv2A&oe=676F5AC0"
                        alt="" class="comment-creator-img me-2" />
                    </div>
                    <div>
                      <span class="fw-bold">George Jones</span>
                      <p>all dressed up and ready to hit town</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION about/group description and pics -->
      </div>
      <div class="col-md-4">
        <div class="bg-info">
          <div class="p-3">
            <p class="fw-bold">About</p>
            <p>
              {{ group.description }}
            </p>
            <p>
              <span class="mdi mdi-map-marker"></span>
              <span>Boise, ID</span>
            </p>
          </div>
          <div class="bg-warning">
            <p>Recent snapshots</p>
            <section class="row">
              <div class="col-md-6 mb-3">
                <div class="text-center">
                  <img
                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/471268927_976290107879435_1750261268380241935_n.jpg?stp=dst-jpg_s235x350_tt6&_nc_cat=104&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=HjbTRvkv5-gQ7kNvgHC_uOC&_nc_zt=23&_nc_ht=scontent-sea1-1.xx&_nc_gid=AoozWfcwUeUkcbjKESL7ksy&oh=00_AYA4fE6QLo0NINSRVo0DKvTkCYkZnAmdl5W0LEy-xOcYMQ&oe=676F832C"
                    alt="" />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="text-center">
                  <img
                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/471268927_976290107879435_1750261268380241935_n.jpg?stp=dst-jpg_s235x350_tt6&_nc_cat=104&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=HjbTRvkv5-gQ7kNvgHC_uOC&_nc_zt=23&_nc_ht=scontent-sea1-1.xx&_nc_gid=AoozWfcwUeUkcbjKESL7ksy&oh=00_AYA4fE6QLo0NINSRVo0DKvTkCYkZnAmdl5W0LEy-xOcYMQ&oe=676F832C"
                    alt="" />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="text-center">
                  <img
                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/471268927_976290107879435_1750261268380241935_n.jpg?stp=dst-jpg_s235x350_tt6&_nc_cat=104&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=HjbTRvkv5-gQ7kNvgHC_uOC&_nc_zt=23&_nc_ht=scontent-sea1-1.xx&_nc_gid=AoozWfcwUeUkcbjKESL7ksy&oh=00_AYA4fE6QLo0NINSRVo0DKvTkCYkZnAmdl5W0LEy-xOcYMQ&oe=676F832C"
                    alt="" />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="text-center">
                  <img
                    src="https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/471268927_976290107879435_1750261268380241935_n.jpg?stp=dst-jpg_s235x350_tt6&_nc_cat=104&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=HjbTRvkv5-gQ7kNvgHC_uOC&_nc_zt=23&_nc_ht=scontent-sea1-1.xx&_nc_gid=AoozWfcwUeUkcbjKESL7ksy&oh=00_AYA4fE6QLo0NINSRVo0DKvTkCYkZnAmdl5W0LEy-xOcYMQ&oe=676F832C"
                    alt="" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.cover-image {
  height: 400px;
  width: 100%;
  border-radius: 15px;
  object-position: center;
  object-fit: cover;
}

.img-box {
  background-color: #fff;
}

.creator-img {
  border-radius: 50%;
  aspect-ratio: 1/1;
}

.post-img {
  height: 60dvh;
  width: 100%;
  object-fit: contain;
}

.comment-creator-img {
  border-radius: 50%;
  aspect-ratio: 1/1;
  height: 3em;
}
</style>
