export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.currentUserId = payload.currentUserId;
    state.tokenExpiration = payload.tokenExpiration;
  },
};
