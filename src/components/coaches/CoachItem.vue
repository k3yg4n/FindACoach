<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ hourlyRate }}/hour</h4>
    <div>
      <span v-for="game in games" :key="game">{{ game }}</span>
    </div>
    <div class="actions">
      <router-link :to="coachContactLink">Contact</router-link>
      <router-link :to="coachViewDetailsLink">View Details</router-link>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    id: String,
    firstName: String,
    lastName: String,
    games: Array,
    hourlyRate: Number,
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    coachContactLink() {
      return `${this.$route.path}/${this.id}/contact`; // ex: /coaches/c1/contact
    },
    coachViewDetailsLink() {
      return `${this.$route.path}/${this.id}`; // ex: /coaches/c1
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
