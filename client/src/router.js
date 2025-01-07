import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/groups',
    name: 'Groups',
    component: loadPage('GroupsPage')
  },

  {
    path: '/groups/:groupId',
    name: 'Group Details Page',
    component: loadPage('GroupDetailsPage')
  },
  {
    path: '/starmap',
    name: 'Star Map Page',
    component: loadPage('StarMapPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: loadPage('GalleryPage'),
  },
  {
    path: '/create',
    name: 'Create',
    component: loadPage('CreatePage')
  },
  {
    path: '/newsfeed',
    name: 'News Feed',
    component: loadPage('NewsFeedPage'),
  },
  {
    path: '/search',
    name: 'Search',
    component: loadPage('SearchPage')
  },
  {
    path: '/groups/:groupId/gallery',
    name: 'Group Gallery Page',
    component: loadPage('GroupGalleryPage')
  },
  {
    path: '/profiles/:profileId',
    name: 'Profile',
    component: loadPage('ProfilePage')
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
