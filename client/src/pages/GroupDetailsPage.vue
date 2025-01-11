<script setup>
import { AppState } from "@/AppState";
// import MapsComponent from "@/components/MapsComponent.vue";
import { groupHandler } from "@/handlers/GroupHandler";
import { commentsService } from "@/services/CommentsService";
import { groupsService } from "@/services/GroupsService";
import { membersService } from "@/services/MembersService";
import { postsService } from "@/services/PostsService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { computed, ref, watch } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";

const route = useRoute();

const group = computed(() => AppState.activeGroup);
const posts = computed(() => AppState.posts);
const comments = computed(() => AppState.comments);
const account = computed(() => AppState.account);
const members = computed(() => AppState.members);
const hasJoined = computed(() =>
  members.value.some((member) => member.accountId == account.value?.id)
);
const foundPosts = computed(() =>
  AppState.posts.filter((post) => post.imgUrl != "")
);
const firstFourPosts = computed(() => foundPosts.value.slice(0, 4));
const joinedGroups = computed(() => AppState.joinedGroups);
const foundMember = computed(() =>
  joinedGroups.value.find((member) => member.groupId == route.params.groupId)
);

const editableCommentData = ref({
  body: "",
  postId: "",
  groupId: route.params.groupId,
});

const showForm = ref(false)

watch(
  route,
  () => {
    postsService.clearPosts();
    getGroupById();
    getPostsByGroupId();
    getMembersByGroupId();
    getCommentsByGroupId();
    joinGroupRoom();
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

onBeforeRouteLeave(() => {
  leaveGroupRoom();
});

async function voidGroup() {
  try {
    const yes = await Pop.confirm(
      `Are you sure you want ${group.value.isVoided ? "unvoid" : "void"} the ${group.value.name
      } group?`,
      "Yes i am sure!"
    );
    if (!yes) return;
    const groupId = route.params.groupId;
    await groupsService.voidGroup(groupId);
  } catch (error) {
    Pop.meow(error);
    logger.error(error);
  }
}

async function deleteComment(commentId, comment) {
  try {
    const yes = await Pop.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!yes) return;
    await commentsService.deleteComment(commentId);
    console.log("posts value", posts.value);
    const foundPost = posts.value.find((post) => {
      if (post.commentsArr.length != 0)
        for (let i = 0; i < post.commentsArr.length; i++) {
          if (post.commentsArr[i] == comment) return true;
        }
    });
    console.log("foundpost", foundPost);
    const commentIndex = foundPost.commentsArr.findIndex(
      (comment) => comment.id == commentId
    );
    console.log("comment index", commentIndex);
    foundPost.commentsArr.splice(commentIndex, 1);
  } catch (error) {
    Pop.meow(error);
    logger.error(error);
  }
}

async function createComment(postId) {
  try {
    editableCommentData.value.postId = postId;
    const commentResult = await commentsService.createComment(
      editableCommentData.value
    );
    // let foundPost = posts.value.find((post) => postId == post.id)
    // if (foundPost) {
    //   foundPost.commentsArr.push(commentResult)
    // }

    editableCommentData.value = {
      body: "",
      postId: "",
      groupId: route.params.groupId,
    };
  } catch (error) {
    Pop.meow(error);
    logger.error(error);
  }
}

async function getGroupById() {
  try {
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

async function getCommentsByGroupId() {
  try {
    const groupId = route.params.groupId;
    await commentsService.getCommentsByGroupId(groupId);

    comments.value.forEach((comment) => {
      let foundPost = posts.value.find((post) => comment.postId == post.id);
      foundPost?.commentsArr.push(comment);
    });
  } catch (error) {
    Pop.meow(error);
    logger.error(error);
  }
}

async function likeUnlikePost(postId) {
  try {
    await postsService.likeUnlikePost(postId);
  } catch (error) {
    Pop.meow(error);
    logger.error(error);
  }
}

function joinGroupRoom() {
  groupHandler.emit("JOIN_ROOM", route.params.groupId);
}

function leaveGroupRoom() {
  groupHandler.emit("LEAVE_ROOM", route.params.groupId);
}
</script>

<template>
  <div v-if="group">
    <section class="row pb-3 top-section mx-0">
      <div class="col-md-12">
        <div>
          <div class="big-box">
            <div class="img-box" :style="{
              backgroundImage: `url(${group.coverImg})`,
            }">
              <div class="glass-box text-center">
                <img :src="group.coverImg" alt="" class="co-img" />
              </div>
            </div>

            <div class="d-flex justify-content-between align-items-center p-2 bg-light">
              <div>
                <div class="d-flex align-items-center">
                  <h1>{{ group.name }}</h1>
                  <span v-if="group.creatorId == account?.id"
                    class="fs-5 fw-bold bg-success text-light ms-md-4 span-pill px-2">Creator</span>
                </div>
                <div class="d-flex">
                  <p class="me-md-3">{{ group.memberCount }} members</p>
                  <div v-for="member in members" :key="member.id" class="text-start">
                    <span>
                      <router-link :to="{
                        name: 'Profile',
                        params: { profileId: member.profile.id },
                      }">
                        <img :src="member.profile.picture" alt="" class="member-img" />
                      </router-link>
                    </span>
                  </div>
                </div>
              </div>
              <div v-if="group.isVoided" class="text-warning">
                <h3>THIS GROUP HAS BEEN VOIDED</h3>
                <p class="text-center">No longer accepting members</p>
              </div>
              <div>
                <div v-if="group.creatorId == account?.id">
                  <button :disabled="group.isVoided" type="button" class="btn btn-primary me-4 " data-bs-toggle="modal"
                    data-bs-target="#postModal">
                    Create Post
                  </button>
                  <button v-if="group.creatorId == account?.id" @click="voidGroup()"
                    class="btn btn-outline-warning me-3">
                    {{ group.isVoided ? "Unvoid" : "Void" }}
                  </button>
                </div>
                <div v-else>
                  <router-link :to="{ name: 'Group Events Page', params: { groupId: group.id } }"
                    v-if="hasJoined && group.isVoided == false">
                    <button class="btn text-end me-3">Celestial Gatherings <i
                        class="mdi mdi-creation-outline"></i></button>
                  </router-link>
                  <button v-if="hasJoined && group.isVoided == false" class="btn btn-primary me-4"
                    data-bs-toggle="modal" data-bs-target="#postModal">
                    Create Post
                  </button>
                  <button v-if="hasJoined" @click="deleteMember(foundMember.id)" class="btn btn-outline-danger">
                    Leave Group
                  </button>
                  <button v-if="hasJoined == false && group.isVoided == false" @click="createMember"
                    class="btn btn-outline-primary">
                    Join Group
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION posts -->
    <section class="row justify-content-center bottom-section mx-0">
      <div class="col-md-6">
        <section v-for="post in posts" :key="post.id" class="row">
          <div>
            <div class="col-md-12 shadow mb-2 mb-md-3">
              <div class="bg-light post-box p-3">
                <div class="d-flex justify-content-between p-3">
                  <div class="d-flex">
                    <div>
                      <router-link :to="{
                        name: 'Profile',
                        params: { profileId: post.creatorId },
                      }">
                        <img :src="post.creator?.picture" alt="" class="creator-img me-2" />
                      </router-link>
                    </div>
                    <div class="p-2">
                      <p>{{ post.creator?.name }}</p>
                      <span>{{ post.createdAt.toLocaleDateString() }}</span>
                    </div>
                  </div>
                  <div>
                    <button v-if="post.creatorId == account?.id" @click="deletePost(post.id)"
                      class="btn btn-outline-danger">
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
                    <div v-if="
                      post.likes.findIndex(
                        (like) => like.id == account.id
                      ) !== -1
                    " @click="likeUnlikePost(post.id)" class="me-5 selectable rounded p-3 d-flex align-items-center">
                      <span class="mdi mdi-thumb-up me-1 fs-4"></span>
                      <span>You liked this</span>
                    </div>
                    <div v-else @click="likeUnlikePost(post.id)"
                      class="me-5 selectable rounded p-3 d-flex align-items-center">
                      <span class="mdi mdi-thumb-up-outline me-1 fs-4"></span>
                      <span>Like</span>
                    </div>
                    <div @click="showForm = !showForm" class="selectable rounded p-3 d-flex align-items-center"
                      role="button">
                      <span class="mdi mdi-comment-text-outline me-1 fs-4"></span>
                      <span>Leave a comment</span>
                    </div>
                  </div>
                  <div v-if="showForm" class="p-3">
                    <form @submit.prevent="createComment(post.id)">
                      <div class="mb-3">
                        <textarea v-model="editableCommentData.body" class="form-control" id="body" rows="3"
                          maxlength="1000" placeholder="What's on your mind?" required></textarea>
                      </div>
                      <div class="text-end mt-3 mb-3">
                        <button class="btn btn-success" title="Post comment" type="submit">
                          Post Comment
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div>
                  <div v-for="comment in post?.commentsArr" :key="comment.id" class="d-flex justify-content-between">
                    <div class="d-flex">
                      <div class="ms-2">
                        <router-link :to="{
                          name: 'Profile',
                          params: { profileId: post.creator.id },
                        }">
                          <img :src="comment.creator?.picture" class="comment-creator-img me-2" />
                        </router-link>
                      </div>
                      <div>
                        <span class="fw-bold">{{ comment.creator?.name }}</span>
                        <p>{{ comment.body }}</p>
                      </div>
                    </div>
                    <div v-if="account?.id == comment.creator?.id">
                      <button @click="deleteComment(comment.id, comment)" class="btn btn"><i
                          class="mdi mdi-delete-empty-outline fs-5 text-danger"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION about/group description and pics -->
      </div>
      <div class="col-md-4 order-md-last order-first mt-5 mt-md-0">
        <div>
          <div class="p-3 about-box bg-light mb-3 ">
            <h2 class="fw-bold ">About</h2>
            <p>
              {{ group.description }}
            </p>
          </div>
          <div class="bg-light snapshot-box p-3 d-none d-md-block">
            <h2 class="fw-bold ">Recent snapshots</h2>
            <section class="row mx-0">
              <div v-for="post in firstFourPosts" :key="post.id" class="col-md-6 mb-3">
                <div class="text-center">
                  <img :src="post.imgUrl" alt="" class="snapshot-img" />
                </div>
              </div>
            </section>
            <router-link :to="{
              name: 'Group Gallery Page',
              params: { groupId: group.id },
            }">
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
.img-box {
  // min-height: 10dvh;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.glass-box {
  // min-height: 10dvh;
  height: 100%;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.01);
  backdrop-filter: blur(10px);
}

.img-box .co-img {
  height: 100%;
}

.creator-img {
  height: 5rem;
  border-radius: 50%;
  aspect-ratio: 1/1;
}

.member-img {
  height: 2rem;
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

.snapshot-img {
  height: 30dvh;
  width: 100%;
  object-fit: cover;
}

.span-pill {
  height: 2rem;
  border-radius: 10px;
}

.big-box {
  background-color: white;
  height: 40dvh;
}

.bottom-section {
  margin-top: 7%;
}

@media screen and (max-width: 768px) {
  .about-box {
    margin-top: 125px;
  }
}
</style>
