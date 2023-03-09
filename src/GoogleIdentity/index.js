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
    state.clientId = options.clientId
    clientLoad.catch(e => console.warn(e))
    app.component('GoogleButton', GoogleButton)
  },
}
