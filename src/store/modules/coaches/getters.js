export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoachAlready(_, getters, _2, rootGetters) {
    const userId = rootGetters.currentUserId;
    const coaches = getters.coaches;
    return coaches.some((coach) => coach.id === userId);
  },
  shouldUpdate(state) {
    const lastTimestamp = state.lastFetch;
    // First timestamp
    if (!lastTimestamp) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    // Check if current timestamp is more than a minute later
    return (currentTimeStamp - lastTimestamp) / 1000 > 60;
  },
};
