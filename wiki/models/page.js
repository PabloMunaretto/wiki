const S = require('sequelize');
const db = require('../db');

class Page extends S.Model {}

Page.init({
  title: {
    type: S.STRING,
    allowNull: false,
  },
  urltitle: {
    type: S.STRING,
    allowNull: false,
  },
  content: {
    type: S.TEXT,
    allowNull: false,
  },
  status: {
    type: S.ENUM('open', 'closed')
  },
  date: {
    type: S.DATE,
    defaultValue: S.NOW,
},
  route: {
      type: S.VIRTUAL,
      get() {
        const url = this.getDataValue(urltitle);
        return url ? '/wiki/'+url : null;
      }
  }
}, { sequelize: db, modelName: 'page' });


module.exports = {
    Page: Page,
};
