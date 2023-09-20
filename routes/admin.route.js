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
                allowed_formats: ["jpg", "jpeg", "webp", "mp4", "mp3", "png", "PNG", "xlsx", "xls", "pdf", "PDF"]
        },
});
const upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 10 },]);

router.post("/registration", auth.registration);
router.post("/login", auth.signin);
router.get("/dashboard", [authJwt.verifyToken], auth.dashboard);
router.put("/update", [authJwt.verifyToken], auth.update);
router.post("/addContactDetails", [authJwt.verifyToken], auth.addContactDetails);
router.post("/addContactDetailsOffice", [authJwt.verifyToken], auth.addContactDetailsOffice);
router.get("/viewContactDetails", auth.viewContactDetails);
router.get("/viewContactDetailsOffice", auth.viewContactDetailsOffice);
router.put("/updateContactDetails/:id", auth.updateContactDetails);
router.get("/getbyIdContactDetails/:id", auth.getbyIdContactDetails);
router.post("/addWhoWeare", [authJwt.verifyToken], auth.addWhoWeare);
router.get("/getWhoWeare", auth.getWhoWeare);
router.put("/updateWhoWeare/:id", auth.editWhoWeare);
router.get("/getWhoWeareById/:id", auth.getWhoWeareById);
router.delete("/DeleteWhoWeare/:id", [authJwt.verifyToken], auth.DeleteWhoWeare);
router.post("/addPopularJob", [authJwt.verifyToken], auth.addPopularJob);
router.get("/getPopularJob", auth.getPopularJob);
router.put("/updatePopularJob/:id", auth.editPopularJob);
router.get("/getPopularJobById/:id", auth.getPopularJobById);
router.delete("/DeletePopularJob/:id", [authJwt.verifyToken], auth.DeletePopularJob);
router.post("/addTrendingService", [authJwt.verifyToken], auth.addTrendingService);
router.get("/getTrendingService", auth.getTrendingService);
router.put("/updateTrendingService/:id", auth.editTrendingService);
router.get("/getTrendingServiceById/:id", auth.getTrendingServiceById);
router.delete("/DeleteTrendingService/:id", [authJwt.verifyToken], auth.DeleteTrendingService);
router.post("/addEvent", [authJwt.verifyToken], auth.addEvent);
router.get("/getEvent", auth.getEvent);
router.get("/getEventById/:id", auth.getEventById);
router.delete("/DeleteEvent/:id", [authJwt.verifyToken], auth.DeleteEvent);
router.post("/addSubEvent", [authJwt.verifyToken], auth.addSubEvent);
router.get("/getSubEvent/:eventId", auth.getSubEvent);
router.get("/getSubEventById/:id", auth.getSubEventById);
router.delete("/DeleteSubEvent/:id", [authJwt.verifyToken], auth.DeleteSubEvent);
router.post("/addFreelancing", [authJwt.verifyToken], auth.addFreelancing);
router.get("/getFreelancing", auth.getFreelancing);
router.put("/updateFreelancing/:id", auth.editFreelancing);
router.get("/getFreelancingById/:id", auth.getFreelancingById);
router.delete("/DeleteFreelancing/:id", [authJwt.verifyToken], auth.DeleteFreelancing);
router.post("/imageUpload", upload.single('image'), auth.imageUpload);
router.post("/addAds", cpUpload, [authJwt.verifyToken], auth.addAds);
router.get("/getAds", auth.getAds);
router.get("/getAdsById/:id", auth.getAdsById);
router.delete("/DeleteAds/:id", [authJwt.verifyToken], auth.DeleteAds);
router.get("/getClients", auth.getClients);
router.get("/getStaffs", auth.getStaffs);
router.get("/getUserById/:id", auth.getUserById);
router.delete("/DeleteUser/:id", [authJwt.verifyToken], auth.DeleteUser);
router.post('/Banner', upload.single('image'), authJwt.verifyToken, auth.createBanner);                              // add Banner
router.get('/Banner/:bannerId', auth.getBannerById);                                                                 // view Banner
router.put('/Banner/:bannerId', upload.single('image'), authJwt.verifyToken, auth.updateBanner);                     // edit Banner
router.delete("/Banner/:id", authJwt.verifyToken, auth.deleteBanner);                                                // delete Banner
router.get('/Banner', auth.getAllBanner);                                                                            // all Banner
router.get('/BannerbyType/:type', auth.getAllBannerByType);                                                                            // all Banner
module.exports = router;