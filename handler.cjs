const { loadSync } = require('./loader');

exports.handler = function (...args) {

    loadSync();
};