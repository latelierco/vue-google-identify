<template>
  <div
    @click="requestImplicitAcces"
    v-if="!logged"
    class="button"
  >
    Implicit flow drive access
  </div>
  <div
    @click="requestCodeAcces"
    v-if="!logged"
    class="button"
  >
    Authorization code flow drive access
  </div>
  <GoogleSignIn
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
import { onSignout, requestAccessToken, requestCode } from './GoogleIdentity'

export default {
  name: 'App',
  setup() {
    const logged = ref(false)
    const callback = (response) => {
      if (response.credential) {
        logged.value = true
      }
    }
    const signout = () => {
      logged.value = false
      onSignout()
    }
    const requestImplicitAcces = async () => {
      const response = await requestAccessToken();
      if (response.access_token) {
        logged.value = true
      }
    }
    const requestCodeAcces = async () => {
      const response = await requestCode();
      if (response.code) {
        logged.value = true
      }
    }
    return {
      logged,
      callback,
      signout,
      requestImplicitAcces,
      requestCodeAcces
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
  gap: 10px;
}
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-direction: column;
}
.button {
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  padding: 10px;
  cursor: pointer;
  text-align: center;
}
.button:hover {
  background: rgba(66,133,244,.04);
  border-color: #d2e3fc;
}
</style>
