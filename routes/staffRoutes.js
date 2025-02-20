const staff = require('../controllers/Staff/staffController');
const authJwt = require("../middlewares/authJwt");
var multer = require("multer");
const path = require("path");
const express = require("express");
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
        allowed_formats: ["jpg", "jpeg", "webp", "avif", "mp4", "mp3", "png", "PNG", "xlsx", "xls", "pdf", "PDF"]
    },
});
const upload = multer({ storage: storage });

var cpUpload3 = upload.fields([{ name: 'facePhoto', maxCount: 1 }, { name: 'frontPassport', maxCount: 1 }, { name: 'backPassport', maxCount: 1 }, { name: 'frontId', maxCount: 1 }, { name: 'backId', maxCount: 1 }, { name: 'cv', maxCount: 1 }]);
module.exports = (app) => {
    app.post('/api/v1/staff/login', staff.login);
    app.post('/api/v1/staff/verifyOtp/:id', staff.verifyOtp);
    app.put('/api/v1/staff/updateCredentials/:id', staff.updateCredentials);
    app.put('/api/v1/staff/updateDemographics/:id', staff.updateDemographics);
    app.put('/api/v1/staff/updateRightToWork/:id', cpUpload3, staff.updateRightToWork);
    app.put('/api/v1/staff/updateBankDetails/:id', staff.updateBankDetails);
    app.put('/api/v1/staff/updateAvailability/:id', staff.updateAvailability);
    app.put('/api/v1/staff/updateTermsAccepted/:id', staff.updateTermsAccepted);
};