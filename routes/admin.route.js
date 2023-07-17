const auth = require("../controllers/admin.controller");
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
                allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"],
        },
});
const upload = multer({ storage: storage });
router.post("/registration", auth.registration);
router.post("/login", auth.signin);
router.put("/update", [authJwt.verifyToken], auth.update);
router.post("/addContactDetails", [authJwt.verifyToken], auth.addContactDetails);
router.post("/addContactDetailsOffice", [authJwt.verifyToken], auth.addContactDetailsOffice);
router.get("/viewContactDetails", auth.viewContactDetails);
router.get("/viewContactDetailsOffice", auth.viewContactDetailsOffice);
router.put("/updateContactDetails/:id", auth.updateContactDetails);
router.get("/getbyIdContactDetails/:id", auth.getbyIdContactDetails);
router.post("/addWhoWeare", [authJwt.verifyToken], auth.addWhoWeare);
router.get("/getWhoWeare", auth.getWhoWeare);
router.get("/getWhoWeareById/:id", auth.getWhoWeareById);
router.delete("/DeleteWhoWeare/:id", [authJwt.verifyToken], auth.DeleteWhoWeare);
router.post("/addPopularJob", [authJwt.verifyToken], auth.addPopularJob);
router.get("/getPopularJob", auth.getPopularJob);
router.get("/getPopularJobById/:id", auth.getPopularJobById);
router.delete("/DeletePopularJob/:id", [authJwt.verifyToken], auth.DeletePopularJob);
router.post("/addTrendingService", [authJwt.verifyToken], auth.addTrendingService);
router.get("/getTrendingService", auth.getTrendingService);
router.get("/getTrendingServiceById/:id", auth.getTrendingServiceById);
router.delete("/DeleteTrendingService/:id", [authJwt.verifyToken], auth.DeleteTrendingService);
router.post("/addEvent", [authJwt.verifyToken], auth.addEvent);
router.get("/getEvent", auth.getEvent);
router.get("/getEventById/:id", auth.getEventById);
router.delete("/DeleteEvent/:id", [authJwt.verifyToken], auth.DeleteEvent);
router.post("/addSubEvent", [authJwt.verifyToken], auth.addSubEvent);
router.get("/getSubEvent", auth.getSubEvent);
router.get("/getSubEventById/:id", auth.getSubEventById);
router.delete("/DeleteSubEvent/:id", [authJwt.verifyToken], auth.DeleteSubEvent);



router.post("/imageUpload", upload.single('image'), auth.imageUpload);
module.exports = router;