<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" v-model.trim="firstName" />
    </div>
    <div class="form-control">
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" v-model.trim="lastName" />
    </div>
    <div class="form-control">
      <label for="description">Description:</label>
      <textarea
        id="description"
        placeholder="Tell us a bit about yourself! Consider linking some of your profiles/socials!"
        rows="5"
        v-model.trim="description"
      ></textarea>
    </div>
    <div class="form-control">
      <label for="rate">Hourly Rate ($USD):</label>
      <input type="number" id="rate" v-model.number="hourlyRate" />
    </div>
    <div class="form-control">
      <h3>Games of Expertise</h3>
      <div>
        <input type="checkbox" id="valorant" value="Valorant" v-model="games" />
        <label for="valorant">VALORANT</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="leagueOfLegends"
          value="League of Legends"
          v-model="games"
        />
        <label for="leagueOfLegends">League of Legends</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="teamfightTactics"
          value="Teamfight Tactics"
          v-model="games"
        />
        <label for="teamfightTactics">Teamfight Tactics</label>
      </div>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      description: '',
      hourlyRate: null,
      games: [],
    };
  },
  methods: {
    submitForm() {
      const formData = {
        id: String(Date.now()),
        firstName: this.firstName,
        lastName: this.lastName,
        games: this.games,
        description: this.description,
        hourlyRate: this.hourlyRate,
      };
      console.log(formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>