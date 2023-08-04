<template>
  <!-- Make sure to convert error into a boolean if truthy value (ex: string )-->
  <base-dialog :show="!!error" title="An error occured!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <coach-filter @change-filter="updateFilters"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
        <base-button
          :is-link="true"
          to="/register"
          v-if="!isCoach && !isLoading"
          >Register as a Coach</base-button
        >
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :games="coach.games"
          :hourly-rate="coach.hourlyRate"
        >
        </coach-item>
      </ul>
      <h3 v-else>No coaches found.</h3>
    </base-card>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      activeFilters: {
        valorant: true,
        leagueOfLegends: true,
        teamfightTactics: true,
      },
      isLoading: false,
      error: null,
    };
  },
  computed: {
    filteredCoaches() {
      let coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        if (this.activeFilters['valorant'] && coach.games.includes('valorant'))
          return true;
        if (
          this.activeFilters['leagueOfLegends'] &&
          coach.games.includes('league of legends')
        )
          return true;
        if (
          this.activeFilters['teamfightTactics'] &&
          coach.games.includes('teamfight tactics')
        )
          return true;
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coaches/isCoachAlready'];
    },
  },
  methods: {
    updateFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      // Listen for the promise completion to know loading is done.
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
