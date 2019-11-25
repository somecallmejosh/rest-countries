<template>
  <div>
    <div class="filters">
      <div class="form-field-wrap">
        <label for="search" class="visuallyhidden">Search</label>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
          />
        </svg>
        <input
          type="search"
          id="search"
          name="search"
          v-model="search"
          placeholder="Search for a country"
        />
      </div>

      <div class="form-field-wrap">
        <label for="regions" class="visuallyhidden">Filter by Region</label>
        <select name="regions" id="regions" v-model="search">
          <option value class="placeholder" hidden>Filter by region</option>
          <template v-for="item in filteredRegions">
            <option :value="item" v-if="item.length">{{item}}</option>
          </template>
        </select>
      </div>
    </div>
    <div class="grid">
      <nuxt-link
        :to="'/' + item.alpha3Code"
        class="grid-item"
        v-for="(item,index) in filteredList"
        :key="index"
      >
        <div class="grid-image">
          <img :src="item.flag" :alt="item.name + ' flag'" />
        </div>
        <div class="grid-text">
          <h2>{{item.name}}</h2>
          <p v-if="item.population">
            <strong>Population:</strong>
            {{item.population.toLocaleString()}}
          </p>
          <p v-if="item.region">
            <strong>Region:</strong>
            {{item.region}}
          </p>
          <p v-if="item.capital">
            <strong>Capital:</strong>
            {{item.capital}}
          </p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { VImg } from "vuetensils"

class Country {
  constructor(name, region, capital, flag, population) {
    this.name = name
    this.region = region
    this.capital = capital
    this.flag = flag
    this.population = popluation
  }
}

export default {
  async fetch({ store }) {
    await store.dispatch("countries/fetchAllCountries")
  },
  components: {
    VImg
  },
  computed: {
    countries() {
      return this.$store.state.countries.allCountries[0]
    },

    filteredList({ store }) {
      return this.countries.filter(country => {
        return (
          country.name.toLowerCase().includes(this.search.toLowerCase()) ||
          country.region.toLowerCase().includes(this.search.toLowerCase())
        )
      })
    },

    filteredRegions({ store }) {
      return this.countries
        .map(item => item.region)
        .filter((value, index, self) => {
          return self.indexOf(value) === index
        })
    }
  },
  data() {
    return {
      search: "",
      filter: ""
    }
  },
  head: {
    title: "Where in the world?"
  }
}
</script>
<style>
a {
  text-decoration: none;
}

h2 {
  font-size: var(--text-default);
  line-height: 1;
  margin-bottom: 0.5rem;
}
p {
  font-size: var(--text-small);
  line-height: 1.5;
}

.app-wrapper.dark .grid-item {
  background-color: var(--dark-blue);
  color: var(--white);
}

.app-wrapper.dark input,
.app-wrapper.dark select,
.app-wrapper.dark .form-field-wrap {
  background-color: var(--dark-blue);
  border-color: var(--dark-blue);
  color: var(--white);
}

.grid-item {
  background: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  color: var(--text-very-dark-blue);
  display: block;
  margin-bottom: 2rem;
  overflow: hidden;
}

.grid-item img {
  height: 160px;
  object-fit: cover;
  width: 100%;
  max-width: 100%;
}

.grid-text {
  padding: 1rem 1rem 2rem;
}

.form-field-wrap {
  align-items: center;
  background: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  display: inline-flex;
  height: 3.5rem;
  margin-bottom: 2rem;
  padding: 0 0.5rem 0 1.875rem;
  width: auto;
}

.form-field-wrap:first-child {
  width: 100%;
}

.form-field-wrap svg {
  height: 1rem;
  transform: translateY(1px) translateX(-4px);
}

input,
select {
  -webkit-appearance: none;
  appearance: none;
  background: var(--white);
  border: var(--white) 1px solid;
  font-size: var(--text-small);
  height: 100%;
}

input {
  width: 100%;
}

select {
  width: 12.5rem;
  background: url(/images/chevron.svg) 96% / 15% no-repeat;
  background-size: 1rem 1rem;
}

.app-wrapper.dark select {
  background: url(/images/chevron-dark.svg) 96% / 15% no-repeat;
  background-size: 1rem 1rem;
}

select::-ms-expand {
  display: none; /* remove default arrow on ie10 and ie11 */
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: var(--text-very-dark-blue);
  opacity: 1;
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: var(--text-very-dark-blue);
  opacity: 1;
}
:-ms-input-placeholder {
  /* IE 10+ */
  color: var(--text-very-dark-blue);
  opacity: 1;
}
:-moz-placeholder {
  /* Firefox 18- */
  color: var(--text-very-dark-blue);
  opacity: 1;
}

.app-wrapper.dark ::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: var(--text-white);
  opacity: 1;
}
.app-wrapper.dark ::-moz-placeholder {
  /* Firefox 19+ */
  color: var(--text-white);
  opacity: 1;
}
.app-wrapper.dark :-ms-input-placeholder {
  /* IE 10+ */
  color: var(--text-white);
  opacity: 1;
}
.app-wrapper.dark :-moz-placeholder {
  /* Firefox 18- */
  color: var(--text-white);
  opacity: 1;
}

.visuallyhidden {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap; /* added line */
}

@media (min-width: 1024px) {
  .filters {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
  }

  .form-field-wrap {
    margin-bottom: 0;
  }

  .form-field-wrap:first-child {
    width: 30rem;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 78px;
  }

  .grid-item {
    margin: 0 0 0 0;
  }
}
</style>
