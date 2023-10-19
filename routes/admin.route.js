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
                allowed_formats: ["jpg", "jpeg", "webp", "avif", "mp4", "mp3", "png", "PNG", "xlsx", "xls", "pdf", "PDF"]
        },
});
const upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'banner', maxCount: 1 }, { name: 'images', maxCount: 10 },]);
var cpUpload1 = upload.fields([{ name: 'formImage', maxCount: 1 }, { name: 'image', maxCount: 3 }]);
var cpUpload2 = upload.fields([{ name: 'eformImage', maxCount: 1 }, { name: 'image', maxCount: 1 }]);
var cpUpload3 = upload.fields([{ name: 'eformImage', maxCount: 1 }, { name: 'bannerImage', maxCount: 1 }]);

router.post("/registration", auth.registration);
router.post("/login", auth.signin);
router.get("/dashboard", [authJwt.verifyToken], auth.dashboard);
router.put("/update", [authJwt.verifyToken], auth.update);
router.post("/addContactDetails", [authJwt.verifyToken], upload.single('image'), auth.addContactDetails);
router.put("/updateContactDetails/:id", upload.single('image'), auth.updateContactDetails);
router.post("/addContactDetailsOffice", [authJwt.verifyToken], upload.single('image'), auth.addContactDetailsOffice);
router.delete("/DeleteContactDetails/:id", [authJwt.verifyToken], auth.DeleteContactDetailsOffice);
router.put("/updateContactDetailsOffice/:id", [authJwt.verifyToken], upload.single('image'), auth.updateContactDetailsOffice);
router.get("/viewContactDetails", auth.viewContactDetails);
router.get("/viewContactDetailsOffice", auth.viewContactDetailsOffice);
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
router.put("/updateEvent/:id", auth.editEvent);
router.get("/getEventById/:id", auth.getEventById);
router.delete("/DeleteEvent/:id", [authJwt.verifyToken], auth.DeleteEvent);
router.post("/addSubEvent", [authJwt.verifyToken], auth.addSubEvent);
router.get("/getSubEvent/:eventId", auth.getSubEvent);
router.get("/getSubEventById/:id", auth.getSubEventById);
router.put("/updateSubEvent/:id", auth.editSubEvent);
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
router.post("/page/addPageTitledescription", [authJwt.verifyToken], auth.addPageTitledescription);
router.get("/page/getPageTitledescriptionbyPage/:page", auth.getPageTitledescriptionbyPage);
router.get("/page/getPageTitledescription", auth.getPageTitledescription);
router.put("/page/editPageTitledescription/:id", auth.editPageTitledescription);
router.get("/page/getPageTitledescriptionById/:id", auth.getPageTitledescriptionById);
router.delete("/page/DeletePageTitledescription/:id", [authJwt.verifyToken], auth.DeletePageTitledescription);
router.post("/dream/createYourDreamsQuickly", upload.single('image'), [authJwt.verifyToken], auth.createYourDreamsQuickly);
router.get("/dream/getAllYourDreamsQuickly", auth.getAllYourDreamsQuickly);
router.get("/dream/getYourDreamsQuicklyById/:id", auth.getYourDreamsQuicklyById);
router.delete("/dream/deleteYourDreamsQuickly/:id", [authJwt.verifyToken], auth.deleteYourDreamsQuickly);
router.post("/weSupport/createBusinessweSupport", upload.single('image'), [authJwt.verifyToken], auth.createBusinessweSupport);
router.get("/weSupport/getAllBusinessweSupport", auth.getAllBusinessweSupport);
router.get("/weSupport/getBusinessweSupportById/:id", auth.getBusinessweSupportById);
router.delete("/weSupport/deleteBusinessweSupport/:id", [authJwt.verifyToken], auth.deleteBusinessweSupport);
router.put("/weSupport/addUserinBusinessweSupport", upload.single('image'), [authJwt.verifyToken], auth.addUserinBusinessweSupport);
router.delete("/weSupport/deleteUserinBusinessweSupport/:id", [authJwt.verifyToken], auth.deleteUserinBusinessweSupport);
router.post("/addStaffTalented", cpUpload1, [authJwt.verifyToken], auth.addStaffTalented);
router.get("/getStaffTalented", auth.getStaffTalented);
router.get("/getStaffTalentedById/:id", auth.getStaffTalentedById);
router.delete("/DeleteStaffTalented/:id", [authJwt.verifyToken], auth.DeleteStaffTalented);
router.post("/addstaffTalentedType", cpUpload2, [authJwt.verifyToken], auth.addstaffTalentedType);
router.get("/getstaffTalentedType", auth.getstaffTalentedType);
router.get("/getstaffTalentedTypeById/:id", auth.getstaffTalentedTypeById);
router.delete("/DeletestaffTalentedType/:id", [authJwt.verifyToken], auth.DeletestaffTalentedType);
router.post("/Bartending/addBartending", upload.single('image'), [authJwt.verifyToken], auth.addBartending);
router.get("/Bartending/getBartending", auth.getBartending);
router.get("/Bartending/getFormfreelancing", auth.getFormfreelancing);
router.get("/Bartending/getBartendingById/:id", auth.getBartendingById);
router.delete("/Bartending/DeleteBartending/:id", [authJwt.verifyToken], auth.DeleteBartending);
router.get("/Bartending/getFormData/:type", auth.getFormData);
router.post("/PJR/createPermanentJobRegistration", cpUpload3, [authJwt.verifyToken], auth.createPermanentJobRegistration);
router.get("/PJR/getAllPermanentJobRegistration", auth.getAllPermanentJobRegistration);
router.get("/PJR/getPermanentJobRegistrationById/:id", auth.getPermanentJobRegistrationById);
router.delete("/PJR/deletePermanentJobRegistration/:id", [authJwt.verifyToken], auth.deletePermanentJobRegistration);
router.put("/PJR/addUserinPermanentJobRegistration", upload.single('image'), [authJwt.verifyToken], auth.addUserinPermanentJobRegistration);
router.delete("/PJR/deleteUserinPermanentJobRegistration/:id", [authJwt.verifyToken], auth.deleteUserinPermanentJobRegistration);
router.post("/Question", auth.createQuestion);
router.get("/Question/All", auth.getAllQuestions);
router.get("/Question/:questionId", auth.getQuestionById);
router.put("/Question/:questionId", auth.updateQuestion);
router.delete("/Question/:questionId", auth.deleteQuestion);
module.exports = router;