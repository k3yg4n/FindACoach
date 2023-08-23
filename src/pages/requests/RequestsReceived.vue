<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      {{ error }}
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests">
          <request-item
            v-for="request in receivedRequests"
            :key="request.id"
            :email="request.email"
            :message="request.message"
          >
          </request-item>
        </ul>
        <h3 v-else>You haven't received any requests.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    receivedRequests() {
      const requests = this.$store.getters['requests/requests'];
      return requests;
    },
    hasRequests() {
      return !this.isLoading && this.$store.getters['requests/hasRequests'];
    },
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequests'); // Returns a promise due to async await
      } catch (error) {
        this.error = error.message || 'Something went wrong.';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
