<template>
  <div
    id="google_signin"
    :class="{ loading }"
    ref="button"
  />
</template>

<script>
import { state, clientLoaded } from './client'
export default {
  props: {
    callback: {
      type: Function,
      default: () => {}
    },
    idConfiguration: {
      type: Object,
      default: () => { return state.idConfiguration }
    },
    buttonConfiguration: {
      type: Object,
      default: () => { return state.buttonConfiguration }
    }
  },
  data() {
    return {
      loading: false
    }
  },
  async mounted() {
    const button = this.$refs.button;

    window.googleSigninCallback = async (response) => {
      this.loading = true
      await this.callback(response)
      this.loading = false
    };

    await clientLoaded(() => {
      const idConfiguration = {
        ... this.idConfiguration,
        client_id: state.clientId,
        callback: window.googleSigninCallback,
      }
      window.google.accounts.id.initialize(idConfiguration);
      window.google.accounts.id.renderButton(button, this.buttonConfiguration)
      if (state.prompt === true) {
        window.google.accounts.id.prompt()
      }
    })
  },
}
</script>

<style scoped>
.loading {
  opacity: 0.3;
  pointer-events: none;
}
</style>
