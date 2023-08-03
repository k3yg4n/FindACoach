<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="valorant" checked @change="setFilter" />
      <label for="valorant">VALORANT</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="leagueOfLegends" checked @change="setFilter" />
      <label for="leagueOfLegends">League of Legends</label>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        id="teamfightTactics"
        checked
        @change="setFilter"
      />
      <label for="teamfightTactics">Teamfight Tactics</label>
    </span>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        valorant: true,
        leagueOfLegends: true,
        teamfightTactics: true,
      },
    };
  },
  emits: ['change-filter'],
  methods: {
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      // Copy previous filter and override changed key
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      };
      this.filters = updatedFilters;
      this.$emit('change-filter', updatedFilters);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
