<template>
  <div
    id="google_signin"
    :class="{ loading }"
    ref="button"
  />
</template>

<script>
import { state, clientLoaded } from './client'
import { ref, onMounted } from 'vue'
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
  setup(props) {
    const loading = ref(false)
    const button = ref(null)

    onMounted(async () => {
      window.googleSigninCallback = async (response) => {
        loading.value = true
        props.callback(response)
        loading.value = false
      };

      await clientLoaded(() => {
        const idConfiguration = {
          ... props.idConfiguration,
          client_id: state.clientId,
          callback: window.googleSigninCallback,
        }
        window.google.accounts.id.initialize(idConfiguration);
        window.google.accounts.id.renderButton(button.value, props.buttonConfiguration)
        if (state.prompt === true) {
          window.google.accounts.id.prompt()
        }
      })
    })

    return {
      state,
      loading,
      button,
    }
  }
}
</script>

<style scoped>
.loading {
  opacity: 0.3;
  pointer-events: none;
}
</style>
