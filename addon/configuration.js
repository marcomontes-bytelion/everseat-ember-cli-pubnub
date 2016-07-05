import Ember from 'ember';

const { getWithDefault } = Ember;

const DEFAULTS = {
  subscribe_key: '',
  restore: true,
  ssl: true
};

export default {

  subscribe_key: DEFAULTS.subscribe_key,

  restore: DEFAULTS.restore,

  ssl: DEFAULTS.ssl,

  load(config) {
    for (let property in this) {
      if (this.hasOwnProperty(property) && Ember.typeOf(this[property]) !== 'function') {
        this[property] = getWithDefault(config, property, DEFAULTS[property]);
      }
    }
  }
};
