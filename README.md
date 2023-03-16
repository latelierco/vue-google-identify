# Vue Google Identity

<p>
  <a href="https://www.npmjs.com/package/vue-google-identity"><img src="https://img.shields.io/npm/v/vue-google-identity" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue-google-identity"><img src="https://img.shields.io/npm/dy/vue-google-identity" alt="Downloads"></a>
</p>

## Overview
[Google Sign-in](https://developers.google.com/identity/sign-in/web/sign-in) is set to be deprecated after March 31, 2023. It is now replaced by [Google Identity](https://developers.google.com/identity) separate in two libraries for web [Authentification](https://developers.google.com/identity/gsi/web/guides/overview) and [Authorization](https://developers.google.com/identity/oauth2/web/guides/overview)

[Feedback](https://github.com/latelierco/vue-google-identity/issues) are much welcomed.

### Local development consideration
- [Add both http://localhost *and* http://localhost:<port_number>](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#get_your_google_api_client_id).

## Migration guide


### Authentification
If you don't need scope (or using only `email, profile, and openid`) and you were previously using `gapi.auth2.authorize` [`id_token`](https://developers.google.com/identity/sign-in/web/reference#gapiauth2authorizeresponse), you will need to use [Authentification Google Sign-in Button](https://developers.google.com/identity/gsi/web/guides/overview) that now return a [`credential`](https://developers.google.com/identity/gsi/web/reference/js-reference#CredentialResponse) (instead of [`id_token`](https://developers.google.com/identity/sign-in/web/reference#gapiauth2authorizeresponse) (wrapped here in `<GoogleSignIn />`)).

### Authorization
If you need any other [scope](https://developers.google.com/identity/protocols/oauth2/scopes) you probably will need to implement one of the 2 following flows: 
#### 1. [OAuth 2.0 authorization code flow (or Code Model)](https://developers.google.com/identity/oauth2/web/guides/use-code-model)
Your server calls Google APIs on a user's behalf. You were sending a `offlineCode` to your backend.
You will need to use [initCodeClient](https://developers.google.com/identity/oauth2/web/reference/js-reference#google.accounts.oauth2.initCodeClient) (wrapped here in method `requestCode`) that returns a [`code`](https://developers.google.com/identity/oauth2/web/reference/js-reference#CodeClient).

#### 2. [OAuth 2.0 implicit grant flow (or Token Model)](https://developers.google.com/identity/oauth2/web/guides/use-token-model)
The browser calls Google APIs. No backend were needed.
You will need to use [initTokenClient](https://developers.google.com/identity/oauth2/web/reference/js-reference#google.accounts.oauth2.initTokenClient) (wrapped here in method `requestAccessToken`) that returns an [`access_token`](https://developers.google.com/identity/oauth2/web/reference/js-reference#TokenResponse).

## Installation
```
npm install -S vue-google-identity
```

## Setup
### Register plugin
Add GoogleIdentity plugin to your App in `main.js` file, it will:
- Load the Google Identity client `https://accounts.google.com/gsi/client`;
- Register a component `GoogleSignIn` component that display a [Authentification Google Sign-in Button](https://developers.google.com/identity/gsi/web/guides/personalized-button).
**You will need to specify your [Google API Client ID](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid), mind to use `.env`**

```javascript
import GoogleIdentity from 'vue-google-identity'

app.use(GoogleIdentity, {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
})
```

### Usage

You can use callback prop to access the response's `credential`.

```vue
<template>
  <GoogleSignIn :callback="callback"/>
</template>

<script>
export default {
  setup() {
    const callback = (response) => {
      console.log(response.credential)
    }
    return { callback }
  }
}
</script>
```

## Methods
### Sign out

To sign out you can use [`onSignout`](https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.disableAutoSelect) function.

```javascript
import { onSignout } from 'vue-google-identity'

onSignout()
```

### Request code

To request code, you can use `requestCode` that wraps [`initCodeClient`](https://developers.google.com/identity/oauth2/web/reference/js-reference#google.accounts.oauth2.initCodeClient) function.

```javascript
import { requestCode } from 'vue-google-identity'

const response = await requestCode();
if (response.code) {
  logged.value = true
}
```

### Request access token

To request code, you can use `requestAccessToken` that wraps [`initTokenClient`](https://developers.google.com/identity/oauth2/web/reference/js-reference#google.accounts.oauth2.initTokenClient) function.

```javascript
import { requestAccessToken } from 'vue-google-identity'

const response = await requestAccessToken();
if (response.access_token) {
  logged.value = true
}
```

## Roadmap
 * [x] [Loading client](https://developers.google.com/identity/gsi/web/guides/client-library)
 * [ ] Loaded callback
 * [x] [Sign in](https://developers.google.com/identity/gsi/web/guides/display-button)
 * [x] [Sign out](https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.disableAutoSelect) 
 * [x] [One tap prompt](https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.prompt) 
 * [x] Custom [Button Configuration](https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration)
 * [x] Custom [Identity Configuration](https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.initialize)
 * [ ] Custom GoogleSignIn Button layout (under consideration)
 * [x] [Implicit flow](https://developers.google.com/identity/oauth2/web/guides/choose-authorization-model)
 * [x] [Authorization code flow](https://developers.google.com/identity/oauth2/web/guides/choose-authorization-model)
 * [x] [Authorization model handling errors](https://developers.google.com/identity/oauth2/web/guides/error)
 * [x] Migration guide

<p>
  <a href="https://twitter.com/uwutrinket"><img src="https://img.shields.io/twitter/follow/uwutrinket?style=social" alt="Twitter"></a>
</p>
