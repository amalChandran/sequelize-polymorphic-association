'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.initVideo = void 0;
const sequelize_1 = require("sequelize");
const initVideo = (seq) => {
    const videoModel = seq.define("videos", {
        id: {
            allowNull: false,
            primaryKey: true,
            unique: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        title: sequelize_1.DataTypes.STRING,
        text: sequelize_1.DataTypes.STRING
    }, {
        tableName: "videos",
        timestamps: true,
    });
    return videoModel;
};
exports.initVideo = initVideo;
//# sourceMappingURL=video.js.map