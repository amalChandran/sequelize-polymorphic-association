"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = __importDefault(require("./db/models"));
const app = express_1.default();
const port = 8080; // default port to listen
app.get("/", (req, res) => {
    res.send("Hello world!");
});
models_1.default.sequelize
    .authenticate()
    .then(() => {
    console.log('DB succcessfully connected');
    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
        const { Image, Video, Comment } = models_1.default;
        console.log("db image", Image);
        console.log("db video", Video);
        console.log("db comment", Comment);
        // Test
        // db.Image.bulkCreate([
        //     { title: "image1", url: "www.ssss.com" },
        //     { title: "image2", url: "www.ssss.com" },
        //     { title: "image3", url: "www.ssss.com" },
        //     { title: "image4", url: "www.ssss.com" },
        // ]).then(() => {
        //     return db.Image.findAll();
        // }).then((images:any) => {
        //     console.log(images);
        // })
    });
})
    .catch((err) => {
    console.log('DB connection failed', err);
});
//# sourceMappingURL=index.js.map