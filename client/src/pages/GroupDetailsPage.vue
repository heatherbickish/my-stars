<script setup>
import { AppState } from "@/AppState";
import { commentsService } from "@/services/CommentsService";
import { groupsService } from "@/services/GroupsService";
import { membersService } from "@/services/MembersService";
import { postsService } from "@/services/PostsService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";



const route = useRoute();

const group = computed(() => AppState.activeGroup);
const posts = computed(() => AppState.posts);
const comments = computed(() => AppState.comments);
const account = computed(() => AppState.account);
const members = computed(() => AppState.members);
const hasJoined = computed(() =>
  members.value.some((member) => member.accountId == account.value?.id)
);

const joinedGroups = computed(() => AppState.joinedGroups);
const foundMember = computed(() =>
  joinedGroups.value.find((member) => member.groupId == route.params.groupId)
);

const editableCommentData = ref({
  body: "",
  // postId: route.params.postId
  postId: "",
  groupId: route.params.groupId
});

watch(
  route,
  () => {
    getGroupById();
    getPostsByGroupId();
    getMembersByGroupId();
    getCommentsByGroupId();
  },
  { immediate: true }
);

watch(
  account,
  () => {
    getMyJoinedGroups();
  },
  { immediate: true }
);

async function createComment(postId) {
  try {
    editableCommentData.value.postId = postId;
    const commentResult = await commentsService.createComment(editableCommentData.value);
    console.log("POSTS VALUE", posts.value)
    let foundPost = posts.value.find((post) => postId == post.id)
    // console.log("foundPost: ",foundPost)
    if(foundPost){
      foundPost.commentsArr.push(commentResult)
    }

    editableCommentData.value = {
      body: "",
      postId: "",
      groupId: ""
    };
  } catch (error) {
    Pop.meow(error);
    logger.error(error);
  }
}

async function getGroupById() {
  try {
    console.log("will this log in the console")
    const groupId = route.params.groupId;
    await groupsService.getGroupById(groupId);
  } catch (error) {
    Pop.meow(error);
    logger.error("[GETTING GROUP BY ID]", error);
  }
}

async function getPostsByGroupId() {
  try {
    const groupId = route.params.groupId;
    await postsService.getPostsByGroupId(groupId);
  } catch (error) {
    Pop.meow(error);
    logger.error("[GETTING POST BY GROUP ID]", error);
  }
}

async function deletePost(postId) {
  try {
    const confirmed = await Pop.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmed) return;
    await postsService.deletePost(postId);
  } catch (error) {
    Pop.meow(error);
    logger.error(error);
  }
}

async function createMember() {
  try {
    if (!account.value) {
      Pop.confirm("Please log in to join this group");
    } else {
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
    const confirmed = await Pop.confirm(
      "Are you sure you want to leave this group?"
    );
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

async function getCommentsByGroupId(){
  try {
    const groupId = route.params.groupId;
    await commentsService.getCommentsByGroupId(groupId);
    comments.value.forEach((comment) => {
    let foundPost = posts.value.find((post) => comment.postId == post.id)
    foundPost.commentsArr.push(comment)
  });
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
            <img :src="group.coverImg" alt="" class="cover-image" />
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h1>{{ group.name }}</h1>
              <p>{{ group.memberCount }} members</p>
              <!-- <p>{{ foundMember }}</p> -->
            </div>
            <div>
              <button
                v-if="hasJoined"
                type="button"
                class="btn btn-primary me-3"
                data-bs-toggle="modal"
                data-bs-target="#postModal"
              >
                Create Post
              </button>
              <!-- <button v-if="hasJoined" @click="deleteMember(foundMember.id)" class="btn btn-outline-danger">Leave
                Group</button> -->
              <button
                v-if="hasJoined"
                @click="deleteMember(foundMember.id)"
                class="btn btn-outline-danger"
              >
                Leave Group
              </button>
              <button
                v-if="!hasJoined"
                @click="createMember"
                class="btn btn-outline-primary"
              >
                Join Group
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION posts -->
    <div class="bg-warning">
      {{ comments }}
    </div>
    <section class="row justify-content-center">
      <div class="col-md-6">
        <section v-for="post in posts" :key="post.id" class="row">
          <div>
            <div class="col-md-12 shadow mb-5">
              <div class="bg-light post-box p-3">
                <div class="d-flex justify-content-between p-3">
                  <div class="d-flex">
                    <div>
                      <router-link
                        :to="{
                          name: 'Profile',
                          params: { profileId: post.creatorId },
                        }"
                      >
                        <img
                          :src="post.creator.picture"
                          alt=""
                          class="creator-img me-2"
                        />
                      </router-link>
                    </div>
                    <div>
                      <p>{{ post.creatorId.name }}</p>
                      <span>{{ post.createdAt.toLocaleDateString() }}</span>
                    </div>
                  </div>
                  <div>
                    <button
                      v-if="post.creatorId == account?.id"
                      class="btn bg-warning me-2"
                    >
                      Edit
                    </button>
                    <button
                      v-if="post.creatorId == account?.id"
                      @click="deletePost(post.id)"
                      class="btn bg-warning"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p class="ms-5 mt-3">
                  {{ post.body }}
                </p>

                <!-- SECTION comments -->
                <div v-if="post.imgUrl" class="mb-4">
                  <img :src="post.imgUrl" alt="" class="post-img" />
                </div>
                <div v-if="hasJoined">
                  <div class="bg-light d-flex justify-content-center">
                    <div
                      class="me-5 selectable rounded p-3 d-flex align-items-center"
                    >
                      <span class="mdi mdi-thumb-up-outline me-1 fs-4"></span>
                      <span>Like</span>
                    </div>
                    <div
                      class="selectable rounded p-3 d-flex align-items-center"
                    >
                      <span
                        class="mdi mdi-comment-text-outline me-1 fs-4"
                      ></span>
                      <span>Comment</span>
                    </div>
                  </div>
                  <div class="p-3">
                    <form @submit.prevent="createComment(post.id)">
                      <div class="mb-3">
                        <textarea
                          v-model="editableCommentData.body"
                          class="form-control"
                          id="body"
                          rows="3"
                          maxlength="1000"
                          placeholder="What's on your mind?"
                          required
                        ></textarea>
                      </div>
                      <div class="text-end mt-3 mb-3">
                        <button
                          class="btn btn-success"
                          title="Post comment"
                          type="submit"
                        >
                          Post Comment
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div v-for="comment in post?.commentsArr" :key="comment.id" class="d-flex">
                  <div class="ms-2">
                      <img
                        :src="comment.creator.picture" class="comment-creator-img me-2" />

                    </div>
                    <div>
                      <span class="fw-bold">{{comment.creator.name}}</span>
                      <p>{{comment.body}}</p>
                    </div>
                </div>
                <!-- <div class="p-3">
                  <div v-for="comment in post.comments" :key="comment.id" class="d-flex shadow p-2 mb-3">
                    <div v-if="comment" class="ms-2">
                      <img
                        :src="comment.creator.picture" class="comment-creator-img me-2" />

                    </div>
                    <div>
                      <span class="fw-bold">{{comment.creator.name}}</span>
                      <p>{{comment.body}}</p>
                    </div>
                  </div>
                </div> -->
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
            <router-link
              :to="{
                name: 'Group Gallery Page',
                params: { groupId: group.id },
              }"
            >
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
  height: 5rem;
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
