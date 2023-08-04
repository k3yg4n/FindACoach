import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index.js';
import requestsModule from './modules/requests/index.js';

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
  },
  state() {
    return {
      currentUserId: 'c4',
    };
  },
  mutations: {},
  actions: {},
  getters: {
    currentUserId(state) {
      return state.currentUserId;
    },
  },
});

export default store;
