const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../../configs/auth.config");
const User = require("../../../models/userModel");
const ContactDetail = require("../../../models/ContactDetail");
const CoursesModel = require("../../../models/CoursesModel");
const inquire = require("../../../models/inquireModel");
const newLetter = require("../../../models/newLetter");
const ratingModel = require("../../../models/ratingModel");
const jobRegisterform = require("../../../models/jobRegisterform");
const banner = require("../../../models/banner");
const Booking = require('../../../models/New/Order/booking');
const AllBooking = require('../../../models/New/Order/AllBooking');
const staffBooking = require('../../../models/New/Order/staffBooking');
const Cart = require('../../../models/New/cart/cart');
const Address = require("../../../models/address");
//// banner //////////
exports.getAllBanner = async (req, res) => {
  try {
    const categories = await banner.find();
    if (categories.length > 0) {
      return res.status(200).json({ status: 200, message: 'Banner found successfully', data: categories });
    } else {
      return res.status(404).json({ status: 404, message: 'Banner not found.', data: categories });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, error: 'Failed to fetch Banner' });
  }
};
exports.getBannerById = async (req, res) => {
  try {
    const bannerId = req.params.bannerId;
    const user = await banner.findById(bannerId);
    if (user) {
      return res.status(200).json({ message: "Banner found successfully", status: 200, data: user, });
    }
    return res.status(404).json({ message: "Banner not Found", status: 404, data: {}, });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, error: "Failed to retrieve Banner" });
  }
};
// New job
exports.getAllNewJob = async (req, res, next) => {
  try {
    const data = await User.findOne({ _id: req.user._id, });
    if (data) {
      const orders = await Booking.find({}).populate('allBookingId departments.departmentId roles.roleId').sort({ date: 1 })
      if (orders.length == 0) {
        return res.status(404).json({ status: 404, message: "Orders not found", data: [] });
      }
      return res.status(200).json({ status: 200, msg: "orders of user", data: orders })
    } else {
      return res.status(404).json({ status: 404, msg: "User not found", data: {} });
    }
  } catch (error) {
    console.log(error);
    return res.status(501).send({ status: 501, message: "server error.", data: {}, });
  }
};
exports.getJobById = async (req, res, next) => {
  try {
    const cart = await Booking.findOne({ _id: req.params.id }).populate('allBookingId');
    if (!cart) {
      return res.status(404).json({ status: 404, msg: "Order not found", data: {} });
    }
    return res.status(200).json({ status: 200, msg: "Order found successfully", data: cart });
  } catch (error) {
    return res.status(501).json({ status: 501, message: `Added to cart`, data: error });
  }
};
// seen job
exports.getAllSeenJob = async (req, res, next) => {
  try {
    const data = await User.findOne({ _id: req.user._id, });
    if (data) {
      const orders = await Booking.find({ staffSeen: { $in: req.user._id } }).populate('allBookingId').sort({ date: 1 })
      if (orders.length == 0) {
        return res.status(404).json({ status: 404, message: "Orders not found", data: [] });
      }
      return res.status(200).json({ status: 200, msg: "orders of user", data: orders })
    } else {
      return res.status(404).json({ status: 404, msg: "User not found", data: {} });
    }
  } catch (error) {
    console.log(error);
    return res.status(501).send({ status: 501, message: "server error.", data: {}, });
  }
};
exports.acceptedBooking = async (req, res, next) => {
  try {
    const data = await User.findOne({ _id: req.user._id, });
    if (data) {
      const cart = await Booking.findOne({ _id: req.params.id });
      if (!cart) {
        return res.status(200).json({ success: false, msg: "Order not found", data: {} });
      } else {
        let update = await Booking.findOneAndUpdate({ _id: cart._id }, { $pull: { staff: data._id }, $addToSet: { staffAccepted: data._id } }, { new: true });
        if (update) {
          let obj = {
            user: update.user,
            staff: data._id,
            category: cart.category,
            subCategory: cart.category,
            subCategoryTimeId: cart.subCategoryTimeId,
            bookingId: cart._id,
            date: cart.date,
            toTime: cart.toTime,
            fromTime: cart.fromTime,
            workingHours: cart.workingHours,
            jobStatus: "Pending",
            status: "Pending"
          }
          const Data1 = await staffBooking.create(obj);
          if (Data1) {
            return res.status(200).json({ success: true, msg: "Accept booking successfully", data: update });
          }
        }
      }
    } else {
      return res.status(200).json({ status: 500, msg: "User not found", data: {} });
    }
  } catch (error) {
    return res.status(501).json({ status: 501, message: `Added to cart`, data: error });
  }
};
exports.easyApplyBooking = async (req, res, next) => {
  try {
    const data = await User.findOne({ _id: req.user._id, });
    if (data) {
      const cart = await Booking.findOne({ _id: req.params.id });
      if (!cart) {
        return res.status(200).json({ success: false, msg: "Order not found", data: {} });
      } else {
        let obj = {
          user: cart.user,
          staff: data._id,
          category: cart.category,
          subCategory: cart.category,
          subCategoryTimeId: cart.subCategoryTimeId,
          bookingId: cart._id,
          date: req.body.date,
          toTime: req.body.toTime,
          fromTime: req.body.fromTime,
          workingHours: req.body.workingHours,
          jobStatus: "Pending",
          status: "Pending"
        }
        const Data1 = await staffBooking.create(obj);
        if (Data1) {
          let update = await Booking.findOneAndUpdate({ _id: cart._id }, { $pull: { staff: data._id }, $addToSet: { staffAccepted: data._id, staffBookingIds: Data1._id }, }, { new: true });
          if (update) {
            return res.status(200).json({ success: true, msg: "Accept booking successfully", data: update });
          }
        }
      }
    } else {
      return res.status(200).json({ status: 500, msg: "User not found", data: {} });
    }
  } catch (error) {
    return res.status(501).json({ status: 501, message: `Added to cart`, data: error });
  }
};
exports.getAllSearchJob = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ status: 404, msg: "User not found", data: {} });
    }

    const {
      fromTime,
      toTime,
      startImmediately,
      minSalary,
      maxSalary,
      roleId,
      search,
      minDistance = 0,
      maxDistance = 50000
    } = req.query;

    const userCoords = user.location?.coordinates || [0, 0];

    const pipeline = [
      {
        $geoNear: {
          near: { type: "Point", coordinates: userCoords },
          distanceField: "distance",
          spherical: true,
          distanceMultiplier: 0.001,
          maxDistance: parseFloat(maxDistance),
          minDistance: parseFloat(minDistance)
        }
      },
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "allBookingId",
          as: "bookingData"
        }
      },
      { $unwind: "$bookingData" },
      {
        $match: {
          ...(fromTime && toTime
            ? {
                "bookingData.date": {
                  $gte: new Date(fromTime),
                  $lte: new Date(toTime)
                }
              }
            : {}),
          ...(startImmediately === "true"
            ? { "bookingData.startTime": { $exists: true } }
            : {}),
          ...(minSalary || maxSalary
            ? {
                "bookingData.price": {
                  ...(minSalary ? { $gte: Number(minSalary) } : {}),
                  ...(maxSalary ? { $lte: Number(maxSalary) } : {})
                }
              }
            : {}),
          ...(roleId
            ? { "bookingData.roles.roleId": new mongoose.Types.ObjectId(roleId) }
            : {})
        }
      },
      {
        $lookup: {
          from: "departments",
          localField: "bookingData.departments.departmentId",
          foreignField: "_id",
          as: "departmentsInfo"
        }
      },
      {
        $lookup: {
          from: "roles",
          localField: "bookingData.roles.roleId",
          foreignField: "_id",
          as: "rolesInfo"
        }
      },
      {
        $addFields: {
          "bookingData.departments": {
            $map: {
              input: "$bookingData.departments",
              as: "dept",
              in: {
                $mergeObjects: [
                  "$$dept",
                  {
                    departmentInfo: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$departmentsInfo",
                            as: "di",
                            cond: { $eq: ["$$di._id", "$$dept.departmentId"] }
                          }
                        },
                        0
                      ]
                    }
                  }
                ]
              }
            }
          },
          "bookingData.roles": {
            $map: {
              input: "$bookingData.roles",
              as: "role",
              in: {
                $mergeObjects: [
                  "$$role",
                  {
                    roleInfo: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$rolesInfo",
                            as: "ri",
                            cond: { $eq: ["$$ri._id", "$$role.roleId"] }
                          }
                        },
                        0
                      ]
                    }
                  }
                ]
              }
            }
          }
        }
      },
      // ✅ Combined match using $or for search on both roles and departments
      {
        $match: {
          ...(search
            ? {
                $or: [
                  { "rolesInfo.name": { $regex: new RegExp(search, "i") } },
                  { "departmentsInfo.name": { $regex: new RegExp(search, "i") } }
                ]
              }
            : {})
        }
      },
      { $sort: { "bookingData.date": 1 } },
      {
        $project: {
          departmentsInfo: 0,
          rolesInfo: 0
        }
      }
    ];

    const results = await AllBooking.aggregate(pipeline);

    if (!results.length) {
      return res.status(404).json({ status: 404, message: "Orders not found", data: [] });
    }

    return res.status(200).json({ status: 200, msg: "Filtered orders", data: results });
  } catch (error) {
    console.error(error);
    return res.status(501).json({ status: 501, message: "Server error", data: {} });
  }
};

