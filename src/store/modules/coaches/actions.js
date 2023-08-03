export default {
  addCoach(context, payload) {
    context.commit('addCoach', payload);
  },
  removeCoach(context, payload) {
    context.commit('removeCoach', payload);
  },
};
