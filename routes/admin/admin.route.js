const auth = require("../../controllers/Admin/admin.controller");
const authJwt = require("../../middlewares/authJwt");
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
module.exports = (app) => {
        app.post("/api/v1/admin/registration", auth.registration);
        app.post("/api/v1/admin/login", auth.signin);
        app.get("/api/v1/admin/dashboard", [authJwt.verifyToken], auth.dashboard);
        app.put("/api/v1/admin/update", [authJwt.verifyToken], auth.update);
        app.post("/api/v1/admin/addContactDetails", [authJwt.verifyToken], upload.single('image'), auth.addContactDetails);
        app.put("/api/v1/admin/updateContactDetails/:id", upload.single('image'), auth.updateContactDetails);
        app.post("/api/v1/admin/addContactDetailsOffice", [authJwt.verifyToken], upload.single('image'), auth.addContactDetailsOffice);
        app.delete("/api/v1/admin/DeleteContactDetails/:id", [authJwt.verifyToken], auth.DeleteContactDetailsOffice);
        app.put("/api/v1/admin/updateContactDetailsOffice/:id", [authJwt.verifyToken], upload.single('image'), auth.updateContactDetailsOffice);
        app.get("/api/v1/admin/viewContactDetails", auth.viewContactDetails);
        app.get("/api/v1/admin/viewContactDetailsOffice", auth.viewContactDetailsOffice);
        app.get("/api/v1/admin/getbyIdContactDetails/:id", auth.getbyIdContactDetails);
        app.post("/api/v1/admin/addWhoWeare", [authJwt.verifyToken], auth.addWhoWeare);
        app.get("/api/v1/admin/getWhoWeare", auth.getWhoWeare);
        app.put("/api/v1/admin/updateWhoWeare/:id", auth.editWhoWeare);
        app.get("/api/v1/admin/getWhoWeareById/:id", auth.getWhoWeareById);
        app.delete("/api/v1/admin/DeleteWhoWeare/:id", [authJwt.verifyToken], auth.DeleteWhoWeare);
        app.post("/api/v1/admin/addPopularJob", [authJwt.verifyToken], auth.addPopularJob);
        app.get("/api/v1/admin/getPopularJob", auth.getPopularJob);
        app.put("/api/v1/admin/updatePopularJob/:id", auth.editPopularJob);
        app.get("/api/v1/admin/getPopularJobById/:id", auth.getPopularJobById);
        app.delete("/api/v1/admin/DeletePopularJob/:id", [authJwt.verifyToken], auth.DeletePopularJob);
        app.post("/api/v1/admin/addTrendingService", [authJwt.verifyToken], auth.addTrendingService);
        app.get("/api/v1/admin/getTrendingService", auth.getTrendingService);
        app.put("/api/v1/admin/updateTrendingService/:id", auth.editTrendingService);
        app.get("/api/v1/admin/getTrendingServiceById/:id", auth.getTrendingServiceById);
        app.delete("/api/v1/admin/DeleteTrendingService/:id", [authJwt.verifyToken], auth.DeleteTrendingService);
        app.post("/api/v1/admin/addEvent", [authJwt.verifyToken], auth.addEvent);
        app.get("/api/v1/admin/getEvent", auth.getEvent);
        app.put("/api/v1/admin/updateEvent/:id", auth.editEvent);
        app.get("/api/v1/admin/getEventById/:id", auth.getEventById);
        app.delete("/api/v1/admin/DeleteEvent/:id", [authJwt.verifyToken], auth.DeleteEvent);
        app.post("/api/v1/admin/addSubEvent", [authJwt.verifyToken], auth.addSubEvent);
        app.get("/api/v1/admin/getSubEvent/:eventId", auth.getSubEvent);
        app.get("/api/v1/admin/getSubEventById/:id", auth.getSubEventById);
        app.put("/api/v1/admin/updateSubEvent/:id", auth.editSubEvent);
        app.delete("/api/v1/admin/DeleteSubEvent/:id", [authJwt.verifyToken], auth.DeleteSubEvent);
        app.post("/api/v1/admin/addFreelancing", [authJwt.verifyToken], auth.addFreelancing);
        app.get("/api/v1/admin/getFreelancing", auth.getFreelancing);
        app.put("/api/v1/admin/updateFreelancing/:id", auth.editFreelancing);
        app.get("/api/v1/admin/getFreelancingById/:id", auth.getFreelancingById);
        app.delete("/api/v1/admin/DeleteFreelancing/:id", [authJwt.verifyToken], auth.DeleteFreelancing);
        app.post("/api/v1/admin/imageUpload", upload.single('image'), auth.imageUpload);
        app.post("/api/v1/admin/addAds", cpUpload, [authJwt.verifyToken], auth.addAds);
        app.get("/api/v1/admin/getAds", auth.getAds);
        app.get("/api/v1/admin/getAdsById/:id", auth.getAdsById);
        app.delete("/api/v1/admin/DeleteAds/:id", [authJwt.verifyToken], auth.DeleteAds);
        app.get("/api/v1/admin/getClients", auth.getClients);
        app.get("/api/v1/admin/getStaffs", auth.getStaffs);
        app.get("/api/v1/admin/getUserById/:id", auth.getUserById);
        app.delete("/api/v1/admin/DeleteUser/:id", [authJwt.verifyToken], auth.DeleteUser);
        app.post('/api/v1/admin/Banner', upload.single('image'), authJwt.verifyToken, auth.createBanner);                              // add Banner
        app.get('/api/v1/admin/Banner/:bannerId', auth.getBannerById);                                                                 // view Banner
        app.put('/api/v1/admin/Banner/:bannerId', upload.single('image'), authJwt.verifyToken, auth.updateBanner);                     // edit Banner
        app.delete("/api/v1/admin/Banner/:id", authJwt.verifyToken, auth.deleteBanner);                                                // delete Banner
        app.get('/api/v1/admin/Banner', auth.getAllBanner);                                                                            // all Banner
        app.get('/api/v1/admin/BannerbyType/:type', auth.getAllBannerByType);                                                                            // all Banner
        app.post("/api/v1/admin/page/addPageTitledescription", [authJwt.verifyToken], auth.addPageTitledescription);
        app.get("/api/v1/admin/page/getPageTitledescriptionbyPage/:page", auth.getPageTitledescriptionbyPage);
        app.get("/api/v1/admin/page/getPageTitledescription", auth.getPageTitledescription);
        app.put("/api/v1/admin/page/editPageTitledescription/:id", auth.editPageTitledescription);
        app.get("/api/v1/admin/page/getPageTitledescriptionById/:id", auth.getPageTitledescriptionById);
        app.delete("/api/v1/admin/page/DeletePageTitledescription/:id", [authJwt.verifyToken], auth.DeletePageTitledescription);
        app.post("/api/v1/admin/dream/createYourDreamsQuickly", upload.single('image'), [authJwt.verifyToken], auth.createYourDreamsQuickly);
        app.get("/api/v1/admin/dream/getAllYourDreamsQuickly", auth.getAllYourDreamsQuickly);
        app.get("/api/v1/admin/dream/getYourDreamsQuicklyById/:id", auth.getYourDreamsQuicklyById);
        app.delete("/api/v1/admin/dream/deleteYourDreamsQuickly/:id", [authJwt.verifyToken], auth.deleteYourDreamsQuickly);
        app.post("/api/v1/admin/weSupport/createBusinessweSupport", upload.single('image'), [authJwt.verifyToken], auth.createBusinessweSupport);
        app.get("/api/v1/admin/weSupport/getAllBusinessweSupport", auth.getAllBusinessweSupport);
        app.get("/api/v1/admin/weSupport/getBusinessweSupportById/:id", auth.getBusinessweSupportById);
        app.delete("/api/v1/admin/weSupport/deleteBusinessweSupport/:id", [authJwt.verifyToken], auth.deleteBusinessweSupport);
        app.put("/api/v1/admin/weSupport/addUserinBusinessweSupport", upload.single('image'), [authJwt.verifyToken], auth.addUserinBusinessweSupport);
        app.delete("/api/v1/admin/weSupport/deleteUserinBusinessweSupport/:id", [authJwt.verifyToken], auth.deleteUserinBusinessweSupport);
        app.post("/api/v1/admin/addStaffTalented", cpUpload1, [authJwt.verifyToken], auth.addStaffTalented);
        app.get("/api/v1/admin/getStaffTalented", auth.getStaffTalented);
        app.get("/api/v1/admin/getStaffTalentedById/:id", auth.getStaffTalentedById);
        app.delete("/api/v1/admin/DeleteStaffTalented/:id", [authJwt.verifyToken], auth.DeleteStaffTalented);
        app.post("/api/v1/admin/addstaffTalentedType", cpUpload2, [authJwt.verifyToken], auth.addstaffTalentedType);
        app.get("/api/v1/admin/getstaffTalentedType", auth.getstaffTalentedType);
        app.get("/api/v1/admin/getstaffTalentedTypeById/:id", auth.getstaffTalentedTypeById);
        app.delete("/api/v1/admin/DeletestaffTalentedType/:id", [authJwt.verifyToken], auth.DeletestaffTalentedType);
        app.post("/api/v1/admin/Bartending/addBartending", upload.single('image'), [authJwt.verifyToken], auth.addBartending);
        app.get("/api/v1/admin/Bartending/getBartending", auth.getBartending);
        app.get("/api/v1/admin/Bartending/getFormfreelancing", auth.getFormfreelancing);
        app.get("/api/v1/admin/Bartending/getBartendingById/:id", auth.getBartendingById);
        app.delete("/api/v1/admin/Bartending/DeleteBartending/:id", [authJwt.verifyToken], auth.DeleteBartending);
        app.get("/api/v1/admin/Bartending/getFormData/:type", auth.getFormData);
        app.post("/api/v1/admin/PJR/createPermanentJobRegistration", cpUpload3, [authJwt.verifyToken], auth.createPermanentJobRegistration);
        app.get("/api/v1/admin/PJR/getAllPermanentJobRegistration", auth.getAllPermanentJobRegistration);
        app.get("/api/v1/admin/PJR/getPermanentJobRegistrationById/:id", auth.getPermanentJobRegistrationById);
        app.delete("/api/v1/admin/PJR/deletePermanentJobRegistration/:id", [authJwt.verifyToken], auth.deletePermanentJobRegistration);
        app.put("/api/v1/admin/PJR/addUserinPermanentJobRegistration", upload.single('image'), [authJwt.verifyToken], auth.addUserinPermanentJobRegistration);
        app.delete("/api/v1/admin/PJR/deleteUserinPermanentJobRegistration/:id", [authJwt.verifyToken], auth.deleteUserinPermanentJobRegistration);
        app.post("/api/v1/admin/Question", auth.createQuestion);
        app.get("/api/v1/admin/Question/All", auth.getAllQuestions);
        app.get("/api/v1/admin/Question/:questionId", auth.getQuestionById);
        app.put("/api/v1/admin/Question/:questionId", auth.updateQuestion);
        app.delete("/api/v1/admin/Question/:questionId", auth.deleteQuestion);
}