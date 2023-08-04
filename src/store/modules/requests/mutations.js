export default {
  addRequest(state, request) {
    state.requests.push(request);
  },
  fetchRequests(state, requests) {
    state.requests = requests;
  },
};
