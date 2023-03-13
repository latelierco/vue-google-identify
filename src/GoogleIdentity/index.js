import {
  state,
  clientLoad,
  onSignout,
  requestCode,
} from './client'

export {
  onSignout,
  requestCode,
};

import GoogleButton from './GoogleButton.vue'

export default {
  install: (app, options) => {
    const { clientId, prompt, idConfiguration, buttonConfiguration, authorizationConfiguration } = options
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
    if (authorizationConfiguration) {
      state.authorizationConfiguration = authorizationConfiguration
    }
    clientLoad.catch(e => console.warn(e))
    app.component('GoogleButton', GoogleButton)
  },
}
