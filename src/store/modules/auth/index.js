import AuthMutations from './mutations.js';
import AuthActions from './actions.js';
import AuthGetters from './getters.js';

export default {
  // Note that it is not namespaced
  // This is because the userId was previously
  // a global state and we do not want to have
  // to change every line where it is referenced
  state() {
    return {
      currentUserId: null,
      token: null,
      tokenExpiration: null,
    };
  },
  mutations: AuthMutations,
  actions: AuthActions,
  getters: AuthGetters,
};
