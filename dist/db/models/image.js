'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.initImage = void 0;
const sequelize_1 = require("sequelize");
const initImage = (seq) => {
    const imageModel = seq.define("images", {
        id: {
            allowNull: false,
            primaryKey: true,
            unique: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        title: sequelize_1.DataTypes.STRING,
        url: sequelize_1.DataTypes.STRING
    }, {
        tableName: "images",
        timestamps: true,
    });
    return imageModel;
};
exports.initImage = initImage;
//# sourceMappingURL=image.js.map