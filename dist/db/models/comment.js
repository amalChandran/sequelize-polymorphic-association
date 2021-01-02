'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initComment = void 0;
const sequelize_1 = require("sequelize");
const initComment = (seq) => {
    const Comment = seq.define("comments", {
        id: {
            allowNull: false,
            primaryKey: true,
            unique: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        title: sequelize_1.DataTypes.STRING,
        commentableId: sequelize_1.DataTypes.UUID,
        commentableType: sequelize_1.DataTypes.STRING
    }, {
        tableName: "comments",
        timestamps: true,
    });
    Comment.associate = ({ Image, Video }) => {
        Image.hasMany(Comment, {
            foreignKey: 'commentableId',
            constraints: false,
            scope: {
                commentableType: 'image'
            }
        });
        Comment.belongsTo(Image, { foreignKey: 'commentableId', constraints: false });
        Video.hasMany(Comment, {
            foreignKey: 'commentableId',
            constraints: false,
            scope: {
                commentableType: 'video'
            }
        });
        Comment.belongsTo(Video, { foreignKey: 'commentableId', constraints: false });
    };
    Comment.addHook("afterFind", (findResult) => {
        if (!Array.isArray(findResult))
            findResult = [findResult];
        for (const instance of findResult) {
            if (instance.commentableType === "image" && instance.image !== undefined) {
                instance.commentable = instance.image;
            }
            else if (instance.commentableType === "video" && instance.video !== undefined) {
                instance.commentable = instance.video;
            }
            // To prevent mistakes:
            delete instance.image;
            delete instance.dataValues.image;
            delete instance.video;
            delete instance.dataValues.video;
        }
    });
    Comment.getCommentable = (options) => __awaiter(void 0, void 0, void 0, function* () {
        if (!Comment.commentableType)
            return Promise.resolve(null);
        const mixinMethodName = `get${uppercaseFirst(Comment.commentableType)}`;
        return Comment[mixinMethodName](options);
    });
    return Comment;
};
exports.initComment = initComment;
const uppercaseFirst = (str) => `${str[0].toUpperCase()}${str.substr(1)}`;
//# sourceMappingURL=comment.js.map