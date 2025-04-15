const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../configs/auth.config");
const User = require("../../models/userModel");
const ContactDetail = require("../../models/ContactDetail");
const CoursesModel = require("../../models/CoursesModel");
const skillModel = require("../../models/skillModel");
const whoWeare = require("../../models/whoWeare");
const popularJob = require("../../models/popularJob");
const trendingService = require("../../models/trendingService");
const eventModel = require("../../models/eventModel");
const subEvent = require("../../models/subEvent");
const freelancing = require("../../models/freelancing");
const ads = require("../../models/ads");
const userModel = require("../../models/userModel");
const banner = require('../../models/banner');
const allPageTitledescription = require('../../models/allPageTitledescription');
const yourDreamsquickly = require('../../models/yourDreamsquickly');
const businessweSupport = require('../../models/businessweSupport');
const staffTalented = require('../../models/staffTalented');
const staffTalentedType = require('../../models/staffTalentedType');
const bartending = require('../../models/bartending');
const permanentJobRegistration = require('../../models/permanentJobRegistration');
const Question = require("../../models/question");
const Department = require("../../models/New/department/department");
const Role = require("../../models/New/department/role");
const Equipment = require("../../models/New/outfitAndEquipment/equipment");
const Outfit = require("../../models/New/outfitAndEquipment/outfit");
const Community = require("../../models/New/community");
const CommunityInfo = require("../../models/New/communityInfo");
const Benefits = require("../../models/New/Benefits");
const Job = require("../../models/New/job");
const JobBusinessType = require("../../models/New/jobBusinessType");
const Notification = require('../../models/New/notification');

exports.createDepartment = async (req, res) => {
    try {
        let findDepartment = await Department.findOne({ name: req.body.name });
        if (findDepartment) {
            return res.status(409).json({ message: "Department already exit.", status: 404, data: {} });
        } else {
            let fileUrl;
            if (req.file) {
                fileUrl = req.file.path
            }
            const data = { name: req.body.name, image: fileUrl };
            const department = await Department.create(data);
            return res.status(200).json({ message: "Department add successfully.", status: 200, data: department });
        }
    } catch (error) {
        if (error.response.status == 413) {
            return res.status(413).send({ status: 413, message: "Image is too large.", data: {}, });
        } else {
            return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
    }
};
exports.getDepartment = async (req, res) => {
    try {
        const categories = await Department.find({}).sort({ createdAt: 1 });
        if (categories.length == 0) {
            return res.status(404).json({ message: "Department not found.", status: 404, data: [] });
        }
        return res.status(201).json({ message: "Department Found", status: 200, data: categories, });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.paginateDepartmentSearch = async (req, res) => {
    try {
        console.log("------------------------");
        const { search, fromDate, toDate, page, limit } = req.query;
        let query = {};
        if (search) {
            query.$or = [
                { "name": { $regex: req.query.search, $options: "i" }, },
            ]
        }
        if ((fromDate == null) && (toDate != null)) {
            query.createdAt = { $lte: toDate };
        }
        if ((fromDate != null) && (toDate != null)) {
            query.$and = [
                { createdAt: { $gte: fromDate } },
                { createdAt: { $lte: toDate } },
            ]
        }
        let options = {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            sort: { createdAt: -1 },
        };
        let data = await Department.paginate(query, options);
        return res.status(200).json({ status: 200, message: "Department data found.", data: data });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById(id);
        if (!department) {
            return res.status(404).json({ message: "Department Not Found", status: 404, data: {} });
        }
        let fileUrl;
        if (req.file) {
            fileUrl = req.file.path
        }
        department.image = fileUrl || department.image;
        department.name = req.body.name || department.name;
        let update = await department.save();
        return res.status(200).json({ message: "Updated Successfully", data: update });
    } catch (error) {
        if (error.response.status == 413) {
            return res.status(413).send({ status: 413, message: "Image is too large.", data: {}, });
        } else {
            return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
    }
};
exports.removeDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById(id);
        if (!department) {
            return res.status(404).json({ message: "Department Not Found", status: 404, data: {} });
        } else {
            await Department.findByIdAndDelete(department._id);
            return res.status(200).json({ message: "Department Deleted Successfully !" });
        }
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.createRole = async (req, res) => {
    try {
        let findRole = await Role.findOne({ name: req.body.name });
        if (findRole) {
            return res.status(409).json({ message: "Role already exit.", status: 404, data: {} });
        } else {
            const data = { name: req.body.name, };
            const role = await Role.create(data);
            return res.status(200).json({ message: "Role add successfully.", status: 200, data: role });
        }
    } catch (error) {
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getRole = async (req, res) => {
    try {
        const categories = await Role.find({}).sort({ createdAt: 1 });
        if (categories.length == 0) {
            return res.status(404).json({ message: "Role not found.", status: 404, data: [] });
        }
        return res.status(201).json({ message: "Role Found", status: 200, data: categories, });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.paginateRoleSearch = async (req, res) => {
    try {
        console.log("------------------------");
        const { search, fromDate, toDate, page, limit } = req.query;
        let query = {};
        if (search) {
            query.$or = [
                { "name": { $regex: req.query.search, $options: "i" }, },
            ]
        }
        if ((fromDate == null) && (toDate != null)) {
            query.createdAt = { $lte: toDate };
        }
        if ((fromDate != null) && (toDate != null)) {
            query.$and = [
                { createdAt: { $gte: fromDate } },
                { createdAt: { $lte: toDate } },
            ]
        }
        let options = {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            sort: { createdAt: -1 },
        };
        let data = await Role.paginate(query, options);
        return res.status(200).json({ status: 200, message: "Role data found.", data: data });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).json({ message: "Role Not Found", status: 404, data: {} });
        }
        role.name = req.body.name || role.name;
        let update = await role.save();
        return res.status(200).json({ message: "Updated Successfully", data: update });
    } catch (error) {
        if (error.response.status == 413) {
            return res.status(413).send({ status: 413, message: "Image is too large.", data: {}, });
        } else {
            return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
    }
};
exports.removeRole = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).json({ message: "Role Not Found", status: 404, data: {} });
        } else {
            await Role.findByIdAndDelete(role._id);
            return res.status(200).json({ message: "Role Deleted Successfully !" });
        }
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.createEquipment = async (req, res) => {
    try {
        let findEquipment = await Equipment.findOne({ name: req.body.name });
        if (findEquipment) {
            return res.status(409).json({ message: "Equipment already exit.", status: 404, data: {} });
        } else {
            const data = { name: req.body.name, };
            const equipment = await Equipment.create(data);
            return res.status(200).json({ message: "Equipment add successfully.", status: 200, data: equipment });
        }
    } catch (error) {
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getEquipment = async (req, res) => {
    try {
        const categories = await Equipment.find({}).sort({ createdAt: 1 });
        if (categories.length == 0) {
            return res.status(404).json({ message: "Equipment not found.", status: 404, data: [] });
        }
        return res.status(201).json({ message: "Equipment Found", status: 200, data: categories, });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.paginateEquipmentSearch = async (req, res) => {
    try {
        console.log("------------------------");
        const { search, fromDate, toDate, page, limit } = req.query;
        let query = {};
        if (search) {
            query.$or = [
                { "name": { $regex: req.query.search, $options: "i" }, },
            ]
        }
        if ((fromDate == null) && (toDate != null)) {
            query.createdAt = { $lte: toDate };
        }
        if ((fromDate != null) && (toDate != null)) {
            query.$and = [
                { createdAt: { $gte: fromDate } },
                { createdAt: { $lte: toDate } },
            ]
        }
        let options = {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            sort: { createdAt: -1 },
        };
        let data = await Equipment.paginate(query, options);
        return res.status(200).json({ status: 200, message: "Equipment data found.", data: data });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.updateEquipment = async (req, res) => {
    try {
        const { id } = req.params;
        const equipment = await Equipment.findById(id);
        if (!equipment) {
            return res.status(404).json({ message: "Equipment Not Found", status: 404, data: {} });
        }
        equipment.name = req.body.name || equipment.name;
        let update = await equipment.save();
        return res.status(200).json({ message: "Updated Successfully", data: update });
    } catch (error) {
        if (error.response.status == 413) {
            return res.status(413).send({ status: 413, message: "Image is too large.", data: {}, });
        } else {
            return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
    }
};
exports.removeEquipment = async (req, res) => {
    try {
        const { id } = req.params;
        const equipment = await Equipment.findById(id);
        if (!equipment) {
            return res.status(404).json({ message: "Equipment Not Found", status: 404, data: {} });
        } else {
            await Equipment.findByIdAndDelete(equipment._id);
            return res.status(200).json({ message: "Equipment Deleted Successfully !" });
        }
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.createOutfit = async (req, res) => {
    try {
        let findOutfit = await Outfit.findOne({ name: req.body.name });
        if (findOutfit) {
            return res.status(409).json({ message: "Outfit already exit.", status: 404, data: {} });
        } else {
            const data = { name: req.body.name, };
            const outfit = await Outfit.create(data);
            return res.status(200).json({ message: "Outfit add successfully.", status: 200, data: outfit });
        }
    } catch (error) {
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getOutfit = async (req, res) => {
    try {
        const categories = await Outfit.find({}).sort({ createdAt: 1 });
        if (categories.length == 0) {
            return res.status(404).json({ message: "Outfit not found.", status: 404, data: [] });
        }
        return res.status(201).json({ message: "Outfit Found", status: 200, data: categories, });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.paginateOutfitSearch = async (req, res) => {
    try {
        console.log("------------------------");
        const { search, fromDate, toDate, page, limit } = req.query;
        let query = {};
        if (search) {
            query.$or = [
                { "name": { $regex: req.query.search, $options: "i" }, },
            ]
        }
        if ((fromDate == null) && (toDate != null)) {
            query.createdAt = { $lte: toDate };
        }
        if ((fromDate != null) && (toDate != null)) {
            query.$and = [
                { createdAt: { $gte: fromDate } },
                { createdAt: { $lte: toDate } },
            ]
        }
        let options = {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            sort: { createdAt: -1 },
        };
        let data = await Outfit.paginate(query, options);
        return res.status(200).json({ status: 200, message: "Outfit data found.", data: data });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.updateOutfit = async (req, res) => {
    try {
        const { id } = req.params;
        const outfit = await Outfit.findById(id);
        if (!outfit) {
            return res.status(404).json({ message: "Outfit Not Found", status: 404, data: {} });
        }
        outfit.name = req.body.name || outfit.name;
        let update = await outfit.save();
        return res.status(200).json({ message: "Updated Successfully", data: update });
    } catch (error) {
        if (error.response.status == 413) {
            return res.status(413).send({ status: 413, message: "Image is too large.", data: {}, });
        } else {
            return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
    }
};
exports.removeOutfit = async (req, res) => {
    try {
        const { id } = req.params;
        const outfit = await Outfit.findById(id);
        if (!outfit) {
            return res.status(404).json({ message: "Outfit Not Found", status: 404, data: {} });
        } else {
            await Outfit.findByIdAndDelete(outfit._id);
            return res.status(200).json({ message: "Outfit Deleted Successfully !" });
        }
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.createCommunity = async (req, res) => {
    try {
        let findCommunity = await Community.findOne({ name: req.body.name });
        if (findCommunity) {
            return res.status(409).json({ message: "Community already exit.", status: 404, data: {} });
        } else {
            let fileUrl;
            if (req.file) {
                fileUrl = req.file.path
            }
            const data = { name: req.body.name, description: req.body.description, image: fileUrl };
            const community = await Community.create(data);
            return res.status(200).json({ message: "Community add successfully.", status: 200, data: community });
        }
    } catch (error) {
        if (error.response.status == 413) {
            return res.status(413).send({ status: 413, message: "Image is too large.", data: {}, });
        } else {
            return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
    }
};
exports.getCommunity = async (req, res) => {
    try {
        const categories = await Community.find({}).sort({ createdAt: 1 });
        if (categories.length == 0) {
            return res.status(404).json({ message: "Community not found.", status: 404, data: [] });
        }
        return res.status(201).json({ message: "Community Found", status: 200, data: categories, });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.paginateCommunitySearch = async (req, res) => {
    try {
        console.log("------------------------");
        const { search, fromDate, toDate, page, limit } = req.query;
        let query = {};
        if (search) {
            query.$or = [
                { "name": { $regex: req.query.search, $options: "i" }, },
            ]
        }
        if ((fromDate == null) && (toDate != null)) {
            query.createdAt = { $lte: toDate };
        }
        if ((fromDate != null) && (toDate != null)) {
            query.$and = [
                { createdAt: { $gte: fromDate } },
                { createdAt: { $lte: toDate } },
            ]
        }
        let options = {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            sort: { createdAt: -1 },
        };
        let data = await Community.paginate(query, options);
        return res.status(200).json({ status: 200, message: "Community data found.", data: data });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.updateCommunity = async (req, res) => {
    try {
        const { id } = req.params;
        const community = await Community.findById(id);
        if (!community) {
            return res.status(404).json({ message: "Community Not Found", status: 404, data: {} });
        }
        let fileUrl;
        if (req.file) {
            fileUrl = req.file.path
        }
        community.image = fileUrl || community.image;
        community.name = req.body.name || community.name;
        community.description = req.body.description || community.description;
        let update = await community.save();
        return res.status(200).json({ message: "Updated Successfully", data: update });
    } catch (error) {
        if (error.response.status == 413) {
            return res.status(413).send({ status: 413, message: "Image is too large.", data: {}, });
        } else {
            return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
    }
};
exports.removeCommunity = async (req, res) => {
    try {
        const { id } = req.params;
        const community = await Community.findById(id);
        if (!community) {
            return res.status(404).json({ message: "Community Not Found", status: 404, data: {} });
        } else {
            await Community.findByIdAndDelete(community._id);
            return res.status(200).json({ message: "Community Deleted Successfully !" });
        }
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.addDataForCommunityInfo = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id);
        if (!community) {
            return res.status(404).json({ message: "Community not found.", status: 404, data: {} });
        } else {
            let fileUrl = null;
            if (req.file) {
                fileUrl = req.file.path
            }
            let obj = {
                communityId: community._id,
                title: req.body.title,
                description: req.body.description,
                image: fileUrl,
            }
            const saved = await CommunityInfo.create(obj);
            if (saved) {
                return res.status(200).json({ message: "Community data add info.", status: 200, data: saved });
            }
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
exports.getCommunityInfo = async (req, res) => {
    try {
        const categories = await CommunityInfo.find({}).populate('communityId').sort({ createdAt: 1 });
        if (categories.length == 0) {
            return res.status(404).json({ message: "Community not found.", status: 404, data: [] });
        }
        return res.status(201).json({ message: "Community Found", status: 200, data: categories, });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.paginateCommunityInfoSearch = async (req, res) => {
    try {
        console.log("------------------------");
        const { search, fromDate, toDate, page, limit } = req.query;
        let query = {};
        if (search) {
            query.$or = [
                { "name": { $regex: req.query.search, $options: "i" }, },
            ]
        }
        if ((fromDate == null) && (toDate != null)) {
            query.createdAt = { $lte: toDate };
        }
        if ((fromDate != null) && (toDate != null)) {
            query.$and = [
                { createdAt: { $gte: fromDate } },
                { createdAt: { $lte: toDate } },
            ]
        }
        let options = {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            sort: { createdAt: -1 },
            populate: "communityId"
        };
        let data = await CommunityInfo.paginate(query, options);
        return res.status(200).json({ status: 200, message: "Community data found.", data: data });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.updateCommunityInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const community = await CommunityInfo.findById(id);
        if (!community) {
            return res.status(404).json({ message: "Community Not Found", status: 404, data: {} });
        }
        let fileUrl;
        if (req.file) {
            fileUrl = req.file.path
        }
        community.image = fileUrl || community.image;
        community.title = req.body.title || community.title;
        community.description = req.body.description || community.description;
        let update = await community.save();
        return res.status(200).json({ message: "Updated Successfully", data: update });
    } catch (error) {
        if (error.response.status == 413) {
            return res.status(413).send({ status: 413, message: "Image is too large.", data: {}, });
        } else {
            return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
    }
};
exports.removeCommunityInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const community = await CommunityInfo.findById(id);
        if (!community) {
            return res.status(404).json({ message: "Community Not Found", status: 404, data: {} });
        } else {
            await CommunityInfo.findByIdAndDelete(community._id);
            return res.status(200).json({ message: "Community Deleted Successfully !" });
        }
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.createBenefits = async (req, res) => {
    try {
        let findBenefits = await Benefits.findOne({ name: req.body.name });
        if (findBenefits) {
            return res.status(409).json({ message: "Benefits already exit.", status: 404, data: {} });
        } else {
            let fileUrl;
            if (req.file) {
                fileUrl = req.file.path
            }
            const data = { name: req.body.name, description: req.body.description, link: req.body.link, image: fileUrl };
            const benefits = await Benefits.create(data);
            return res.status(200).json({ message: "Benefits add successfully.", status: 200, data: benefits });
        }
    } catch (error) {
        if (error.response.status == 413) {
            return res.status(413).send({ status: 413, message: "Image is too large.", data: {}, });
        } else {
            return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
    }
};
exports.getBenefits = async (req, res) => {
    try {
        const categories = await Benefits.find({}).sort({ createdAt: 1 });
        if (categories.length == 0) {
            return res.status(404).json({ message: "Benefits not found.", status: 404, data: [] });
        }
        return res.status(201).json({ message: "Benefits Found", status: 200, data: categories, });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.paginateBenefitsSearch = async (req, res) => {
    try {
        console.log("------------------------");
        const { search, fromDate, toDate, page, limit } = req.query;
        let query = {};
        if (search) {
            query.$or = [
                { "name": { $regex: req.query.search, $options: "i" }, },
            ]
        }
        if ((fromDate == null) && (toDate != null)) {
            query.createdAt = { $lte: toDate };
        }
        if ((fromDate != null) && (toDate != null)) {
            query.$and = [
                { createdAt: { $gte: fromDate } },
                { createdAt: { $lte: toDate } },
            ]
        }
        let options = {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            sort: { createdAt: -1 },
        };
        let data = await Benefits.paginate(query, options);
        return res.status(200).json({ status: 200, message: "Benefits data found.", data: data });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.updateBenefits = async (req, res) => {
    try {
        const { id } = req.params;
        const benefits = await Benefits.findById(id);
        if (!benefits) {
            return res.status(404).json({ message: "Benefits Not Found", status: 404, data: {} });
        }
        let fileUrl;
        if (req.file) {
            fileUrl = req.file.path
        }
        benefits.image = fileUrl || benefits.image;
        benefits.name = req.body.name || benefits.name;
        benefits.link = req.body.link || benefits.link;
        benefits.description = req.body.description || benefits.description;
        let update = await benefits.save();
        return res.status(200).json({ message: "Updated Successfully", data: update });
    } catch (error) {
        if (error.response.status == 413) {
            return res.status(413).send({ status: 413, message: "Image is too large.", data: {}, });
        } else {
            return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
    }
};
exports.removeBenefits = async (req, res) => {
    try {
        const { id } = req.params;
        const benefits = await Benefits.findById(id);
        if (!benefits) {
            return res.status(404).json({ message: "Benefits Not Found", status: 404, data: {} });
        } else {
            await Benefits.findByIdAndDelete(benefits._id);
            return res.status(200).json({ message: "Benefits Deleted Successfully !" });
        }
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.createJob = async (req, res) => {
    try {
        let findJob = await Job.findOne({ name: req.body.name });
        if (findJob) {
            return res.status(409).json({ message: "Job already exit.", status: 404, data: {} });
        } else {
            let fileUrl;
            if (req.file) {
                fileUrl = req.file.path
            }
            const data = { name: req.body.name, description: req.body.description,image: fileUrl };
            const job = await Job.create(data);
            return res.status(200).json({ message: "Job add successfully.", status: 200, data: job });
        }
    } catch (error) {
        if (error.response.status == 413) {
            return res.status(413).send({ status: 413, message: "Image is too large.", data: {}, });
        } else {
            return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
    }
};
exports.getJob = async (req, res) => {
    try {
        const categories = await Job.find({}).sort({ createdAt: 1 });
        if (categories.length == 0) {
            return res.status(404).json({ message: "Job not found.", status: 404, data: [] });
        }
        return res.status(201).json({ message: "Job Found", status: 200, data: categories, });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.paginateJobSearch = async (req, res) => {
    try {
        console.log("------------------------");
        const { search, fromDate, toDate, page, limit } = req.query;
        let query = {};
        if (search) {
            query.$or = [
                { "name": { $regex: req.query.search, $options: "i" }, },
            ]
        }
        if ((fromDate == null) && (toDate != null)) {
            query.createdAt = { $lte: toDate };
        }
        if ((fromDate != null) && (toDate != null)) {
            query.$and = [
                { createdAt: { $gte: fromDate } },
                { createdAt: { $lte: toDate } },
            ]
        }
        let options = {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            sort: { createdAt: -1 },
        };
        let data = await Job.paginate(query, options);
        return res.status(200).json({ status: 200, message: "Job data found.", data: data });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: "Job Not Found", status: 404, data: {} });
        }
        let fileUrl;
        if (req.file) {
            fileUrl = req.file.path
        }
        job.image = fileUrl || job.image;
        job.name = req.body.name || job.name;
        job.description = req.body.description || job.description;
        let update = await job.save();
        return res.status(200).json({ message: "Updated Successfully", data: update });
    } catch (error) {
        if (error.response.status == 413) {
            return res.status(413).send({ status: 413, message: "Image is too large.", data: {}, });
        } else {
            return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
    }
};
exports.removeJob = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: "Job Not Found", status: 404, data: {} });
        } else {
            await Job.findByIdAndDelete(job._id);
            return res.status(200).json({ message: "Job Deleted Successfully !" });
        }
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.createJobBusinessType = async (req, res) => {
    try {
        let findJobBusinessType = await JobBusinessType.findOne({ name: req.body.name });
        if (findJobBusinessType) {
            return res.status(409).json({ message: "JobBusinessType already exit.", status: 404, data: {} });
        } else {
            let fileUrl;
            if (req.file) {
                fileUrl = req.file.path
            }
            const data = { name: req.body.name, description: req.body.description,image: fileUrl };
            const jobBusinessType = await JobBusinessType.create(data);
            return res.status(200).json({ message: "JobBusinessType add successfully.", status: 200, data: jobBusinessType });
        }
    } catch (error) {
        if (error.response.status == 413) {
            return res.status(413).send({ status: 413, message: "Image is too large.", data: {}, });
        } else {
            return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
    }
};
exports.getJobBusinessType = async (req, res) => {
    try {
        const categories = await JobBusinessType.find({}).sort({ createdAt: 1 });
        if (categories.length == 0) {
            return res.status(404).json({ message: "JobBusinessType not found.", status: 404, data: [] });
        }
        return res.status(201).json({ message: "JobBusinessType Found", status: 200, data: categories, });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.paginateJobBusinessTypeSearch = async (req, res) => {
    try {
        console.log("------------------------");
        const { search, fromDate, toDate, page, limit } = req.query;
        let query = {};
        if (search) {
            query.$or = [
                { "name": { $regex: req.query.search, $options: "i" }, },
            ]
        }
        if ((fromDate == null) && (toDate != null)) {
            query.createdAt = { $lte: toDate };
        }
        if ((fromDate != null) && (toDate != null)) {
            query.$and = [
                { createdAt: { $gte: fromDate } },
                { createdAt: { $lte: toDate } },
            ]
        }
        let options = {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            sort: { createdAt: -1 },
        };
        let data = await JobBusinessType.paginate(query, options);
        return res.status(200).json({ status: 200, message: "JobBusinessType data found.", data: data });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.updateJobBusinessType = async (req, res) => {
    try {
        const { id } = req.params;
        const jobBusinessType = await JobBusinessType.findById(id);
        if (!jobBusinessType) {
            return res.status(404).json({ message: "JobBusinessType Not Found", status: 404, data: {} });
        }
        let fileUrl;
        if (req.file) {
            fileUrl = req.file.path
        }
        jobBusinessType.image = fileUrl || jobBusinessType.image;
        jobBusinessType.name = req.body.name || jobBusinessType.name;
        jobBusinessType.description = req.body.description || jobBusinessType.description;
        let update = await jobBusinessType.save();
        return res.status(200).json({ message: "Updated Successfully", data: update });
    } catch (error) {
        if (error.response.status == 413) {
            return res.status(413).send({ status: 413, message: "Image is too large.", data: {}, });
        } else {
            return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
    }
};
exports.removeJobBusinessType = async (req, res) => {
    try {
        const { id } = req.params;
        const jobBusinessType = await JobBusinessType.findById(id);
        if (!jobBusinessType) {
            return res.status(404).json({ message: "JobBusinessType Not Found", status: 404, data: {} });
        } else {
            await JobBusinessType.findByIdAndDelete(jobBusinessType._id);
            return res.status(200).json({ message: "JobBusinessType Deleted Successfully !" });
        }
    } catch (err) {
        return res.status(500).send({ msg: "internal server error ", error: err.message, });
    }
};
exports.sendNotificationToAllUsers = async (req, res) => {
    try {
        const { title, desc, subject, expireDate, type, userId } = req.body;
        const adminId = req.user._id;
        if (!title || !desc || !subject || !expireDate || !type) {
            return res.status(400).json({ message: 'All required fields (title, desc, subject, expireDate, and type) must be provided.' });
        }
        let imageUrl = req.file ? req.file.path : null;
        const notification = new Notification({
            title,
            desc,
            subject,
            image: imageUrl,
            expireDate,
            adminId,
            type,
            userId
        });
        await notification.save();
        if (type === 'All') {
            // const users = await User.find({ userType: 'USER' });
            // for (const user of users) {
            //     // user.notifications.push(notification._id);
            //     await user.save();
            // }
            return res.status(200).json({ message: 'Notification sent to all users.' });
        } else if (type === 'Single') {
            if (!userId) {
                return res.status(400).json({ message: 'userId is required for single user notifications.' });
            }
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            // user.notifications.push(notification._id);
            // await user.save();
            return res.status(200).json({ message: 'Notification sent to the specified user.' });
        } else {
            return res.status(400).json({ message: 'Invalid type. Use "All" or "Single".' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error sending notification', error: error.message });
    }
};
exports.getAllNotifications = async (req, res) => {
    try {
        console.log(req.admin)
        const notifications = await Notification.find({ $or: [{ userId: req.admin._id }, { adminId: req.admin._id }] }).populate('adminId').populate('userId');
        if (!notifications) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        return res.status(200).json({ message: 'Notifications retrieved successfully', data: notifications });
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving notifications', error: error.message });
    }
};
exports.getNotificationById = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findById(id).populate('adminId').populate('userId');
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        return res.status(200).json({ message: 'Notification retrieved successfully', data: notification });
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving notification', error: error.message });
    }
};
exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        return res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting notification', error: error.message });
    }
};
