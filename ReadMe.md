# hook.io-sdk

## Provides a client sdk for accessing hook.io services

## Status: Working, but in progress.

### Features

 - Provides an easy way to run [hook.io](https://hook.io) API services
 - Designed for minimal size, memory, and cpu footprint
 - Does ship with a minimalist Command Line Interface
 - Choice of `Promise` or `Callback` style APIs

### Installation

```bash
npm install -g hook.io-sdk
```

### Available Endpoints

- [x] Hook ( basic )
- [x] Datastore
- [x] Logs
- [ ] Events
- [ ] Files
- [ ] Domains
- [ ] Keys
- [ ] Env
- [ ] Hook ( advanced )



### Usage

#### Command Line

```bash
echo "hello" | hook marak/echo
```

#### JavaScript Callback API

```js
var sdk = require("hook.io-sdk");
var client = sdk.createClient({});
client.hook.run('marak/echo', { "foo": "bar" }, function (err, res) {
  console.log(err, res)
});
```
#### JavaScript Promise API

```js
var sdk = require("hook.io-sdk");
var client = sdk.createClient({});
client.hook.run('marak/echo', { "foo": "bar" }).then(function (res){
  console.log(res)
}, function(err){
  console.log('error', err)
});
```

### Configuration

```bash
export HOOK_PRIVATE_KEY='put-your-api-access-key-here'
export HOOK_HOST='hook.io'
export HOOK_PORT='443'
export HOOK_PROTOCOL='https'
```

### TODO

- [x] Basic client creation and configuration 
- [x] Minimal pipeable CLI tool
- [x] Some hook.io API Methods
- [ ] Remove `request` in favor of `hyperquest`
- [ ] Add all hook.io API Methods
- [ ] Ability to pass command line arguments
- [ ] Ability to pipe arbitrary code snippets
- [ ] Multiple programming language implementations
- [ ] Add `ws://` protocol for Websockets API
