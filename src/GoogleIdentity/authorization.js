import {
  state,
  clientLoaded
} from './client'

export const requestAccessToken = () => {
  return new Promise((resolve, reject) => {
    clientLoaded((google) => {
      google.accounts.oauth2
        .initTokenClient({
          client_id: state.clientId,
          scope: state.authorizationConfiguration.scope,
          callback: (response) => {
            if (response.access_token) {
              resolve(response);
            } else {
              reject(response);
            }
          },
        })
        .requestAccessToken();
    });
  });
};

// # Code flow
export const requestCode = () => {
  return new Promise((resolve, reject) => {
    clientLoaded((google) => {
      google.accounts.oauth2
        .initCodeClient({
          client_id: state.clientId,
          scope: state.authorizationConfiguration.scope,
          ux_mode: 'popup',
          callback: (response) => {
            if (response.code) {
              resolve(response);
            } else {
              reject(response);
            }
          },
        })
        .requestCode();
    });
  });
};
