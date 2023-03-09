<template>
  <GoogleButton
    :callback="callback"
    v-if="!logged"
  />
  <div
    @click="signout"
    v-else
    class="button"
  >
    Sign out
  </div>
</template>

<script>
import { ref } from 'vue'
import { onSignout } from './GoogleIdentity'

export default {
  name: 'App',
  setup() {
    const logged = ref(false)
    const callback = (response) => {
      console.log(response)
      if (response.credential) {
        logged.value = true
      }
    }
    const signout = () => {
      logged.value = false
      onSignout()
    }
    return {
      logged,
      callback,
      signout
    }
  }
}
</script>

<style>
html,
body {
  height: 100%;
  padding: 0;
  margin: 0;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.button {
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  padding: 10px;
  cursor: pointer;
}
.button:hover {
  background: rgba(66,133,244,.04);
  border-color: #d2e3fc;
}
</style>
