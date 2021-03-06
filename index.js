/* jshint node: true */
'use strict';

module.exports = {
  name: 'everseat-ember-cli-pubnub',
  isDevelopingAddon: function() {
    return false; // set this to true for development
  },
  included: function(app, parentAddon) {
    var target = (parentAddon || app);
    this._super.included(target);
    target.import(app.bowerDirectory + '/pubnub/dist/web/pubnub.min.js');
    target.import('vendor/everseat-ember-cli-pubnub/register-version.js');
  }
};
