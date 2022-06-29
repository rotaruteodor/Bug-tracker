const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const Member = sequelize.define('Member', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

});

module.exports = Member;
