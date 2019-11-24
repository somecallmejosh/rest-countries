<template>
  <div class="app-wrapper" :class="{dark : colorModeDark}">
    <header>
      <div class="gutter">
        <p>Where in the world?</p>
        <button @click="toggleColorMode">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M279.135 512c78.756 0 150.982-35.804 198.844-94.775 28.27-34.831-2.558-85.722-46.249-77.401-82.348 15.683-158.272-47.268-158.272-130.792 0-48.424 26.06-92.292 67.434-115.836 38.745-22.05 28.999-80.788-15.022-88.919A257.936 257.936 0 0 0 279.135 0c-141.36 0-256 114.575-256 256 0 141.36 114.576 256 256 256zm0-464c12.985 0 25.689 1.201 38.016 3.478-54.76 31.163-91.693 90.042-91.693 157.554 0 113.848 103.641 199.2 215.252 177.944C402.574 433.964 344.366 464 279.135 464c-114.875 0-208-93.125-208-208s93.125-208 208-208z"/></svg>
          <span v-if="!colorModeDark">Dark Mode</span>
          <span v-else>Light Mode</span>
        </button>
      </div>
    </header>
    <main>
      <nuxt />
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      colorModeDark: false
    }
  },
  methods: {
    toggleColorMode() {
      console.log("I am running.")
      this.colorModeDark = !this.colorModeDark
    }
  }
}
</script>
<style>
html {
  -moz-osx-font-smoothing: grayscale;
  -ms-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
  box-sizing: border-box;
  font-family: "Nunito Sans", sans-serif;
  font-size: 16px;
  word-spacing: 1px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

header p {
  font-size: var(--text-default);
  font-weight: bold;
}

.app-wrapper {
  background-color: var(--very-light-gray);
  color: var(--text-very-dark-blue);
}

.app-wrapper.dark {
  background-color: var(--very-dark-blue);
  color: var(--white);
}

.app-wrapper.dark header,
.app-wrapper.dark button {
  background-color: var(--dark-blue);
  color: var(--white);
}

.app-wrapper.dark svg {
  fill: var(--white);
}

button {
  align-items: center;
  appearance: none;
  background-color: var(--white);
  cursor: pointer;
  border: none;
  display: flex;
  font-size: var(--text-small);
  height: 100%;
}

button svg {
  height: 0.8rem;
  transform: translateY(1px) translateX(-4px);
}

main,
header .gutter {
  margin: 0 auto;
  max-width: 1283px;
}

header {
  background-color: var(--white);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

header .gutter {
  align-items: center;
  display: flex;
  height: 5rem;
  justify-content: space-between;
  padding: 0 1rem;
}

main {
  padding: 3rem 1rem;
}
</style>
