<template>
  <span class="badge" :class="normalizedType">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: {
    title: String,
    type: String,
  },
  computed: {
    text() {
      return this.title.toUpperCase();
    },
    normalizedType() {
      if (this.type === 'valorant') {
        return 'valorant';
      } else if (this.type === 'league of legends') {
        return 'leagueOfLegends';
      }
      return 'teamfightTactics';
    },
  },
};
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.valorant {
  background-color: #0e0808;
  color: rgb(237, 11, 11);
}

.leagueOfLegends {
  background-color: #234fff;
  color: rgb(254, 213, 76);
}

.teamfightTactics {
  background-color: #2ec269;
  color: rgb(57, 45, 7);
}
</style>
