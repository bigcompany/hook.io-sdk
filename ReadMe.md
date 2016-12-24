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

- Hook
- Datastore
- Domains
- Logs
- Events
- Keys
- Files
- Env
- Domains

### Usage

#### 40+ SDK Code Examples

The easiest way to get started using the SDK is by checking out the examples folder.

see: `/examples`

**Authorization**

Most SDK methods require an authorized API Access Key with a corresponding access role. In order to use these authorized API methods, you must first generate an [API Access Key](https://hook.io/keys) for free at hook.io.

Once you have an API Access key, simply add this `hook_private_key` to the sdk client configuration. This will enable authorized communication with the hook.io REST API.


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

#### CLI Usage

```
Usage: hook [options] [command]

Commands:

  clone       clones existing hook
  config      manage SDK config
  deploy      deploy hook to the cloud
  alias       create hostname alias for hook
  examples    show list of example hooks
  get         get hook document
  init        initialize new local service
  list        list all hooks
  run         run hook in the cloud
  whoami      returns currently logged in user
  help [cmd]  display help for [cmd]

Options:

  -h, --help     output usage information
  -V, --version  output the version number

Notes:

  All commands are available as separate git style binaries
  Such as: hook-list, hook-info, hook-run, hook-deploy, etc
```

Many commands also contain additional sub-commands. See `./bin` for more details.

### Configuration

#### CLI

The quickest way to configure the `hook.io-sdk` with `hook.io` is by running the following command:

```bash
   hook config key
```

This will open a prompt asking for a valid `hook_private_key` which may be generated at [https://hook.io/keys](https://hook.io/keys).

#### SDK Configuration Options


```js
{
  host: "hook.io",
  port: 443,
  protocol: 'https',
  hook_private_key: "12345"
}
```

Generate Access Keys at [https://hook.io/keys](https://hook.io/keys)