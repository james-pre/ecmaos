function register() {
  navigator.serviceWorker
    .register('/swapi.ts', { scope: '/swapi', type: 'module' })
    .then(
      function (_registration) {
        console.log('Register Service Worker: Success')
      },
      function (_error) {
        console.log('Register Service Worker: Error', _error)
      }
    )
}
function start() {
  navigator.serviceWorker
    .getRegistrations()
    .then(function (registrations) {
      for (const registration of registrations) {
        console.log('Unregister Service Worker')
        registration.unregister()
      }
      register()
    })
}
start()