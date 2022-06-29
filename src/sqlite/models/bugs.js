const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const Bug = sequelize.define('Bug', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    
    priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    
    severity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 300
        }
    },

    
    commitLink: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 40
        }
    },

    
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
    
});

module.exports = Bug;
