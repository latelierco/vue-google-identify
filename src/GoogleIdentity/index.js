import {
  state,
  clientLoad,
  onSignout,
} from './client'

import {
  requestAccessToken,
  requestCode,
} from './authorization'

export {
  onSignout,
  requestAccessToken,
  requestCode,
};

import SignIn from './SignIn.vue'

export default {
  install: (app, options) => {
    const { clientId, prompt, idConfiguration, buttonConfiguration, authorizationConfiguration } = options
    state.clientId = clientId
    if ("prompt" in options) {
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
    app.component('GoogleSignIn', SignIn)
  },
}
