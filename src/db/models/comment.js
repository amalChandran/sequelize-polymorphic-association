'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Image, { foreignKey: 'commentableId', constraints: false });
      Comment.belongsTo(models.Video, { foreignKey: 'commentableId', constraints: false });
    }

    getCommentable(options) {
      if (!this.commentableType) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.commentableType)}`;
      return this[mixinMethodName](options);
    }
    
  };
  Comment.init({
    title: DataTypes.STRING,
    commentableId: DataTypes.INTEGER,
    commentableType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });

  //Added to prevent duplicate issues during eager loading.
  Comment.addHook("afterFind", findResult => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (instance.commentableType === "image" && instance.Image !== undefined) {
        instance.commentable = instance.Image;
      } else if (instance.commentableType === "video" && instance.Video !== undefined) {
        instance.commentable = instance.Video;
      }
      // delete to prevent duplicates
      delete instance.Image;
      delete instance.dataValues.Image;
      delete instance.Video;
      delete instance.dataValues.Video;
    }
  });

  return Comment;
};

