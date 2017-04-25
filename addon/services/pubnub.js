import Ember from 'ember';
import Config from './../configuration';

const PubNubService = Ember.Service.extend(Ember.Evented, {
  pubnub: null,
  pnlisteners: {},

  init() {
    Ember.assert('PubNub configuration is not set. See README.md for everseat-ember-cli-pubnub', !Ember.isEmpty(Config.subscribe_key));
    const pubnub = this.get('pubub');
    if (!pubnub) {
      const PubNub = new window.PubNub(Config);
      this.set('pubnub', PubNub);
    }
  },
  emSubscribe: function(args) {
    Ember.assert('PUBNUB: subscribe channel is empty', !Ember.isEmpty(args.channel));
    Ember.assert('PUBNUB: message function is empty', !Ember.isEmpty(args.message));
    const pubnub = this.get('pubnub');
    const listeners = this.get('pnlisteners');
    listeners[args.channel] = {
       message: args.message,
       status: this.statusEvent,
       presence: this.presenceEvent
    };
    this.set('listeners', listeners);
    pubnub.addListener(listeners[args.channel]);
    pubnub.subscribe({ channels: [args.channel], withPresence: true });
  } ,
  emUnsubscribe: function(args) {
    Ember.assert('PUBNUB: unsubscribe channel is empty', !Ember.isEmpty(args.channel));
    const pubnub = this.get('pubnub');
    const listeners = this.get('pnlisteners');
    if (listeners[args.channel]) {
      pubnub.removeListener(listeners[args.channel]);
      pubnub.unsubscribe({ channels: [args.channel] });
      delete listeners[args.channel];
      this.set('listeners', listeners);
    }
  },
  statusEvent: function(statusEvent) { },
  presenceEvent: function(presenceEvent) { }
});

export default PubNubService;
