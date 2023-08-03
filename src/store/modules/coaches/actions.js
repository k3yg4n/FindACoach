export default {
  addCoach(context, payload) {
    const coachData = {
      id: 'c4',
      firstName: payload.first,
      lastName: payload.last,
      games: payload.games,
      description: payload.desc,
      hourlyRate: payload.rate,
    };
    context.commit('addCoach', coachData);
  },
  removeCoach(context, payload) {
    context.commit('removeCoach', payload);
  },
};
