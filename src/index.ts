import express from "express";
import { Sequelize } from "sequelize/types";
// import db from './db/models';
// import db from "./db/models";
const db = require('./db/models');
const app = express();
const port = 8080; // default port to listen


app.get("/", (req, res) => {
    res.send("Hello world!");
});


db.sequelize
    .authenticate()
    .then(() => {
        console.log('DB succcessfully connected');
        app.listen(port, async () => {
            console.log(`server started at http://localhost:${port}`);


            const { Image, Video, Comment} = db;

            // const newImage = await Image.create({
            //     title: "firstImage",
            //     url: "www.firstimageurl.com"
            //   })
            //   console.log('newUser', newImage);
            //   const newComment = await Comment.create({
            //     title: "firstImage",
            //     url: "www.firstimageurl.com"
            //   })
            //   console.log('newUser', newImage);
            // await Video.create({
            //     title: "newVideo",
            //     text: "videoText"
            // })
            // Find imge by id
            // const image = await Image.findByPk(1)
            // console.log("Image", image);
            // console.log("Image", await image.createComment({title:'Believe in magic'}));
            // console.log("Comments from image", await image.getComments());

            // const video = await Video.findByPk(1)
            // console.log("Video", video);

            const comment1 = await Comment.findByPk(1);
            const comment2 = await Comment.findByPk(2);
            console.log('comment1 type ', await comment1.getCommentable());
            console.log('comment2 type ', await comment2.getCommentable());

            const comments = await Comment.findAll({
                include: [Image, Video]
              });
              for (const comment of comments) {
                const message = `Found comment #${comment.id} with ${comment.commentableType} commentable:`;
                console.log(message, JSON.stringify(comment.commentable));
              }
            // console.log("Video", await video.createComment({title:'Believe in magic'}));
            // console.log("Comments from Video", await video.getComments())


        });
    })
    .catch((err: any) => {
        console.log('DB connection failed', err);
    })