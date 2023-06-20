const { loadSync } = require('../src/loader');

exports.handler = function (...args) {

    loadSync();
};