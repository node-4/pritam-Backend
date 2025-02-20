const auth = require("../../../controllers/Client/client.controller");
const authJwt = require("../../../middlewares/authJwt");
var multer = require("multer");
const path = require("path");
const express = require("express");
const router = express()
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
        cloud_name: "dbrvq9uxa",
        api_key: "567113285751718",
        api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
});
const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
                folder: "images/image",
                allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF", "avif"],
        },
});
const upload = multer({ storage: storage });
module.exports = (app) => {
        app.post("/api/v1/user/registration", auth.clientRegistration);
        app.post("/api/v1/user/login", auth.signin);
        app.post("/api/v1/user/sendInquire", auth.sendInquire);
        app.get('/api/v1/all', auth.getCourses);
        app.post("/api/v1/user/sendNewLetter", auth.sendNewLetter);
        app.put("/api/v1/user/updateProfile", [authJwt.verifyToken], upload.single('image'), auth.updateProfile);
        app.post("/api/v1/user/giveRating", [authJwt.verifyToken], auth.giveRating);
        app.get("/api/v1/user/clientRating", auth.clientRating);
        app.get("/api/v1/user/staffRating", auth.staffRating);
        app.post("/api/v1/user/Registerform", auth.Registerform);
        app.get("/api/v1/user/getForms", auth.getForms);
        app.get("/api/v1/user/getInquires", auth.getInquires);
        app.get("/api/v1/user/getNewLetter", auth.getNewLetter);
}