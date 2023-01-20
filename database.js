//configurare database si initializare Sequelize

const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('db-bibliografie', 'user', 'pas', 
    {
       dialect: 'sqlite',
       host: './bibliografie.sqlite',     
    });
    //const db = {};

    /*db.Sequelize =Sequelize;
    db.sequelize =sequelize;
    db.local = require("./sequelizemodel")(sequelize, Sequelize);*/
    module.exports = sequelize;