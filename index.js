#! /usr/bin/env node

const a0Tunnel = require('./lib')

if (require.main === module) {
  const port = process.argv[2]

  a0Tunnel.connect(port, (err, url) => {
    if (err) {
      return console.log(err.message)
    }

    console.log(`Your URL is: ${url}`)
  })
} else {
  module.exports = a0Tunnel
}