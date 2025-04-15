const Department = require("../../controllers/Admin/adminController");
const authJwt = require("../../middlewares/authJwt");
var multer = require("multer");
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
        app.post("/api/v1/admin/Department/addDepartment", upload.single('image'), Department.createDepartment);
        app.get("/api/v1/admin/Department/allDepartment", Department.getDepartment);
        app.get("/api/v1/admin/Department/paginateDepartmentSearch", Department.paginateDepartmentSearch);
        app.put("/api/v1/admin/Department/updateDepartment/:id", upload.single('image'), Department.updateDepartment);
        app.delete("/api/v1/admin/Department/deleteDepartment/:id", Department.removeDepartment);
        app.post("/api/v1/admin/Role/addRole", Department.createRole);
        app.get("/api/v1/admin/Role/allRole", Department.getRole);
        app.get("/api/v1/admin/Role/paginateRoleSearch", Department.paginateRoleSearch);
        app.put("/api/v1/admin/Role/updateRole/:id", Department.updateRole);
        app.delete("/api/v1/admin/Role/deleteRole/:id", Department.removeRole);
        app.post("/api/v1/admin/Equipment/addEquipment", Department.createEquipment);
        app.get("/api/v1/admin/Equipment/allEquipment", Department.getEquipment);
        app.get("/api/v1/admin/Equipment/paginateEquipmentSearch", Department.paginateEquipmentSearch);
        app.put("/api/v1/admin/Equipment/updateEquipment/:id", Department.updateEquipment);
        app.delete("/api/v1/admin/Equipment/deleteEquipment/:id", Department.removeEquipment);
        app.post("/api/v1/admin/Outfit/addOutfit", Department.createOutfit);
        app.get("/api/v1/admin/Outfit/allOutfit", Department.getOutfit);
        app.get("/api/v1/admin/Outfit/paginateOutfitSearch", Department.paginateOutfitSearch);
        app.put("/api/v1/admin/Outfit/updateOutfit/:id", Department.updateOutfit);
        app.delete("/api/v1/admin/Outfit/deleteOutfit/:id", Department.removeOutfit);
        app.post("/api/v1/admin/Community/addCommunity", upload.single('image'), Department.createCommunity);
        app.get("/api/v1/admin/Community/allCommunity", Department.getCommunity);
        app.get("/api/v1/admin/Community/paginateCommunitySearch", Department.paginateCommunitySearch);
        app.put("/api/v1/admin/Community/updateCommunity/:id", upload.single('image'), Department.updateCommunity);
        app.delete("/api/v1/admin/Community/deleteCommunity/:id", Department.removeCommunity);
        app.post("/api/v1/admin/Community/addDataForCommunityInfo/:id", upload.single('image'), Department.addDataForCommunityInfo);
        app.get("/api/v1/admin/Community/allCommunityInfo", Department.getCommunityInfo);
        app.get("/api/v1/admin/Community/paginateCommunityInfoSearch", Department.paginateCommunityInfoSearch);
        app.put("/api/v1/admin/Community/updateCommunityInfo/:id", upload.single('image'), Department.updateCommunityInfo);
        app.delete("/api/v1/admin/Community/deleteCommunityInfo/:id", Department.removeCommunityInfo);
        app.post("/api/v1/admin/Benefits/addBenefits", upload.single('image'), Department.createBenefits);
        app.get("/api/v1/admin/Benefits/allBenefits", Department.getBenefits);
        app.get("/api/v1/admin/Benefits/paginateBenefitsSearch", Department.paginateBenefitsSearch);
        app.put("/api/v1/admin/Benefits/updateBenefits/:id", upload.single('image'), Department.updateBenefits);
        app.delete("/api/v1/admin/Benefits/deleteBenefits/:id", Department.removeBenefits);
        app.post("/api/v1/admin/Job/addJob", upload.single('image'), Department.createJob);
        app.get("/api/v1/admin/Job/allJob", Department.getJob);
        app.get("/api/v1/admin/Job/paginateJobSearch", Department.paginateJobSearch);
        app.put("/api/v1/admin/Job/updateJob/:id", upload.single('image'), Department.updateJob);
        app.delete("/api/v1/admin/Job/deleteJob/:id", Department.removeJob);
        app.post("/api/v1/admin/JobBusinessType/addJobBusinessType", upload.single('image'), Department.createJobBusinessType);
        app.get("/api/v1/admin/JobBusinessType/allJobBusinessType", Department.getJobBusinessType);
        app.get("/api/v1/admin/JobBusinessType/paginateJobBusinessTypeSearch", Department.paginateJobBusinessTypeSearch);
        app.put("/api/v1/admin/JobBusinessType/updateJobBusinessType/:id", upload.single('image'), Department.updateJobBusinessType);
        app.delete("/api/v1/admin/JobBusinessType/deleteJobBusinessType/:id", Department.removeJobBusinessType);
        app.post('/api/v1/admin/sendNotificationToAllUsers', upload.single('image'), authJwt.verifyToken, Department.sendNotificationToAllUsers);
        app.get('/api/v1/admin/getAllNotifications', authJwt.verifyToken, Department.getAllNotifications);
        app.get('/api/v1/admin/getNotificationById/:id', Department.getNotificationById);
        app.delete('/api/v1/admin/deleteNotification/:id', Department.deleteNotification);
};