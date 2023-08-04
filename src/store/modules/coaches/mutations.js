export default {
  addCoach(state, payload) {
    state.coaches.push(payload);
  },
  // Set local coaches equal to coaches fetched from database
  setCoaches(state, payload) {
    state.coaches = payload;
  },
};
