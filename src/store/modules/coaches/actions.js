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
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://vue-coach-finder-5db23-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
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
  async loadCoaches(context, payload) {
    // Do not update if last fetch was less than a minute ago
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    // GET request
    const response = await fetch(
      `https://vue-coach-finder-5db23-default-rtdb.firebaseio.com/coaches.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      // Error handling
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error; // Handled by CoachesList component
    }

    // Transform received data object (dict of dicts) into correct form (array of dicts)
    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        games: responseData[key].games,
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },
};
