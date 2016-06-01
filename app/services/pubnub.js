// pubnub code from https://gist.github.com/ultimatemonty/5e3f4e1f9bbb84442518

import Ember from 'ember';
import Config from '../config/environment';

const PubNubService = Ember.Object.extend(Ember.Evented, {
  NAMESPACE: 'pubnub',
  pubnub: null,
  pnstate: {},
  cfg: null,

  init() {
    this.set('cfg', Config.pubnub);
    if (!this.get('cfg')) {
      throw 'no pubnub configuration `cfg` provided!';
    }

    const PubNub = window.PUBNUB.init(this.get('cfg'));
    this.get('pnstate')._channels = [];
    this.get('pnstate')._presence = {};
    this.get('pnstate')._presData = {};
    return this.set('pubnub', PubNub);
  },
  emListChannels() {
    return this.get('pnstate')._channels.slice(0);
  },
  emListPresence(channel) {
    let _ref;
    return (_ref = this.get('ppnstate')._presence[channel]) != null ? _ref.slice(0) : void 0;
  },
  emPresenceData(channel) {
    return this.get('pnstate')._presData[channel] || {};
  },
  emMsgEv(channel) {
    return `pn-message:${channel}`;
  },
  emPrsEv(channel) {
    return `pn-presence:${channel}`;
  },
  emPublish(args) {
    return this.get('pubnub').publish.apply(this.get('pubnub'), [args]);
  },
  _emInstallHandlers(args) {
    let inst, oldmessage, oldpresence, pnstate, self;
    self = this.get('pubnub');
    pnstate = this.get('pnstate');
    inst = this;
    oldmessage = args.message;
    args.message = function() {
      inst.trigger(inst.emMsgEv(args.channel), {
        message: arguments[0],
        env: arguments[1],
        channel: args.channel
      });
      if (oldmessage) {
        return oldmessage(arguments);
      }
    };
    oldpresence = args.presence;
    args.presence = function() {
      let channel, cpos, event, _base, _base1;
      event = arguments[0];
      channel = args.channel;
      if (event.uuids) {
        self.each(event.uuids, function(uuid) {
          let state, _base, _base1;
          state = uuid.state ? uuid.state : null;
          uuid = uuid.uuid ? uuid.uuid : uuid;
          if (!(_base = pnstate._presence)[channel]) {
            _base[channel] = [];
          }
          if (pnstate._presence[channel].indexOf(uuid) < 0) {
            pnstate._presence[channel].push(uuid);
          }
          if (!(_base1 = pnstate._presData)[channel]) {
            _base1[channel] = {};
          }
          if (state) {
            return pnstate._presData[channel][uuid] = state;
          }
        });
      } else {
        if (event.uuid && event.action) {
          if (!(_base = pnstate._presence)[channel]) {
            _base[channel] = [];
          }
          if (!(_base1 = pnstate._presData)[channel]) {
            _base1[channel] = {};
          }
          if (event.action === 'leave') {
            cpos = pnstate._presence[channel].indexOf(event.uuid);
            if (cpos !== -1) {
              pnstate._presence[channel].splice(cpos, 1);
            }
            delete pnstate._presData[channel][event.uuid];
          } else {
            if (pnstate._presence[channel].indexOf(event.uuid) < 0) {
              pnstate._presence[channel].push(event.uuid);
            }
            if (event.data) {
              pnstate._presData[channel][event.uuid] = event.data;
            }
          }
        }
      }
      return inst.trigger(inst.emPrsEv(args.channel), {
        event,
        message: arguments[1],
        channel
      });
    };
    return args;
  },
  emSubscribe: function(args) {
    let inst, pnstate, self, _base, _name;
    self = this.get('pubnub');
    pnstate = this.get('pnstate');
    inst = this;
    inst._emInstallHandlers(args);
    if (pnstate._channels.indexOf(args.channel) < 0) {
      pnstate._channels.push(args.channel);
    }
    if (!(_base = pnstate._presence)[_name = args.channel]) { _base[_name] = []; }
    return self.subscribe.apply(this.get('pubnub'), [args]);
  },
  emUnsubscribe: function(args) {
    let cpos, inst, pnstate, self;
    self = this.get('pubnub');
    pnstate = this.get('pnstate');
    inst = this;
    cpos = pnstate._channels.indexOf(args.channel);
    if (cpos !== -1) {
      pnstate._channels.splice(cpos, 1);
    }
    pnstate._presence[args.channel] = null;
    inst.off(inst.emMsgEv(args.channel));
    inst.off(inst.emPrsEv(args.channel));
    return self.unsubscribe(args);
  },
  emHistory: function(args) {
    let inst, self;
    self = this.get('pubnub');
    inst = this;
    args.callback = inst._emFireMessages(args.channel);
    return self.history(args);
  },
  emHereNow: function(args) {
    let inst, self;
    self = this.get('pubnub');
    inst = this;
    args = inst._emInstallHandlers(args);
    args.state = true;
    args.callback = args.presence;
    delete args.presence;
    delete args.message;
    return self.here_now(args);
  },
  _emFireMessages: function(realChannel) {
    let inst, self;
    self = this.get('pubnub');
    inst = this;
    return function(messages) {
      return self.each(messages[0], function(message) {
        return inst.trigger(inst.emMsgEv(realChannel), {
          message,
          channel: realChannel
        });
      });
    };
  },
  emWhereNow: function(args) {
    return this.get('pubnub').where_now(args);
  },
  emState: function(args) {
    return this.get('pubnub').state(args);
  },
  emAuth: function() {
    return this.get('pubnub').auth.apply(this.get('pubnub'), arguments);
  },
  emAudit: function() {
    return this.get('pubnub').audit.apply(this.get('pubnub'), arguments);
  },
  emGrant: function() {
    return this.get('pubnub').grant.apply(this.get('pubnub'), arguments);
  }
});

export default PubNubService;
