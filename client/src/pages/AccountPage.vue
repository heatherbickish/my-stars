<script setup>
import { computed, ref } from "vue";
import { AppState } from "../AppState.js";
import { logger } from "@/utils/Logger.js";
import { accountService } from "@/services/AccountService.js";
import Pop from "@/utils/Pop.js";

const account = computed(() => AppState.account);
const editableAccountData = ref({
  name: "",
  picture: "",
  bio: "",
  coverImg: "",
});

async function updateAccount() {
  try {
    logger.log(editableAccountData.value);
    await accountService.updateAccount(editableAccountData.value);
  } catch (error) {
    Pop.meow(error);
    logger.error(error);
  }
}
</script>

<template>
  <section v-if="account" class="row justify-content-center my-4 mx-0">
    <div class="col-md-3">
      <form @submit.prevent="updateAccount" class="w-100" id="edit-form">
        <!-- <div>
            <div class="position-relative">
              <img :src="account.coverImg" alt="" class="cover-img" />
              <div>
                <input
                  v-model="editableAccountData.coverImg"
                  type="text"
                  placeholder="Cover Image url..."
                  class="form-control w-50 cover-img-url"
                />
              </div>
            </div>
            <section class="row px-4 py-3 pb-0">
              <div class="col-md-6">
                <div>
                  <div
                    id="creator-img-icon-box"
                    class="d-inline-block position-absolute"
                  >
                    <img :src="account.picture" alt="" class="creator-img" />
                  </div>
                  <div class="w-100 text-start fw-bold py-0 fs-5">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                      account.name
                    }}
                  </div>
                  <div class="d-flex flex-column profile-url">
                    <label for="profile-img-url">Profile Image url</label>
                    <input
                      v-model="editableAccountData.picture"
                      class="form-control"
                      id="profile-img-url"
                      type="text"
                      placeholder="Image url..."
                    />
                  </div>
                </div>
              </div>
            </section>
            <section class="row px-4 pb-4">
              <div class="col-md-12">
                <div>
                  <label for="bio">Bio</label>
                  <textarea
                    v-model="editableAccountData.bio"
                    class="form-control"
                    name="bio"
                    id="bio"
                    rows="5"
                    placeholder="Tell us about yourself"
                  ></textarea>
                </div>
              </div>
            </section>
            <section class="row justify-content-end px-4 pb-4">
              <div class="col-md-5">
                <div class="d-flex justify-content-end">
                  <button
                    @click="
                      () => {
                        return;
                      }
                    "
                    class="btn btn-transparent"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    class="btn btn-info"
                    type="submit"
                    data-bs-dismiss="modal"
                  >
                    Submit Changes
                  </button>
                </div>
              </div>
            </section>
          </div> -->

        <div class="mb-3">
          <input
            type="text"
            id="name"
            name="name"
            class="form-control"
            placeholder="Name..."
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="url"
            id="picture"
            name="picture"
            class="form-control"
            placeholder="Profile picture..."
          />
        </div>
        <div class="mb-3">
          <input
            type="url"
            id="coverImg"
            name="coverImg"
            class="form-control"
            placeholder="Cover Image url..."
            required
          />
        </div>
        <div>
          <textarea
            name=""
            id="bio"
            class="form-control"
            rows="10"
            maxlength="1000"
            placeholder="Bio..."
          ></textarea>
        </div>
      </form>
    </div>
    <div class="col-md-8">
      <div>
        <h5>Profile Preview</h5>
        <div>
          <img
            src="https://images.unsplash.com/photo-1460411794035-42aac080490a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2t5fGVufDB8fDB8fHww"
            class="cover-img"
            alt=""
          />
        </div>
        <div id="bio-box" class="p-4">
                    <div class="d-flex justify-content-end">
                        <div style="height: 20px"></div>
                    </div>
                    <div id="creator-img-icon-box" class="d-inline-block position-absolute">
                        <img src="https://images.unsplash.com/photo-1662062935123-354626e8a7ad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y293JTIwY2F0fGVufDB8fDB8fHww" alt="" class="creator-img" />
                    </div>
                    <div class="m-3 name-bio-box">
                        <h2>Nameeeee</h2>
                        <p class="bio-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti dicta voluptates inventore, magni explicabo cumque, ipsa ex nulla libero at ea rem eos tenetur recusandae quo, ipsum alias facilis modi.</p>
                    </div>
                </div>
      </div>
    </div>
  </section>
  <div v-else>
    <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
  </div>
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
.bio-text{
  margin-top: 3em;
}
</style>
