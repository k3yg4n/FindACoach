export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.currentUserId = payload.currentUserId;
    state.didAutoLogout = false;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
};
