export default {
  addCoach(state, payload) {
    state.coaches.push(payload);
  },
  removeCoach(state, payload) {
    const coachId = payload;
    state.coaches.filter((coach) => coach.id !== coachId);
  },
};
