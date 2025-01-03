import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Group.js').Group[]} user info from the database*/
  groups: [],
  /**@type {import('./models/Account.js').Account} */
  account: null,
  /**@type {import('./models/Post.js').Post[]} */
  posts: [],
  /** @type {import('./models/Group.js').Group} user info from the database*/
  activeGroup: null,
  /**@type {import('./models/Member.js').Member[]} */
  members: [],
  /**@type {import('./models/Member.js').Member[]} */
  joinedGroups: [],
  /**@type {import('./models/Account.js').Account} */
  activeProfile: null,
  /**@type {import('./models/Comment.js').Comment[]} */
  comments: []
})
