export default {
  currentUserId(state) {
    return state.currentUserId;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    // We are authenticated if we have a token
    return !!state.token;
  },
};
