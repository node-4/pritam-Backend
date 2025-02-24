const auth = require("../../../controllers/Staff/Account/appSetting/appSetting");
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
        app.put("/api/v1/user/updateMyDetails", [authJwt.verifyToken], auth.updateMyDetails);
        app.put("/api/v1/user/changePassword", [authJwt.verifyToken], auth.changePassword);
        app.get("/api/v1/user/getMyDetails", [authJwt.verifyToken], auth.getMyDetails);
}