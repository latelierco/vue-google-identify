import {
  state,
  clientLoad,
  onSignout,
} from './client'

export {
  onSignout,
};

import GoogleButton from './GoogleButton.vue'

export default {
  install: (app, options) => {
    const { clientId, prompt, idConfiguration, buttonConfiguration } = options
    state.clientId = clientId
    if (prompt) {
      state.prompt = prompt
    }
    if (idConfiguration) {
      state.idConfiguration = idConfiguration
    }
    if (buttonConfiguration) {
      state.buttonConfiguration = buttonConfiguration
    }
    clientLoad.catch(e => console.warn(e))
    app.component('GoogleButton', GoogleButton)
  },
}
