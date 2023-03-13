export const state = {
  pristine: true,
  prompt: true,
  clientId: null,
  idConfiguration: {},
  buttonConfiguration: {},
  authorizationConfiguration: {},
}

const callbacks = []

export const clientLoaded = (callback) => {
  if (!state.loaded) {
    callbacks.push(callback)
  } else {
    callback(window.google);
  }
}

export const clientLoad = new Promise((resolve) => {
  const script = document.createElement('script')
  state.pristine = false
  script.addEventListener('load', () => {
    state.loaded = true
    callbacks.forEach(_ => _())
    resolve(window.google)
  })
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  script.referrerPolicy = 'no-referrer-when-downgrade'
  document.head.appendChild(script)
})

export const onSignout = (callback = () => {}) => {
  clientLoaded(window.google.accounts.id.disableAutoSelect);
  callback();
}
