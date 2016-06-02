/* jshint node: true */
'use strict';

module.exports = {
  name: 'everseat-ember-cli-pubnub',
  isDevelopingAddon: function() {
    return false; // change this to true if you're developing
  },
  included: function(app, parentAddon) {
    var target = (parentAddon || app);
    this._super.included(target);
    target.import(app.bowerDirectory + '/pubnub/web/pubnub.min.js');
  }
};
