'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Video.hasMany(models.Comment, {
        foreignKey: 'commentableId',
        constraints: false,
        scope: {
          commentableType: 'video'
        }
      });
    }
  };
  Video.init({
    title: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};