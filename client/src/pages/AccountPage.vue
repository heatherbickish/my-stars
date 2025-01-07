<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { AppState } from "../AppState.js";
import { logger } from "@/utils/Logger.js";
import { accountService } from "@/services/AccountService.js";
import Pop from "@/utils/Pop.js";
import { membersService } from "@/services/MembersService.js";
import GroupCardInProfilePage from "@/components/GroupCardInProfilePage.vue";
import { friendRequestsService } from "@/services/FriendRequestsService.js";
import { friendshipsService } from "@/services/FriendshipsService.js";

const account = computed(() => AppState.account);
const joinedGroups = computed(() => AppState.joinedGroups);
const receivedRequests = computed(() => AppState.receivedRequests);
const myFriends = computed(() => AppState.myFriends);
const editableAccountData = ref({
  name: "",
  picture: "",
  bio: "",
  coverImg: "",
});

onMounted(() => {
  getMyFriends();
  getMyJoinedGroups();
  getMyReceivedRequests();
});

watch(
  account,
  () => {
    if(account.value){
      editableAccountData.value = { ...account.value };
    }
  },
  { immediate: true }
);

async function getMyReceivedRequests() {
  try {
    await friendRequestsService.getMyReceivedRequests()
  }
  catch (error) {
    Pop.meow(error);
    logger.error(error)
  }
}

async function updateAccount() {
  try {
    logger.log(editableAccountData.value);
    await accountService.updateAccount(editableAccountData.value);
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

async function getMyFriends(){
  try{
    await friendshipsService.getMyFriends();
  }catch (error) {
    Pop.meow(error);
    logger.error(error);
  }
}

async function rejectRequest(friendRequestId){
  try{
    await friendRequestsService.rejectRequest(friendRequestId);
  }catch (error) {
    Pop.meow(error);
    logger.error(error);
  }
}

async function acceptRequest(friendRequest){
  try{
    await friendRequestsService.updateRequest(friendRequest.id);
    const requestData = {
      userAId: account.value.id,
      userBId: friendRequest.senderId
    };
    await friendshipsService.createFriendship(requestData);
  }catch (error) {
    Pop.meow(error);
    logger.error(error);
  }
}

async function deleteFriend(friendshipId){
  try{
    const message = "Are you sure you want to delete this friend?";
    const confirmed = await Pop.confirm(message);
    if(!confirmed) return;
    await friendshipsService.deleteFriendship(friendshipId);
  }catch (error) {
    Pop.meow(error);
    logger.error(error);
  }
}
</script>

<template>
  <section class="row justify-content-center my-4 mx-0 py-3">
    <div class="col-md-3">
      <form @submit.prevent="updateAccount" class="w-100" id="edit-form">
        <div class="mb-3">
          <input v-model="editableAccountData.name" type="text" id="name" name="name" class="form-control"
            placeholder="Name..." required />
        </div>
        <div class="mb-3">
          <input v-model="editableAccountData.picture" type="url" id="picture" name="picture" class="form-control"
            placeholder="Profile picture..." />
        </div>
        <div class="mb-3">
          <input v-model="editableAccountData.coverImg" type="url" id="coverImg" name="coverImg" class="form-control"
            placeholder="Cover Image url..." />
        </div>
        <div>
          <textarea v-model="editableAccountData.bio" name="bio" id="bio" class="form-control" rows="10" maxlength="1000"
            placeholder="Bio..."></textarea>
        </div>
        <div class="mt-3 text-end">
          <button class="btn btn-success" type="submit">Submit Changes</button>
        </div>
      </form>
    </div>
    <div class="col-md-8">
      <div>
        <h5>Profile Preview</h5>
        <div>
          <img :src="editableAccountData.coverImg" class="cover-img" alt="" />
        </div>
        <div id="bio-box" class="p-4">
          <div class="d-flex justify-content-end">
            <div style="height: 20px"></div>
          </div>
          <div id="creator-img-icon-box" class="d-inline-block position-absolute">
            <img :src="editableAccountData.picture" alt="" class="creator-img" />
          </div>
          <div class="m-3 name-bio-box">
            <h2>{{ editableAccountData.name }}</h2>
            <p class="bio-text">{{ editableAccountData.bio }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-if="account" class="row justify-content-center my-5 mx-0">
    <div class="col-md-10 border border-primary p-3">
      <div class="text-center">
        <h4 class="mb-3">Pending Friend Requests</h4>
        <section class="row justify-content-center">
          <div v-for="friendRequest in receivedRequests" :key="friendRequest.id" class="col-md-4 col-11 mb-3">
            <div class="d-flex justify-content-between align-items-center bg-info p-2">
              <div>
                <img :src="friendRequest.profile.picture" alt="" class="sender-pic me-2">
                <span class="sender-name">{{friendRequest.profile.name}}</span>
              </div>
              <div>
                <button @click="acceptRequest(friendRequest)" class="btn btn-success me-1">Accept</button>
                <button @click="rejectRequest(friendRequest.id)" class="btn btn-danger">Reject</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
  <section v-if="account" class="row justify-content-center my-5 mx-0">
    <div class="col-md-10 border border-primary p-3">
      <div class="text-center">
        <h4 class="mb-3">Friends</h4>
        <section class="row justify-content-center">
          <div v-for="myFriend in myFriends" :key="myFriend.id" class="col-md-4 col-11 mb-3">
            <div class="d-flex justify-content-between align-items-center bg-warning p-2">
              <div>
                <img v-if="myFriend.userAId == account?.id" :src="myFriend.profileB?.picture" alt="" class="friend-pic me-2">
                <img v-else :src="myFriend.profileA?.picture" alt="" class="friend-pic me-2">
                <span v-if="myFriend.userAId == account?.id" class="sender-name">{{ myFriend.profileB?.name}}</span>
                <span v-else class="sender-name">{{ myFriend.profileA?.name }}</span>
              </div>
              <div>
                <button class="btn btn-primary me-1">Send Message</button>
                <button @click="deleteFriend(myFriend.id)" class="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
  <section v-if="account" class="row justify-content-around">
    <div class="col-md-12">
      <div class="text-center">
        <h4 class="mb-3 mt-3">Joined Groups</h4>
        <section class="row justify-content-center">
          <div v-for="joinedGroup in joinedGroups" :key="joinedGroup.id"
            class="col-md-4 mb-4 d-flex justify-content-center">
            <GroupCardInProfilePage :groupProp="joinedGroup.group" />
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.bio-box {
  resize: none;
  min-height: 300px;
}

textarea {
  resize: none;
}

#bio-box {
  background-color: white;
  position: relative;
}

.cover-img {
  width: 100%;
  height: 30dvh;
  object-fit: cover;
  object-position: center;
}

#creator-img-icon-box {
  position: absolute;
  left: 18px;
  top: -100px;
}

.creator-img {
  height: 10em;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
}

.name-bio-box h2 {
  position: absolute;
  left: 16%;
  top: 10%;
}

.bio-text {
  margin-top: 3em;
}

.sender-name {
  margin: 0 auto;
}
.sender-pic{
  border-radius: 50%;
  aspect-ratio: 1/1;
  height: 3em;
}
.friend-pic{
  border-radius: 50%;
  aspect-ratio: 1/1;
  height: 3em;
}
</style>
