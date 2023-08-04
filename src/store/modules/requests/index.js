import RequestsMutations from './mutations.js';
import RequestsActions from './actions.js';
import RequestsGetters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      requests: [
        {
          coachId: 'c1',
          email: 'keeganliu@localhost.com',
          message: 'Hi there, I would really like to get better at Valorant!',
        },
        {
          coachId: 'c2',
          email: 'cindypeng@localhost.com',
          message:
            'Hi there, I would really like to get better at League of Legends!',
        },
      ],
    };
  },
  mutations: RequestsMutations,
  actions: RequestsActions,
  getters: RequestsGetters,
};
