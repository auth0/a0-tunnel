const { spawn } = require('child_process')

const {
  registerCleanUpHandlers,
  registerStreamHandlers
} = require('./handlers')
const utils = require('./utils')

const connect = (localPort, cb) => {
  const LOCAL_HOST = 'localhost'
  const LOCAL_PORT = localPort
  const REMOTE_HOST = process.env.A0_TUNNEL_REMOTE_HOST
  const REMOTE_PORT = process.env.A0_TUNNEL_REMOTE_PORT
  const HOSTNAME = utils.getHostname()
  const URL = `https://${HOSTNAME}.${REMOTE_HOST}`

  if (!LOCAL_PORT || !utils.isInt(LOCAL_PORT))
    return cb(new Error('A valid local port must be specified'))

  if (!REMOTE_HOST)
    return cb(new Error('The environment variable A0_TUNNEL_REMOTE_HOST must be specified'))

  if (!REMOTE_PORT || !utils.isInt(REMOTE_PORT))
    return cb(new Error('The environment variable A0_TUNNEL_REMOTE_PORT must be a valid port'))

  const tunnel = spawn('ssh', [
    `-TR${REMOTE_PORT}:${LOCAL_HOST}:${LOCAL_PORT}`,
    `${HOSTNAME}@${REMOTE_HOST}`
  ], {
    detached: true
  })

  registerCleanUpHandlers(tunnel)
  registerStreamHandlers(tunnel, URL, (err) => {
    if (err) {
      return cb(err)
    }

    cb(null, URL)
  })
  tunnel.unref()
}

module.exports = {
  connect
}
