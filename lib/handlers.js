const registerStreamHandlers = (tunnel, url, cb) => {
  const errorHandler = (data) => {
    cb(data.toString('utf8'))
  }

  tunnel.stdout.once('data', (data) => {
    // remove the stderr stream callback once we recieve data
    // since we know we would have successfully connected
    tunnel.stderr.removeListener('data', errorHandler)

    cb(null)
  })

  tunnel.stderr.once('data', errorHandler)
}

const registerCleanUpHandlers = (tunnel) => {
  [
    'exit',
    'SIGINT',
    'uncaughtException',
    'unhandledRejection'
  ].forEach(event => {
    process.on(event, (err) => {
      if (err && err !== 'SIGINT') console.log(err)
      tunnel.kill()
    })
  })
}

module.exports = {
  registerStreamHandlers,
  registerCleanUpHandlers
}