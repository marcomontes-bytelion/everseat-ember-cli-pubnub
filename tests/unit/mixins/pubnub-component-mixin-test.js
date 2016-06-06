import Ember from 'ember';
import PubnubComponentMixinMixin from 'everseat-ember-cli-pubnub/mixins/pubnub-component-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | pubnub component mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let PubnubComponentMixinObject = Ember.Object.extend(PubnubComponentMixinMixin);
  let subject = PubnubComponentMixinObject.create();
  assert.ok(subject);
});
