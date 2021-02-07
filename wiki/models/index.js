const User = require('./user');
// DESESTRUCTURIZACION desestructuring con o sin{}
const { Page } = require('./page');


Page.belongsTo(User, { as: 'author'});

module.exports = { User, Page };