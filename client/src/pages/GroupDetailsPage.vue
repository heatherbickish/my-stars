<script setup>
import { AppState } from '@/AppState';
import { groupsService } from "@/services/GroupsService";
import { membersService } from '@/services/MembersService';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const group = computed(() => AppState.activeGroup)
const posts = computed(() => AppState.posts)
const account = computed(() => AppState.account);
const members = computed(() => AppState.members);
const hasJoined = computed(() => members.value.some(member => member.accountId == account.value?.id));
// const foundMember = members.value.find(member => member.accountId == account.value?.id)

const joinedGroups = computed(() => AppState.joinedGroups);
const foundMember = computed(() => joinedGroups.value.find(member => member.groupId == route.params.groupId));

watch(route, () => {
  getGroupById()
  getPostsByGroupId()
  getMembersByGroupId()
}, { immediate: true })

watch(account, () => {
  getMyJoinedGroups()

}, { immediate: true })

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

async function deletePost(postId) {
  try {
    const confirmed = await Pop.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;
    await postsService.deletePost(postId);
  } catch (error) {
    Pop.meow(error);
    logger.error(error);
  }
}

async function createMember() {
  try {
    if(!account.value){
      Pop.confirm("Please log in to join this group");
    }else{
      const memberData = { groupId: route.params.groupId };
      await membersService.createMember(memberData);
    }

  } catch (error) {
    Pop.meow(error);
    logger.error(error);

  }
}

async function deleteMember(memberId) {
  try {
    // hasJoined.value = !hasJoined.value;
    const confirmed = await Pop.confirm("Are you sure you want to leave this group?");
    if (!confirmed) return;
    await membersService.deleteMember(memberId);
  } catch (error) {
    Pop.meow(error);
    logger.error(error);
  }
}

async function getMembersByGroupId() {
  try {
    const groupId = route.params.groupId;
    await membersService.getMembersByGroupId(groupId);
  } catch (error) {
    Pop.meow(error);
    logger.error(error);
  }
}

async function getMyJoinedGroups() {
  try {
    await membersService.getMyJoinedGroups();
  } catch (error) {
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
              <p>{{ group.memberCount }} members</p>
              <!-- <p>{{ foundMember }}</p> -->
            </div>
            <div>
              <button v-if="hasJoined" type="button" class="btn btn-primary me-3" data-bs-toggle="modal" data-bs-target="#postModal">
                Create Post
              </button>
              <!-- <button v-if="hasJoined" @click="deleteMember(foundMember.id)" class="btn btn-outline-danger">Leave
                Group</button> -->
              <button v-if="hasJoined" @click="deleteMember(foundMember.id)" class="btn btn-outline-danger">Leave
                Group</button>
              <button v-if="!hasJoined" @click="createMember" class="btn btn-outline-primary">Join Group</button>
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
              <div class="bg-light post-box p-3">
                <div class="d-flex justify-content-between p-3">
                  <div class="d-flex">
                    <div>
                      <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
                        <img :src="post.creator.picture" alt="" class="creator-img me-2" />
                      </router-link>
                    </div>
                    <div>
                      <p>{{ post.creatorId.name }}</p>
                      <span>{{ post.createdAt.toLocaleDateString() }}</span>
                    </div>
                  </div>
                  <div>
                    <button v-if="post.creatorId == account?.id" class="btn bg-warning me-2">Edit</button>
                    <button v-if="post.creatorId == account?.id" @click="deletePost(post.id)"
                      class="btn bg-warning">Delete</button>
                  </div>
                </div>
                <p class="ms-5 mt-3">
                  {{ post.body }}
                </p>

                <!-- SECTION comments -->
                <div v-if="post.imgUrl" class="mb-4">
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
        <div>
          <div class="p-3 about-box bg-light mb-3">
            <p class="fw-bold fs-3">About</p>
            <p>
              {{ group.description }}
            </p>
            <p>
              <span class="mdi mdi-map-marker"></span>
              <span>Boise, ID</span>
            </p>
          </div>
          <div class="bg-light snapshot-box p-3">
            <p class="fw-bold fs-3">Recent snapshots</p>
            <section class="row">
              <div class="col-md-6 mb-3">
                <div class="text-center">
                  <img src="" alt="" />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="text-center">
                  <img src="" alt="" />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="text-center">
                  <img src="" alt="" />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="text-center">
                  <img src="" alt="" />
                </div>
              </div>
            </section>
            <router-link :to="{ name: 'Group Gallery Page', params: { groupId: group.id } }">
              <div class="text-end">
                <button class="btn btn-success">See all photos</button>
              </div>
            </router-link>
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

.post-box,
.about-box,
.snapshot-box {
  border-radius: 20px;
  // opacity: 0.8;
}
</style>
