<template>
  <div>
    <nuxt-link to="/" class="button-link">← Back</nuxt-link>
    <div class="country-grid">
      <div class="country-grid-item">
        <img class="flag" :src="country.flag" alt="Flag" />
      </div>
      <div class="country-grid-item">
        <h1>{{country.name}}</h1>
        <div class="internal-grid">
          <div v-if="country.NativeName">
            <strong>Native Name:</strong>
            {{country.NativeName}}
          </div>
          <div v-if="country.population">
            <strong>Population:</strong>
            {{country.population.toLocaleString()}}
          </div>
          <div v-if="country.region">
            <strong>Region:</strong>
            {{country.region}}
          </div>
          <div v-if="country.subregion">
            <strong>Sub Region:</strong>
            {{country.subregion}}
          </div>
          <div v-if="country.capital">
            <strong>Capital:</strong>
            {{country.capital}}
          </div>
          <div v-if="country.topLevelDomain">
            <ul class="inline-list">
              <li>
                <strong>Top Level Domain:</strong>
              </li>
              <li class="delimited" v-for="(tld, index) in country.topLevelDomain">{{tld}}</li>
            </ul>
          </div>
          <div v-if="country.currencies">
            <ul class="inline-list">
              <li>
                <strong>Currencies:</strong>
              </li>
              <li
                v-for="(currency, index) in country.currencies"
                class="delimited"
              >{{currency.name}}</li>
            </ul>
          </div>
          <div v-if="country.languages">
            <strong>Languages:</strong>
            <ul class="inline-list">
              <li class="delimited" v-for="(language, index) in country.languages">{{language.name}}</li>
            </ul>
          </div>
        </div>

        <div v-if="country.borders.length">
          <ul class="inline-list button-list">
            <li>
              <strong>Border Countries:</strong>
            </li>
            <li v-for="(borderCountry, index) in country.borders" :key="index">
              <VAsync :await="httpRequest(borderCountry)">
                <template #resolved="results">
                  <nuxt-link :to="'/' + borderCountry" class="button-link small">{{results.name}}</nuxt-link>
                </template>
              </VAsync>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VAsync } from "vuetensils"
export default {
  async fetch({ store, params, route }) {
    await store.dispatch("countries/fetchCurrentCountry", route.params.name)
  },
  components: {
    VAsync
  },
  computed: {
    country() {
      return this.$store.state.countries.currentCountry
    },
    pageTitle() {
      return this.country.name
    }
  },
  head() {
    return {
      title: this.pageTitle
    }
  },
  methods: {
    httpRequest(url) {
      return fetch("https://restcountries.eu/rest/v2/alpha/" + url).then(res =>
        res.json()
      )
    }
  }
}
</script>

<style>
h1 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.button-link {
  display: inline-block;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  color: var(--text-very-dark-blue);
  padding: 0 2rem;
  line-height: 2.5rem;
  transition: all 0.2s;
  border: rgba(0, 0, 0, 0) 2px solid;
}

.button-link.small {
  padding: 0 1rem;
  line-height: 1.5rem;
}

.button-link:hover {
  box-shadow: var(--box-shadow-hover);
  border-color: var(--light-gray);
}

.country-grid-item:first-child {
  margin-bottom: 2rem;
}

.app-wrapper.dark .button-link {
  background-color: var(--dark-blue);
  color: var(--white);
}

.app-wrapper.dark .button-link:hover {
  border-color: var(--text-very-dark-blue);
}

.flag {
  width: 100%;
  height: auto;
}
.inline-list,
.inline-list li {
  padding: 0;
  margin: 0;
  list-style: none;
  display: inline-block;
}

.internal-grid > div {
  margin-bottom: 0.5rem;
}

.internal-grid > div:nth-child(5) {
  margin-bottom: 2rem;
}

.delimited:not(:last-child)::after {
  content: ", ";
}
.delimited:not(:first-child) {
  margin-left: 2px;
}

.button-list li:not(:first-child) {
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
}

.country-grid {
  margin-top: 2rem;
}

.internal-grid {
  margin-bottom: 2rem;
}

@media (min-width: 1024px) {
  h1 {
    font-size: 2rem;
  }

  .country-grid,
  .internal-grid {
    display: grid;
  }
  .country-grid {
    align-items: center;
    grid-column-gap: 100px;
    grid-template-columns: 1fr 1fr;
  }
  .internal-grid {
    grid-auto-flow: column;
    grid-row-gap: 5px;
    grid-column-gap: 5px;
    grid-template-rows: 1fr 1fr 1fr 1fr;
  }

  .internal-grid > div {
    margin-bottom: initial;
  }

  .internal-grid > div:nth-child(5) {
    margin-bottom: initial;
  }
}
</style>
