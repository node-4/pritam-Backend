const auth = require("../../../controllers/Staff/Account/myEarning/myEarning");
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
        app.get("/api/v1/user/getAllTransaction", [authJwt.verifyToken], auth.getAllTransaction);
        app.get("/api/v1/user/getTransactionById/:id",auth.getTransactionById);
}