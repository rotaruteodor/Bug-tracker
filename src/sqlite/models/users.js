const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 30
        }
    },

    
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 30
        }
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 40
        }
    },

    
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 40
        }
    },

    
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 40
        }
    }
});

module.exports = User;
