<script setup>
import { AppState } from '@/AppState';
import { computed } from 'vue';


const group = computed(() => AppState.groups)
const account = computed(() => AppState.account);

</script>

<template>
    <section class="row img-box mb-4">
        <div class="col-md-12 px-5">
            <div>
                <div class="mt-3">
                    <img src="https://images.unsplash.com/photo-1684949824994-fd65ee0bce98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2l0dGllc3xlbnwwfHwwfHx8Mg%3D%3D"
                        alt="" class="cover-image">
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h1>Shirley Temple</h1>
                        <!-- <p>{{ foundMember }}</p> -->
                    </div>
                    <div>
                        <button type="button" class="btn btn-primary me-3" data-bs-toggle="modal"
                            data-bs-target="#postModal">
                            Create Post
                        </button>
                        <!-- <button v-if="hasJoined" @click="deleteMember(foundMember.id)">Leave Group</button>
                        <button v-else @click="createMember" class="btn btn-outline-primary">Join Group</button> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss"></style>