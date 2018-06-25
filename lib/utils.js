const os = require('os')
const https = require('https')

const getHostname = () => {
  return os.hostname().toLowerCase()
}

const isInt = (str) => {
  return /^\d+$/.test(str)
}

const _get = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      resolve(res.statusCode)
    })
  })
}

const _sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const pingHost = async (url, cb) => {
  const MAX_RETRIES = 5
  const DELAY = 2000
  let retries = 0

  let statusCode = 502
  
  while (retries < MAX_RETRIES) {
    statusCode = await _get(url)
    retries++

    if (statusCode === 200) {
      cb(statusCode)
    }

    await _sleep(DELAY)
  }

  cb(statusCode)
}

module.exports = {
  getHostname,
  pingHost,
  isInt
}