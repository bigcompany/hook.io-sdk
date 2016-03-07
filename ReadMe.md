# hook.io-sdk

## Provides a client sdk for accessing hook.io services

## Status: Working, but in progress.

### Features

 - Provides an easy way to run [hook.io](https://hook.io) API services
 - Designed for minimal size, memory, and cpu footprint
 - Does ship with a minimalist Command Line Interface

### Installation

```bash
npm install -g hook.io-sdk
```

### Usage

#### Command Line

```bash
echo "hello" | hook marak/echo
```

#### JavaScript

```js
var sdk = require("hook.io-sdk");
var client = sdk.createClient({});
client.hook.run('marak/echo', { "foo": "bar" }, function (err, res) {
  console.log(err, res)
});
```

### Configuration

```bash
export HOOK_PRIVATE_KEY='put-your-api-access-key-here'
export HOOK_HOST='hook.io'
export HOOK_PORT='80'
export HOOK_PROTOCOL='https'
```

### TODO

- [x] Basic client creation and configuration 
- [x] Minimal pipeable CLI tool
- [x] Some hook.io API Methods
- [ ] Remove `request` in favor of `hyperquest`
- [ ] Add all hook.io API Methods
- [ ] Ability to pass command line arguments
- [ ] Ability to pipe abritrary code snippets
- [ ] Multiple programming language implementations
- [ ] Add `ws://` protocol for Websockets API
