export const state = () => ({
  allCountries: [],
  currentCountry: []
})

export const mutations = {
  setCountries(state, country) {
    state.allCountries.push(country)
  },
  setCurrentCountry(state, country) {
    state.currentCountry = country
  }
}

export const actions = {
  async fetchAllCountries({ commit }) {
    let countries = await this.$axios.$get("all")
    commit("setCountries", countries)
  },
  async fetchCurrentCountry({ commit }, name) {
    let country = await this.$axios.$get("alpha/" + name)
    commit("setCurrentCountry", country)
  }
}
