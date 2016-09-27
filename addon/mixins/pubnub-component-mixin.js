import Ember from 'ember';

export default Ember.Mixin.create({

  pushNotifications: Ember.inject.service('pubnub'),
  notificationsEnabled: false,

  messageHandler(message, self, actionHandler) {
    self.send(actionHandler, message);
  },

  didRender() {
    if (!this.get('notificationsEnabled')) {
      Ember.debug('component mixin subscribe');
      const pubnubChannel = this.get('pubnubChannel');
      const pubnubActionHandler = this.get('pubnubActionHandler');
      Ember.assert("Subscribe failed. 'pubnubChannel' property is not defined. It may either be a string or Ember.computed type",
          pubnubChannel);
      Ember.assert("Subscribe failed. 'pubnubActionHandler' property is not defined. The name of the function defined in the { actions } paramters of the route",
          pubnubActionHandler);
      const pn = this.get('pushNotifications');
      const self = this;
      pn.emSubscribe({
        channel: pubnubChannel,
        message: (args) => {
          const message = (args.length > 0 && args[0] !== undefined) ? args[0] : {};
          this.messageHandler(message, self, pubnubActionHandler);
          self.set('notificationsEnabled', true);
        }
      });
    }
    this._super(...arguments);
  },

  willDestroyElement() {
    Ember.debug('component mixin unsubscribe');
    const pubnubChannel = this.get('pubnubChannel');
    const pn = this.get('pushNotifications');
    pn.emUnsubscribe({ channel: pubnubChannel });
    this._super(...arguments);
  }
});
