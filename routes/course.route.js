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
router.post('/addCourse', upload.array('image'), auth.AddCourse);
router.get('/all', auth.getCourses);
router.get('/view/:id', auth.getCoursesById);
router.put('/edit/:id/:tillDate', upload.array('image'), auth.editCourse);
router.get('/viewByTrendingServiceId/:trendingServiceId', auth.getCoursesbyTrendingServiceId);
router.delete('/delete/:id', auth.DeleteCourses);
router.post('/Skill/addSkill', auth.AddSkill);
router.get('/Skill/all', auth.getSkills);
router.get('/Skill/view/:id', auth.getSkillsById);
router.put('/Skill/edit/:id', auth.editSkill);
router.delete('/Skill/delete/:id', auth.DeleteSkills);
module.exports = router;