const auth = require("../../../controllers/Staff/Account/myCommunity/myCommunity");
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
var cpUpload = upload.fields([{ name: 'Id', maxCount: 1 }, { name: 'addressProof', maxCount: 1 }, { name: 'attestationDocument', maxCount: 10 },]);
module.exports = (app) => {
    app.get("/api/v1/user/getCommunity", auth.getCommunity);
    app.put("/api/v1/user/joinCommunity/:id", authJwt.verifyToken, auth.joinCommunity);
    app.put("/api/v1/user/removeCommunity/:id", authJwt.verifyToken, auth.removeCommunity);
    app.put("/api/v1/user/acceptUserForCommunity/:id", authJwt.verifyToken, auth.acceptUserForCommunity);
    app.put("/api/v1/user/rejectUserForCommunity/:id", authJwt.verifyToken, auth.rejectUserForCommunity);
}