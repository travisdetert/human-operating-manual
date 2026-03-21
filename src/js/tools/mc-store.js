// My Contract — Shared Persistence Layer
// JSON wrapper around localStorage with mc_ prefix

(function () {
  'use strict';

  var PREFIX = 'mc_';

  function get(key) {
    try {
      var raw = localStorage.getItem(PREFIX + key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn('MCStore.get error:', key, e);
      return null;
    }
  }

  function set(key, data) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.warn('MCStore.set error:', key, e);
      return false;
    }
  }

  function remove(key) {
    localStorage.removeItem(PREFIX + key);
  }

  function keys(filter) {
    var result = [];
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (k && k.indexOf(PREFIX) === 0) {
        var short = k.slice(PREFIX.length);
        if (!filter || short.indexOf(filter) === 0) {
          result.push(short);
        }
      }
    }
    return result;
  }

  function exportAll() {
    var data = {};
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (k && k.indexOf(PREFIX) === 0) {
        try {
          data[k] = JSON.parse(localStorage.getItem(k));
        } catch (e) {
          data[k] = localStorage.getItem(k);
        }
      }
    }
    return JSON.stringify(data, null, 2);
  }

  function importAll(json) {
    try {
      var data = JSON.parse(json);
      var count = 0;
      Object.keys(data).forEach(function (k) {
        if (k.indexOf(PREFIX) === 0) {
          localStorage.setItem(k, JSON.stringify(data[k]));
          count++;
        }
      });
      return count;
    } catch (e) {
      console.warn('MCStore.importAll error:', e);
      return 0;
    }
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  window.MCStore = {
    get: get,
    set: set,
    remove: remove,
    keys: keys,
    exportAll: exportAll,
    importAll: importAll,
    today: today,
    uid: uid
  };
})();
