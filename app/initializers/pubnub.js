// pubnub code from https://gist.github.com/ultimatemonty/5e3f4e1f9bbb84442518

import PubNub from '../services/pubnub';
export default {
  name: 'pubnub-service',
  initialize(application) {
    application.register('pubnub:main', PubNub, { singleton: true });
    application.inject('controller', 'pubnub', 'pubnub:main');
    application.inject('route', 'pubnub', 'pubnub:main');
  }
};
