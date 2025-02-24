const staticContent = require('../../controllers/static/static.Controller');
const authJwt = require("../../middlewares/authJwt");
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


module.exports = (app) => {
    app.post('/api/v1/static/createAboutus', authJwt.verifyToken,upload.single('image'), staticContent.createAboutUs);
    app.put('/api/v1/static/aboutUs/:id', authJwt.verifyToken, upload.single('image'), staticContent.updateAboutUs);
    app.delete('/api/v1/static/aboutUs/:id', authJwt.verifyToken, staticContent.deleteAboutUs);
    app.get('/api/v1/static/getAboutUs', staticContent.getAboutUs);
    app.get('/api/v1/static/aboutUs/:id', staticContent.getAboutUsById);
    app.post('/api/v1/static/createPrivacy', authJwt.verifyToken, staticContent.createPrivacy);
    app.put('/api/v1/static/privacy/:id', authJwt.verifyToken, staticContent.updatePrivacy);
    app.delete('/api/v1/static/privacy/:id', authJwt.verifyToken, staticContent.deletePrivacy);
    app.get('/api/v1/static/getPrivacy', staticContent.getPrivacy);
    app.get('/api/v1/static/privacy/:id', staticContent.getPrivacybyId);
    app.post('/api/v1/static/createCancelationPrivacy', authJwt.verifyToken, staticContent.createCancelationPrivacy);
    app.put('/api/v1/static/CancelationPrivacy/:id', authJwt.verifyToken, staticContent.updateCancelationPrivacy);
    app.delete('/api/v1/static/CancelationPrivacy/:id', authJwt.verifyToken, staticContent.deleteCancelationPrivacy);
    app.get('/api/v1/static/getCancelationPrivacy', staticContent.getCancelationPrivacy);
    app.get('/api/v1/static/CancelationPrivacy/:id', staticContent.getCancelationPrivacybyId);
    app.post('/api/v1/static/createTerms', authJwt.verifyToken, staticContent.createTerms);
    app.put('/api/v1/static/terms/:id', authJwt.verifyToken, staticContent.updateTerms);
    app.delete('/api/v1/static/terms/:id', authJwt.verifyToken, staticContent.deleteTerms);
    app.get('/api/v1/static/getTerms', staticContent.getTerms);
    app.get('/api/v1/static/terms/:id', staticContent.getTermsbyId);
    app.post("/api/v1/static/faq/createFaq", authJwt.verifyToken, staticContent.createFaq);
    app.put("/api/v1/static/faq/:id", authJwt.verifyToken, staticContent.updateFaq);
    app.delete("/api/v1/static/faq/:id", authJwt.verifyToken, staticContent.deleteFaq);
    app.get("/api/v1/static/faq/All/:type", staticContent.getAllFaqs);
    app.get("/api/v1/static/faq/:id", staticContent.getFaqById);
};