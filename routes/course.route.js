const auth = require("../controllers/Admin/admin.controller");
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
module.exports = (app) => {
        app.post('api/v1/course/addCourse', upload.array('image'), auth.AddCourse);
        app.get('api/v1/course/all', auth.getCourses);
        app.get('api/v1/course/view/:id', auth.getCoursesById);
        app.put('api/v1/course/edit/:id/:tillDate', upload.array('image'), auth.editCourse);
        app.get('api/v1/course/viewByTrendingServiceId/:trendingServiceId', auth.getCoursesbyTrendingServiceId);
        app.delete('api/v1/course/delete/:id', auth.DeleteCourses);
        app.post('api/v1/course/Skill/addSkill', auth.AddSkill);
        app.get('api/v1/course/Skill/all', auth.getSkills);
        app.get('api/v1/course/Skill/view/:id', auth.getSkillsById);
        app.put('api/v1/course/Skill/edit/:id', auth.editSkill);
        app.delete('api/v1/course/Skill/delete/:id', auth.DeleteSkills);
}