# a0-tunnel

A simple package for establishing an SSH tunnel for local development

## Usage

Set the environment variables:
  - `A0_TUNNEL_REMOTE_HOST` - the remote host you are connecting to
  - `A0_TUNNEL_REMOTE_PORT` - the remote port assigned to you by the host

Import the module establish a connection exposing port `3000`:

```js
const a0Tunnel = require('a0-tunnel')

a0Tunnel.connect(3000, (err, url) => {
  if (err) {
    throw err
  }

  console.log(`Your URL is: ${url}`)
})
```

## CLI Usage

This module can also be used via the CLI, like so:

```bash
A0_TUNNEL_REMOTE_HOST='...' \
A0_TUNNEL_REMOTE_PORT=... \
a0-tunnel 3000
```