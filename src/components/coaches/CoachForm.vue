<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        v-model.trim="firstName.val"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.isValid">First Name must be provided.</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        v-model.trim="lastName.val"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isValid">Last Name must be provided.</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description:</label>
      <textarea
        id="description"
        placeholder="Tell us a bit about yourself! Consider linking some of your profiles/socials!"
        rows="5"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isValid">Description must be provided.</p>
    </div>
    <div class="form-control" :class="{ invalid: !hourlyRate.isValid }">
      <label for="rate">Hourly Rate ($USD):</label>
      <input
        type="number"
        id="rate"
        v-model.number="hourlyRate.val"
        @blur="clearValidity('hourlyRate')"
      />
      <p v-if="!hourlyRate.isValid">
        Hourly Rate must be provided and greater than 0.
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !games.isValid }">
      <h3>Games of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="valorant"
          value="valorant"
          v-model="games.val"
          @blur="clearValidity('games')"
        />
        <label for="valorant">VALORANT</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="leagueOfLegends"
          value="league of legends"
          v-model="games.val"
          @blur="clearValidity('games')"
        />
        <label for="leagueOfLegends">League of Legends</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="teamfightTactics"
          value="teamfight tactics"
          v-model="games.val"
          @blur="clearValidity('games')"
        />
        <label for="teamfightTactics">Teamfight Tactics</label>
      </div>
      <p v-if="!games.isValid">
        At least one Game of Expertise must be selected.
      </p>
    </div>
    <p v-if="!formIsValid" class="invalid">
      One or more fields is invalid. Please make changes before submitting.
    </p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: {
        val: '',
        isValid: true,
      },
      lastName: {
        val: '',
        isValid: true,
      },
      description: {
        val: '',
        isValid: true,
      },
      hourlyRate: {
        val: null,
        isValid: true,
      },
      games: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.val === '') {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === '') {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.hourlyRate.val || this.hourlyRate.val < 0) {
        this.hourlyRate.isValid = false;
        this.formIsValid = false;
      }
      if (this.games.val.length === 0) {
        this.games.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }

      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.hourlyRate.val,
        games: this.games.val,
      };
      this.$emit('save-data', formData);
    },
    clearValidity(input) {
      this[input].isValid = true;
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
