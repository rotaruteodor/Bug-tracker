const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const Project = sequelize.define('Project', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },


    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 30
        }
    },


    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    repositoryLink: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 40
        }
    }
});

module.exports = Project;
