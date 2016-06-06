# Everseat-ember-cli-pubnub

This is the addon for using pubnub with Ember on the everseat projects.

## Installation

In the ember project, run:

* `ember install everseat/everseat-ember-cli-pubnub`

## Configuration

Add to the `config/environment.js`

```
  var ENV = {
    // Other configuration settings...
    pubnub: {
      subscribe_key: 'sub-c-4997630a-8794-11e4-9085-02ee2ddab7fe',
      restore: true,
      ssl: true
    }
  };
```

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).


## Development

* Clone the project locally
* Change directory to the EMBER project folder
* Remove the existing node_modules directory
* THEN link to the local project using `npm link [local-project-dir]/everseat-ember-cli-pubnub`
* And enable live-reloading by editing `everseat-ember-cli-pubnub/index.js` and change the isDevelopingAddon. [http://ember-cli.com/extending/#link-to-addon-while-developing]

## Usage

