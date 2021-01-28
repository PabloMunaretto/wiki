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


Page.beforeValidate((title) => {

  if (title) {
    // Remueve todos los caracteres no-alfanuméricos 
    // y hace a los espacios guiones bajos. 
    this.urltitle = title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generá de forma aleatoria un string de 5 caracteres
    this.urltitle = Math.random().toString(36).substring(2, 7);
  }

});

module.exports = {
    Page: Page,
};
