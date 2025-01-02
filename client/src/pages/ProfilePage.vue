<script setup>
import { AppState } from '@/AppState';
import { profilesService } from '@/services/ProfilesService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';


const group = computed(() => AppState.groups)
const account = computed(() => AppState.account);
const profile = computed(() => AppState.activeProfile)
const route = useRoute()

watch(route, () => {
    getProfileById()

}, { immediate: true })

async function getProfileById() {
    try {
        const profileId = route.params.profileId
        await profilesService.getProfileById(profileId)
    } catch (error) {
        Pop.meow(error)
        logger.error('Getting profile by id', error)
    }
}



</script>

<template>
    <!-- <section class="row img-box mb-4">
        <div class="col-md-12 px-5">
            <div>
                <div class="mt-3">
                    <img src="https://images.unsplash.com/photo-1684949824994-fd65ee0bce98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2l0dGllc3xlbnwwfHwwfHx8Mg%3D%3D"
                        alt="" class="cover-image">
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="">
                        <img class="creator-img"
                            src="https://images.unsplash.com/photo-1611200945005-403b70229452?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHwy"
                            alt="">
                        <h1>Shirley Temple</h1>
                        <p>{{ foundMember }}</p> -->
    <!-- </div>
                    <div>
                        <button type="button" class="btn btn-primary me-3" data-bs-toggle="modal"
                            data-bs-target="#postModal">
                            Create Post
                        </button> -->
    <!-- <button v-if="hasJoined" @click="deleteMember(foundMember.id)">Leave Group</button>
                        <button v-else @click="createMember" class="btn btn-outline-primary">Join Group</button> -->
    <!-- </div>
                </div>
            </div>
        </div>
    </section> -->
    <div v-if="profile">
        <section>
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
                    <div class="m-3">
                        <h2>{{ profile.name }}</h2>
                        <p>{{ profile.bio }}</p>
                        <div class="text-end">
                            <router-link :to="{ name: 'Account' }">
                                <button v-if="account?.id == profile?.id" class="btn btn-outline-success"
                                    data-bs-toggle="modal" data-bs-target="#editModal">
                                    Edit
                                </button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="row">
            <div class="col-md-4">

            </div>
        </section>
    </div>
</template>

<style scoped lang="scss">
// .cover-image {
//     height: 400px;
//     width: 100%;
//     border-radius: 15px;
//     object-position: center;
//     object-fit: cover;
// }

.img-box {
    background-color: #fff;
}

// .creator-img {
//     border-radius: 50%;
//     aspect-ratio: 1/1;
//     height: 3em;
// }

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
}
</style>
