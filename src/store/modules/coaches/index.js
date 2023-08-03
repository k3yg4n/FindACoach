import CoachesMutations from './mutations.js';
import CoachesActions from './actions.js';
import CoachesGetters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      coaches: [
        {
          id: 'c1',
          firstName: 'Keegan1',
          lastName: 'Liu1',
          games: ['valorant', 'league of legends', 'teamfight tactics'],
          description: 'Hello there, I want to coach!',
          hourlyRate: 999,
        },
        {
          id: 'c2',
          firstName: 'Keegan2',
          lastName: 'Liu2',
          games: ['valorant'],
          description: 'Hello there, I want to coach!',
          hourlyRate: 99,
        },
        {
          id: 'c3',
          firstName: 'Keegan3',
          lastName: 'Liu3',
          games: ['teamfight tactics'],
          description: 'Hello there, I want to coach!',
          hourlyRate: 9,
        },
      ],
    };
  },
  mutations: CoachesMutations,
  actions: CoachesActions,
  getters: CoachesGetters,
};
