const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../../../configs/auth.config");
const userModel = require("../../../../models/userModel");
const ContactDetail = require("../../../../models/ContactDetail");
const CoursesModel = require("../../../../models/CoursesModel");
const inquire = require("../../../../models/inquireModel");
const newLetter = require("../../../../models/newLetter");
const ratingModel = require("../../../../models/ratingModel");
const jobRegisterform = require("../../../../models/jobRegisterform");
const Transaction = require('../../../../models/New/transactionModel');
const userDocument = require('../../../../models/New/userDocument');
const Community = require("../../../../models/New/community");
const updateSkillRequest = require("../../../../models/New/updateSkillRequest");
const skill = require("../../../../models/skillModel");
const Job = require("../../../../models/New/job");
exports.sendSkillRequest = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found", data: {} });
        }
        const findJob = await Job.findById({ _id: req.body.jobId });
        if (!findJob) {
            return res.status(404).json({ message: "Job not found.", status: 404, data: {} });
        }
        const data = {
            userId: user._id,
            jobId: findJob._id,
            skillId: req.body.skillId,
        };
        const job = await updateSkillRequest.create(data);
        return res.status(200).json({ message: "Skill Request send successfully.", status: 200, data: job });
    } catch (error) {
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getUpdateSkillRequest= async (req, res) => {
    try {
        const categories = await updateSkillRequest.find({}).populate('skillId jobId userId').sort({ createdAt: 1 });
        if (categories.length == 0) {
            return res.status(404).json({ message: "Community not found.", status: 404, data: [] });
        }
        return res.status(200).json({ message: "Community Found", status: 200, data: categories, });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};