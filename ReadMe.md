# hook.io-sdk

## Provides a client sdk for accessing hook.io services

### Features

 - Provides an easy way to run [hook.io](https://hook.io) API services
 - Designed for minimal size, memory, and cpu footprint
 - Choice of `Promise` or `Callback` style APIs
 - Does ship with a minimalist Command Line Interface

### Installation

```bash
npm install -g hook.io-sdk
```

### Available Endpoints

- [x] Hook
- [x] Datastore
- [x] Logs
- [x] Events
- [x] Keys
- [X] Files - everything but streams
- [X] Env - missing hook.io/env refactor
- [X] Domains

### Usage

#### Many Examples

see: `/examples` folder

**Important**

Most SDK methods require an authorized API Access Key with valid role.

In order to use these `hook.io-sdk` methods, you must first generate an [API Access Key](https://hook.io/keys) at hook.io.

This API Access key will be used to communicate with the hook.io REST API.

Simply add this `accessKey` to the client configuration.

#### Command Line

```bash
echo "hello" | hook marak/echo
```

#### JavaScript Callback API

```js
var sdk = require("hook.io-sdk");
var client = sdk.createClient({});

client.hook.run({ owner: "examples", name: "echo", method: "POST", data:  { "foo": "bar" } }, function (err, res) {
  console.log(err, res)
});
```
#### JavaScript Promise API

Simply make sure to set the `promises` configuration option to `true` when calling `sdk.createClient`.

```js
var sdk = require("hook.io-sdk");
var client = sdk.createClient({ promises: true });

client.hook.run({ owner: "examples", name: "echo", method: "POST", data:  { "foo": "bar" } }).then(function (res){
  console.log(res)
}, function(err){
  console.log('error', err)
});
```

Now all SDK API methods have promises!

### Configuration

```js
{
  host: "hook.io",
  port: 443,
  protocol: 'https',
  accessKey: "12345"
}
```

Generate Access Keys at [https://hook.io/keys](https://hook.io/keys)

### TODO

- [x] Basic client creation and configuration 
- [x] Minimal pipeable CLI tool
- [x] Most hook.io API Methods
- [ ] Better ENV exports configuration
- [X] Add all hook.io API Methods
- [X] Ability to pass command line arguments
- [ ] Ability to pipe arbitrary code snippets
- [X] Multiple programming language implementations
- [ ] Add `ws://` protocol for Websockets API
