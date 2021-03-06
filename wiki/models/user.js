const S = require('sequelize');
const db = require('../db');

class User extends S.Model {}

User.init({
  name: {
    type: S.STRING,
    allowNull: false,
  },
  email: {
    type: S.STRING,
    allowNull: false,
    unique:  true,
    validate: {
      isEmail: true,
    },
  },
  // getDomainEmail: {
  //   type: S.VIRTUAL,
  //   get(){
  //     return this.email.substring(this.email.lastIndexOf("@") +1);
  //   }
  // }
}, { sequelize: db, modelName: 'user' });


    module.exports = User