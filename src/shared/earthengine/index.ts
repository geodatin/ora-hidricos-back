import ee from '@google/earthengine'

import privateKey from '../../../.private-key.json'

// Initialize client library
const init = function () {
  ee.initialize(
    null,
    null,
    function () {
      console.log('EarthEngine initialized.')
    },
    function (e) {
      console.error('Initialization error: ' + e)
    }
  )
}

export function initializeEarthEngine() {
  // Authenticate using a service account.
  ee.data.authenticateViaPrivateKey(privateKey, init, function (e) {
    console.error('Authentication error: ' + e)
  })
}
