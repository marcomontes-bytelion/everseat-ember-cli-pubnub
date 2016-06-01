/* jshint node: true */
'use strict';

module.exports = {
  name: 'everseat-ember-cli-pubnub',
  included: function(app, parentAddon) {
    var target = (parentAddon || app);
    this._super.included(target);
    target.import(app.bowerDirectory + '/pubnub/web/pubnub.min.js');
  }
};
