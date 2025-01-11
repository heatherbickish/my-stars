<script setup>
import { AppState } from '@/AppState';
import GroupCardInProfilePage from '@/components/GroupCardInProfilePage.vue';
import { friendRequestsService } from "@/services/FriendRequestsService";
import { friendshipsService } from '@/services/FriendshipsService';
import { membersService } from '@/services/MembersService';
import { profilesService } from '@/services/ProfilesService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';


const groups = computed(() => AppState.groups)
const account = computed(() => AppState.account);
const profile = computed(() => AppState.activeProfile)
const friendStatus = computed(() => {
    const profileId = route.params.profileId
    const foundFriend = AppState.myFriends.find((myFriend) => {
        if ((myFriend.userAId == account.value.id) && (myFriend.userBId == profileId)) {
            return true
        } else if ((myFriend.userAId == profileId) && (myFriend.userBId == account.value.id)) {
            return true
        } else return false
    })
    const foundRequest = sentOutRequests.value.find((sentOutRequest) => sentOutRequest.receiverId == profileId)
    if(foundFriend && !foundRequest) return 'friends'
    if(foundFriend && foundRequest?.reqStatus == 'accepted') return { 'show the blue box': foundRequest }
    if(!foundFriend && foundRequest?.reqStatus == 'pending') return 'pending'
    return 'Show add friend'
},
{
    onTrigger(){
        logger.log('friendStatus computed', AppState.mySentOutRequests)
    }
})

const route = useRoute()
const sentOutRequests = computed(() => AppState.mySentOutRequests)

watch(route, () => {
    getProfileById()
    getGroupsByProfileId()
}, { immediate: true })

watch(account, () => {//account contains more info details about this person
    if (AppState.identity !== null) {//who's logged into Auth 0;(if you're logged in) identity is always there before account is there
        getMySentOutRequests()
        getMyFriends()
    }
}, { immediate: true }) //runs on load


async function createFriendRequest() {
    try {
        const requestData = {
            senderId: account.value.id,
            receiverId: profile.value.id
        }
        const friendRequest = await friendRequestsService.createFriendRequest(requestData)
        return friendRequest
    }
    catch (error) {
        Pop.meow(error);
        logger.error(error)
    }
}

async function getProfileById() {
    try {
        const profileId = route.params.profileId
        await profilesService.getProfileById(profileId)
    } catch (error) {
        Pop.meow(error)
        logger.error('Getting profile by id', error)
    }
}

async function getGroupsByProfileId() {
    try {
        const profileId = route.params.profileId;
        await membersService.getGroupsByProfileId(profileId);
    } catch (error) {
        Pop.meow(error)
        logger.error(error)
    }
}

async function getMySentOutRequests() {
    try {
        await friendRequestsService.getMySentOutRequests();
    }
    catch (error) {
        Pop.meow(error);
        logger.error(error)
    }
}

async function getMyFriends() {
    try {
        await friendshipsService.getMyFriends();
    } catch (error) {
        Pop.meow(error);
        logger.error(error);
    }
}

async function confirmStatus(friendRequestId) {

    try {
        await friendRequestsService.deleteRequest(friendRequestId);
    }
    catch (error) {
        Pop.error(error);
    }
}




</script>

<template>
    <div v-if="profile">
        <section class="mb-5">
            <div class="col-md-12">
                <div>
                    <img :src="profile.coverImg" alt="" class="cover-img" />
                </div>
                <div id="bio-box" class="p-4">
                    <div class="d-flex justify-content-end">
                        <div style="height: 20px"></div>
                    </div>
                    <div id="creator-img-icon-box" class="d-inline-block position-absolute">
                        <img :src="profile.picture" alt="" class="creator-img" />
                    </div>
                    <div class="m-3 name-bio-box">
                        <h2>{{ profile.name }}</h2>
                        <p>{{ profile.bio }}</p>
                        <div class="text-end">
                            <button v-if="account?.id == profile?.id" class="btn btn-outline-success">
                                Edit
                            </button>
                            <button v-if="(friendStatus['show the blue box'])" @click="confirmStatus(friendStatus['show the blue box'].id)" class="btn btn-outline-info me-1">
                                You are friends now: click to confirm
                            </button>
                            <button v-if="(friendStatus == 'friends') || (friendStatus['show the blue box'])"
                                class="btn btn-outline-primary">Send
                                Message</button>
                            <button v-if="friendStatus == 'Show add friend'" @click="createFriendRequest()"
                                class="btn btn-outline-primary">
                                <span class="mdi mdi-account-multiple-plus-outline me-1"></span>Add Friend
                            </button>
                            <p v-if="friendStatus == 'pending'" class="outline-primary d-inline-block">
                                Pending
                            </p>
                            <!-- <div v-if="friendStatus == 'accepted'" class="bg-info d-inline-block p-3">
                                <span>{{ profile.name }} has accepted your friend request</span>
                                <button @click="confirmStatus(friendStatus['show the blue box'].id)"
                                    class="btn btn-warning ms-2">Okay</button>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section v-if="profile" class="row justify-content-around">
            <div v-for="group in groups" :key="group.id" class="col-md-4 mb-4 d-flex justify-content-center">
                <GroupCardInProfilePage :groupProp="group" />
            </div>
        </section>
    </div>
</template>

<style scoped lang="scss">
.img-box {
    background-color: #fff;
}

#bio-box {
    background-color: white;
    position: relative;
}

.cover-img {
    width: 100%;
    height: 20dvh;
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
    left: 10%;
    top: 15%;
}

.outline-primary {
    border: 2px solid blue;
    /* Creates a blue border */
    padding: 5px 10px;
    /* Adds some padding around the text */
    border-radius: 5px;
    /* Optional: rounded corners */
    color: blue;
    /* Text color to match the border */
}
</style>
