#! /usr/bin/env node

const wormhole = require('./lib')

if (require.main === module) {
  const port = process.argv[2]
  
  if (!port) {
    return console.log('A valid local port must be specified')
  }

  wormhole.connect(port, (err, url) => {
    if (err) {
      return console.log(err.message)
    }

    console.log(`Your URL is: ${url}`)
  })
} else {
  module.exports = wormhole
}
