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

#### 40+ SDK Code Examples

The easiest way to get started using the SDK is by checking out the examples folder.

see: `/examples`

**Important**

Most SDK methods require an authorized API Access Key with a corresponding access role. In order to use these authorized API methods, you must first generate an [API Access Key](https://hook.io/keys) for free at hook.io.

Once you have an API Access key, simply add this `accessKey` to the sdk client configuration. This will enable authorized communication with the hook.io REST API.


#### Callback Style API

```js
var sdk = require("hook.io-sdk");
var client = sdk.createClient({});

client.hook.run({
  owner: "examples",
  name: "echo",
  method: "POST",
  data:  { "foo": "bar" }
 }, function (err, res) {
  console.log(err, res)
});
```
#### Promise Style API

To enable promises, make sure to set the `promises` configuration option to `true` when calling `sdk.createClient`.

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

- [ ] Better ENV exports configuration
- [ ] Add `ws://` protocol for Websockets API
