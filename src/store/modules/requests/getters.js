export default {
  requests(state, _, _2, rootGetters) {
    const allRequests = state.requests;
    const currentUserId = rootGetters.currentUserId;

    // Filter for requests of the currently registered coach
    return allRequests.filter((request) => request.coachId === currentUserId);
  },
  hasRequests(_, getters) {
    return getters['requests'] && getters['requests'].length > 0;
  },
};
