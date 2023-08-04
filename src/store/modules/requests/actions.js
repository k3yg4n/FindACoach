export default {
  async addRequest(context, payload) {
    const newRequest = {
      email: payload.email,
      message: payload.message,
    };
    // POST, not PUT because we do not want to overwrite existing data.
    // For a POST request, Firebase will return the generated unique ID
    const response = await fetch(
      `https://vue-coach-finder-5db23-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      // Error handling; thrown error handled in frontend
      const error = new Error(responseData.error || 'Failed to send request.');
      throw error;
    }

    // Extract generated unique ID from Firebase response
    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const currentCoachId = context.rootGetters.currentUserId;
    const response = await fetch(
      `https://vue-coach-finder-5db23-default-rtdb.firebaseio.com/requests/${currentCoachId}.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.error || 'Failed to fetch requests.'
      );
      throw error;
    }

    // Transform response data into desired state
    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: currentCoachId,
        email: responseData[key].email,
        message: responseData[key].message,
      };
      requests.push(request);
    }

    context.commit('fetchRequests', requests);
  },
};
