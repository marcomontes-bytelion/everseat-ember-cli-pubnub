import Ember from 'ember';

export default Ember.Mixin.create({

  pushNotifications: Ember.inject.service('pubnub'),

  messageHandler(message, self, actionHandler) {
    self.controller.send(actionHandler, message);
  },

  deactivate() {
    Ember.debug('route mixin deactivate');
    const pubnubChannel = this.get('pubnubChannel');
    Ember.assert("Deactivate failed. 'pubnubChannel' property is not defined. It may either be a string or Ember.computed type",
        pubnubChannel);
    const pn = this.get('pushNotifications');
    pn.emUnsubscribe({ channel: pubnubChannel });
    this._super(...arguments);
  },

  activate() {
    Ember.debug('route mixin subscribing');
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
      }
    });
    this._super(...arguments);
  }
});
