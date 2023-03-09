import { reactive, watch } from 'vue'

export const state = reactive({
  pristine: true,
  loaded: false,
  clientId: null,
})

export const clientLoaded = (callback) => {
  if (!state.loaded) {
    const unwatch = watch(
      () => state.loaded,
      (loaded) => {
        loaded && callback(window.google);
        unwatch();
      }
    )
  } else {
    callback(window.google);
  }
}

export const clientLoad = new Promise((resolve) => {
  const script = document.createElement('script')
  state.pristine = false
  script.addEventListener('load', () => {
    state.loaded = true
    resolve(window.google)
  })
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  script.referrerPolicy = 'no-referrer-when-downgrade'
  document.head.appendChild(script)
})

export const onSignout = () => {
  clientLoaded(window.google.accounts.id.disableAutoSelect);
}
