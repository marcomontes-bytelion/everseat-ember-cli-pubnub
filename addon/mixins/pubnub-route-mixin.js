import Ember from 'ember';

export default Ember.Mixin.create({

  pushNotifications: Ember.inject.service('pubnub'),

  messageHandler(message, self, actionHandler) {
    self.controller.send(actionHandler, message);
  },

  deactivate() {
    Ember.Logger.debug('pubnub deactivate event');
    const pubnubChannel = this.get('pubnubChannel');
    Ember.assert("Deactivate failed. 'pubnubChannel' property is not defined. It may either be a string or Ember.computed type",
        pubnubChannel);
    const pn = this.get('pushNotifications');
    pn.emUnsubscribe({ channel: pubnubChannel });
    this._super(...arguments);
  },

  renderTemplate(controller, model) {
    Ember.Logger.debug('pubnub subscribing');
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
      message: ([message]) => {
        this.messageHandler(message, self, pubnubActionHandler);
      }
    });
    this._super(...arguments);
  }
});
