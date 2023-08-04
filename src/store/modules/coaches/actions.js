export default {
  async addCoach(context, payload) {
    const userId = context.rootGetters.currentUserId;
    const coachData = {
      firstName: payload.first,
      lastName: payload.last,
      games: payload.games,
      description: payload.desc,
      hourlyRate: payload.rate,
    };

    // Overwrite data if exists, create if doesn't (POST always adds a new entry)
    const response = await fetch(
      `https://vue-coach-finder-5db23-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );

    // Will only execute when the previous line is complete.
    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }

    context.commit('addCoach', {
      ...coachData,
      id: userId,
    });
  },
};
