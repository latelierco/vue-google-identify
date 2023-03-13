# Vue Google Identity

<p>
  <a href="https://www.npmjs.com/package/vue-google-identity"><img src="https://img.shields.io/npm/v/vue-google-identity" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue-google-identity"><img src="https://img.shields.io/npm/dy/vue-google-identity" alt="Downloads"></a>
</p>

## Overview
You might be here cause you've been task to migrate from [Google Sign-in](https://developers.google.com/identity/sign-in/web/sign-in)([deprecated](https://developers.googleblog.com/2021/08/gsi-jsweb-deprecation.html)) to [Google Identity](https://developers.google.com/identity/gsi/web/guides/migration#authentication_and_authorization)

## Installation
```
npm install -S vue-google-identity
```

https://developers.google.com/identity/gsi/web/guides/overview

## Setup
### Register plugin
Add GoogleIdentity plugin to your App in `main.js` file, it will:
- Load the Google Identity client `https://accounts.google.com/gsi/client`;
- Register a component `GoogleButton` component that display a [Google Button](https://developers.google.com/identity/gsi/web/guides/personalized-button).
**You will need to specify your [Google API Client ID](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid), mind to use `.env`**

```javascript
import { createApp } from 'vue'
import App from './App.vue'

import GoogleIdentity from 'vue-google-identity'

const app = createApp(App)

app.use(GoogleIdentity, {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
})

app.mount('#app')
```

### Usage

You can use callback prop to access the response's `credential`.

```vue
<template>
  <GoogleButton :callback="callback"/>
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

## Roadmap
 * [x] [Loading client](https://developers.google.com/identity/gsi/web/guides/client-library)
 * [ ] Loaded callback
 * [x] [Sign in](https://developers.google.com/identity/gsi/web/guides/display-button)
 * [x] [Sign out](https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.disableAutoSelect) 
 * [x] [One tap prompt](https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.prompt) 
 * [x] Custom [Button Configuration](https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration)
 * [x] Custom [Identity Configuration](https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.initialize)
 * [ ] Custom Button layout (under consideration)
 * [x] [Implicit flow](https://developers.google.com/identity/oauth2/web/guides/choose-authorization-model)
 * [x] [Authorization code flow](https://developers.google.com/identity/oauth2/web/guides/choose-authorization-model)
 * [ ] [Authorization model handling errors](https://developers.google.com/identity/oauth2/web/guides/error)

<p>
  <a href="https://twitter.com/uwutrinket"><img src="https://img.shields.io/twitter/follow/uwutrinket?style=social" alt="Twitter"></a>
</p>
