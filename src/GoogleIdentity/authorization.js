import {
  state,
  clientLoaded
} from './client'

// NonOAuthError
const error_callback = (err) => {
  if (err.type == 'Non-OAuth Error: popup_failed_to_open') {
    console.warn('The popup window is failed to open');
  } else if (err.type == 'popup_closed') {
    console.warn('Non-OAuth Error: The popup window is closed before an OAuth response is returned');
  }
};

// # Implicit flow
export const requestAccessToken = () => {
  return new Promise((resolve, reject) => {
    clientLoaded((google) => {
      google.accounts.oauth2
        .initTokenClient({
          ...state.authorizationConfiguration,
          client_id: state.clientId,
          callback: (response) => {
            if (response.error) {
              console.warn(`OAuth Error: ${response.error}`);
              reject(response);
            } else if (response.access_token) {
              resolve(response);
            }
          },
          error_callback,
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
          ...state.authorizationConfiguration,
          client_id: state.clientId,
          ux_mode: 'popup',
          callback: (response) => {
            if (response.error) {
              console.warn(`OAuth Error: ${response.error}`);
              reject(response);
            } else if (response.code) {
              resolve(response);
            }
          },
          error_callback,
        })
        .requestCode();
    });
  });
};
