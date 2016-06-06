import Ember from 'ember';

export default Ember.Mixin.create({

  pushNotifications: Ember.inject.service('pubnub'),

  didInsertElement() {
    const pubnubChannel = this.get('pubnubChannel');
    Ember.assert("Subscribe failed. 'pubnubChannel' property is not defined. It may either be a string or Ember.computed type",
        pubnubChannel);
    const pn = this.get('pushNotifications');
    const self = this;
    pn.emSubscribe({
      channel: pubnubChannel,
      message: this.actions.pubnubMessageHandler
    });
    this._super(...arguments);
  },

  willDestroyElement() {
    const pubnubChannel = this.get('pubnubChannel');
    const pn = this.get('pushNotifications');
    pn.emUnsubscribe({ channel: pubnubChannel });
    this._super(...arguments);
  },

  actions: {
    pubnubMessageHandler(args) {
      const [message] = args;
      Ember.Logger.debug('Push Notification:', message);
      Ember.assert("Pubnub Handler, { actions: pubnubMessageHandler } not defined");
      /*
      message([ message ]) {
        Ember.Logger.debug('Push Notification:', message);
        const { pushType } = message;
        if (pushType === 'CONFIRMED_SEAT_NOTIFICATION' || pushType === 'DENIED_SEAT_NOTIFICATION') {
          self.incrementProperty('count');
          self.sendAction('receivedNotification', _.omit(message, ['pn_gcm', 'pn_apns']));
        }
      }
      */
    }
  }
});
