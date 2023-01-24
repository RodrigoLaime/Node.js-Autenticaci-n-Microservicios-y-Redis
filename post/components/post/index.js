const store = require('../../../store/mysql');
const Controller = require('./controller');

module.exports = Controller(store);