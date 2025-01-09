<script setup>
import { onMounted, ref } from "vue";
import { loadState, saveState } from "../utils/Store.js";
import Login from "./Login.vue";

const theme = ref(loadState("theme") || "light");

onMounted(() => {
  document.documentElement.setAttribute("data-bs-theme", theme.value);
});

// function toggleTheme() {
//   theme.value = theme.value == "light" ? "dark" : "light";
//   document.documentElement.setAttribute("data-bs-theme", theme.value);
//   saveState("theme", theme.value);
// }
</script>

<template>
  <section class="row w-100 m-0">
    <nav class="navbar navbar-expand-sm px-3 py-5 d-flex justify-content-between">
      <div class="col-md-2">
        <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
          <div class="d-flex align-items-center">
            <img alt="logo" src="../assets/img/telescope.png" height="45" class="" />
            <span class="site-name fs-1 ms-2">Spacebook</span>
            <!-- <div class="dropdown my-2 my-lg-0">
                  <div type="button" class="tab border-0 selectable no-select" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Spacebook
                  </div>
                  <div class="dropdown-menu p-0" style="left: -100%; margin-top: 40%" aria-labelledby="authDropdown">
                    <div class="list-group">
                      <div class="list-group-item dropdown-item list-group-item-action text-center"
                        style="background-color: #24093e">
                        <router-link :to="{ name: 'Star Map Page' }" id="gallery-1" class="fs-5">
                          Star Map
                        </router-link>
                      </div>
                    </div>
                  </div>
              </div> -->
          </div>
        </router-link>
      </div>
      <!-- <div class="col-md-5 col-12">
        <div>
          <ul class="w-100 d-flex justify-content-around align-items-center p-0 m-0">
            <li>
              <router-link
            :to="{ name: 'About' }"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            About
          </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Star Map Page' }" class="btn lighten-30 selectable routerlink">
                Star Map
              </router-link>
            </li>
            <li>
              <div>
                <div class="dropdown my-2 my-lg-0">
                  <div type="button" class="tab border-0 selectable no-select" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Equipment
                  </div>
                  <div class="dropdown-menu p-0 drop-down" style="left: -35%; margin-top: 20%"
                    aria-labelledby="authDropdown">
                    <div class="list-group">
                      <div class="list-group-item dropdown-item list-group-item-action text-center"
                        style="background-color: #24093e">
                        <a href="https://www.amazon.com/s?k=telescope&ref=nb_sb_noss" target="_blank" class="fs-5"
                          id="telescopes">
                          Telescopes
                        </a>
                      </div>
                      <div class="list-group-item dropdown-item list-group-item-action text-center"
                        style="background-color: #24093e">
                        <a href="https://www.amazon.com/s?k=binocular&ref=nb_sb_noss" target="_blank" class="fs-5"
                          id="binoculars">
                          Binoculars
                        </a>
                      </div>
                      <div class="list-group-item dropdown-item list-group-item-action text-center"
                        style="background-color: #24093e">
                        <a href="https://www.amazon.com/s?k=astronomy+accessories&crid=1LNWNYEIU3XVF&sprefix=astronomy+accessories%2Caps%2C477&ref=nb_sb_noss_1"
                          target="_blank" class="fs-5" id="accessories">
                          Accessories
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div>
                 <div class="dropdown my-2 my-lg-0">
                  <div type="button" class="tab border-0 selectable no-select" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    More
                  </div>
                  <div class="dropdown-menu p-0" style="left: -100%; margin-top: 40%" aria-labelledby="authDropdown">
                    <div class="list-group">
                      <div class="list-group-item dropdown-item list-group-item-action text-center"
                        style="background-color: #24093e">
                        <router-link :to="{ name: 'News Feed' }" id="gallery-1" class="fs-5">
                          News Feed
                        </router-link>
                      </div>
                    </div>
                    <div class="list-group">
                      <div class="list-group-item dropdown-item list-group-item-action text-center"
                        style="background-color: #24093e">
                        <router-link :to="{ name: 'Gallery' }" id="gallery-1" class="fs-5">
                          Gallery
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div> -->
      <div class="col-md-2 d-flex justify-content-end align-items-center">
        <div class="me-4">
          <router-link :to="{ name: 'Star Map Page' }" class="btn lighten-30 selectable routerlink">
            Star Map
          </router-link>
        </div>
        <Login />
      </div>
      <!-- <div class="collapse navbar-collapse" id="navbarText"> -->
      <!-- LOGIN COMPONENT HERE -->
      <!-- <div> -->
      <!-- <button
          class="btn text-light"
          @click="toggleTheme"
          :title="`Enable ${theme == 'light' ? 'dark' : 'light'} theme.`"
        >
          <Icon :name="theme == 'light' ? 'weather-sunny' : 'weather-night'" />
        </button> -->
      <!-- </div> -->
      <!-- <Login /> -->
      <!-- </div> -->
    </nav>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');

a {
  color: #ffff00;
}

a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

nav {
  background-color: rgb(52 52 51);
  font-family: "Luckiest Guy", serif;

}

.site-name {
  color: #d8d8d5;
}

.routerlink {
  color: #d8d8d5;
  font-size: 17px;
}

.routerlink:hover {
  color: white;
}

.tab {
  color: #ffff00;
  font-size: 30px;
}

ul>li:hover {
  color: white;
}

#telescopes,
#binoculars,
#accessories,
#news-feeds,
#gallery-1 {
  font-family: arial;
}

@media screen and (min-width: 576px) {
  nav {
    height: 6dvh;
  }
}
</style>
