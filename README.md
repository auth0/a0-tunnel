# wormhole

A simple package for establishing an SSH tunnel for local development

## Usage

Set the environment variables:
  - `WORMHOLE_REMOTE_HOST` - the remote host you are connecting to
  - `WORMHOLE_REMOTE_PORT` - the remote port assigned to you by the host

Import the module establish a connection exposing port `3000`:

```js
const wormhole = require('wormhole')

wormhole.connect(3000, (err, url) => {
  if (err) {
    throw err
  }

  console.log(`Your URL is: ${url}`)
})
```

## CLI Usage

This module can also be used via the CLI, like so:

```bash
WORMHOLE_REMOTE_HOST='...' \
WORMHOLE_REMOTE_PORT=... \
wormhole 3000
```
