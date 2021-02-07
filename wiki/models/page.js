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
        return `/wiki/${this.getDataValue('urltitle')}`;
      }
  },
}, { sequelize: db, modelName: 'page' });


Page.beforeValidate((page, options) => {
  
    if (page.title) {
      page.urltitle =  page.title.replace(/\s+/g, '_').replace(/\W/g, '');
      options.fields.push('urltitle')
    }
})


module.exports = {
    Page: Page,
};
