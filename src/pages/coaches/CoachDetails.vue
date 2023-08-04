<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <p>{{ description }}</p>
      <h3>${{ rate }}/hour</h3>
    </base-card>
  </section>

  <section>
    <base-card>
      <header>
        <h2>Interested? Reach out now!</h2>
        <base-button :isLink="true" :to="contactLink">Contact</base-button>
      </header>
      <!-- Contact form -->
      <router-view></router-view>
    </base-card>
  </section>

  <section>
    <base-card>
      <h2>Coachable Games:</h2>
      <base-badge
        v-for="game in games"
        :key="game"
        :title="game"
        :type="game"
      ></base-badge>
    </base-card>
  </section>
</template>

<script>
export default {
  // We receive an id as a prop because this component will
  // be loaded through routing (CoachDetail) with props: true
  // which forwards the dynamic value for the url as a prop
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
    };
  },
  // Runs when the component is created
  created() {
    const coaches = this.$store.getters['coaches/coaches'];
    this.selectedCoach = coaches.find((coach) => coach.id === this.id);
  },
  computed: {
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
    games() {
      return this.selectedCoach.games;
    },
    contactLink() {
      return `${this.$route.path}/contact`; // ex: /coaches/c1/contact
    },
  },
};
</script>
