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