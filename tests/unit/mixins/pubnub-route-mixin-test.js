import Ember from 'ember';
import PubnubRouteMixinMixin from 'everseat-ember-cli-pubnub/mixins/pubnub-route-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | pubnub route mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let PubnubRouteMixinObject = Ember.Object.extend(PubnubRouteMixinMixin);
  let subject = PubnubRouteMixinObject.create();
  assert.ok(subject);
});
