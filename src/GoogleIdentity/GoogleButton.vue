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
    buttonConfiguration: {
      type: Object,
      default: () => { return {} }
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
        window.google.accounts.id.initialize({
          client_id: state.clientId,
          callback: window.googleSigninCallback,
        });
        window.google.accounts.id.renderButton(button.value, props.buttonConfiguration)
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
