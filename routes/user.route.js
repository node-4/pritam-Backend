const auth = require("../controllers/client.controller");
const authJwt = require("../middlewares/authJwt");
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
router.post("/registration", auth.clientRegistration);
router.post("/login", auth.signin);
router.post("/sendInquire", auth.sendInquire);
router.get('/all', auth.getCourses);
router.post("/sendNewLetter", auth.sendNewLetter);
router.put("/updateProfile", [authJwt.verifyToken], upload.single('image'), auth.updateProfile);
router.post("/giveRating", [authJwt.verifyToken], auth.giveRating);
router.get("/clientRating", auth.clientRating);
router.get("/staffRating", auth.staffRating);
router.post("/Registerform", auth.Registerform);
router.get("/getForms", auth.getForms);
router.get("/getInquires", auth.getInquires);
router.get("/getNewLetter", auth.getNewLetter);

module.exports = router;