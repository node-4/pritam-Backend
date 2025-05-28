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
const slot = require('../../../../models/New/slot');
async function generateSlots(staffId) {
    try {
        console.log("Generating weekly slots for staff:", staffId);
        const slotDuration = 60 * 60 * 1000; // 15-minute slots
        const slots = [];
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
            let dayName = daysOfWeek[dayIndex];
            let startTime = new Date();
            startTime.setUTCHours(0, 0, 0, 0); // Start from 00:00:00
            let endTime = new Date(startTime.getTime());
            endTime.setUTCHours(23, 0, 0, 0); // End at 23:00:00
            while (startTime.getTime() <= endTime.getTime()) {
                const slotTime = startTime.toISOString().split("T")[1].split(".")[0]; // Extract HH:mm:ss only
                const obj = {
                    staffId: staffId,
                    slot: slotTime, // Save only time (HH:mm:ss)
                    dayName: dayName
                };
                const findSlot = await slot.findOne({ staffId, slot: slotTime, dayName });
                if (!findSlot) {
                    const newSlot = new slot(obj);
                    await newSlot.save();
                    slots.push(obj);
                }
                startTime.setTime(startTime.getTime() + slotDuration);
            }
        }
        return slots;
    } catch (error) {
        console.error("Error generating slots:", error);
    }
}
async function generateSlotsForOneYear() {
    let findUser = await userModel.find({ userType: "STAFF" });
    if (findUser.length > 0) {
        for (let i = 0; i < findUser.length; i++) {
            let findData = await slot.find({ staffId: findUser[i]._id })
            if (findData.length != 168) {
                await generateSlots(findUser[i]._id);
            }
        }
    }
}
setInterval(async () => {
    try {
        console.log("-----------Calling generateSlotsForOneYear function---------");
        await generateSlotsForOneYear();
    } catch (error) {
        console.error("Error occurred while generating slots:", error);
    }
}, 60000);
// }, 7200000);
exports.getSlot = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ status: 404, message: "not found", data: {} });
        } else {
            let findData = await slot.find({ staffId: user._id, })
            if (findData.length > 0) {
                return res.status(200).send({ status: 200, message: "TimeSheet found", data: findData });
            }
            return res.status(404).send({ status: 404, message: "TimeSheet not found", data: [] });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 500, message: "internal server error " + err.message, });
    }
};
exports.getSlotById = async (req, res) => {
    try {
        let findData = await slot.findById({ _id: req.params.id, })
        if (findData) {
            return res.status(200).send({ status: 200, message: "TimeSheet found", data: findData });
        }
        return res.status(404).send({ status: 404, message: "TimeSheet not found", data: {} });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 500, message: "internal server error " + err.message, });
    }
};
exports.updateSlotById = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ status: 404, message: "not found", data: {} });
        } else {
            let findData = await slot.findOne({ _id: req.params.id, staffId: user._id })
            if (findData) {
                if (findData.slotBlocked == true) {
                    let update = await slot.findByIdAndUpdate({ _id: findData._id, }, { $set: { slotBlocked: false } }, { new: true })
                    if (update) {
                        return res.status(200).send({ status: 200, message: "Slot found", data: update });
                    }
                } else {
                    let update = await slot.findByIdAndUpdate({ _id: findData._id, }, { $set: { slotBlocked: true } }, { new: true })
                    if (update) {
                        return res.status(200).send({ status: 200, message: "Slot found", data: update });
                    }
                }
            } else {
                return res.status(404).send({ status: 404, message: "Slot not found", data: {} });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 500, message: "internal server error " + err.message, });
    }
};
exports.updateWeekSlot = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ status: 404, message: "not found", data: {} });
        } else {
            let update = await userModel.findByIdAndUpdate({ _id: user._id, }, { $set: req.body }, { new: true })
            if (update) {
                if (update.sunday == true) {
                    updateWeekDaySlot(update._id, "Sunday");
                }
                if (update.monday == true) {
                    updateWeekDaySlot(update._id, "Monday");
                }
                if (update.tuesday == true) {
                    updateWeekDaySlot(update._id, "Tuesday");
                }
                if (update.wednesday == true) {
                    updateWeekDaySlot(update._id, "Wednesday");
                }
                if (update.thursday == true) {
                    updateWeekDaySlot(update._id, "Thursday");
                }
                if (update.friday == true) {
                    updateWeekDaySlot(update._id, "Friday");
                }
                if (update.saturday == true) {
                    updateWeekDaySlot(update._id, "Saturday");
                }
                return res.status(200).send({ status: 200, message: "Slot found", data: update });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 500, message: "internal server error " + err.message, });
    }
};
async function updateWeekDaySlot(staffId, dayName) {
    try {
        // Update all matching slots in a single query
        const result = await slot.updateMany({ staffId, dayName }, { $set: { slotBlocked: false } });
        if (result.modifiedCount > 0) {
            console.log(`Successfully updated ${result.modifiedCount} slots for ${dayName}.`);
        } else {
            console.log(`No slots found for staff ${staffId} on ${dayName}.`);
        }

        return result;
    } catch (error) {
        console.error(`Error updating slots for staff ${staffId} on ${dayName}:`, error);
        throw error; // Re-throw if you want calling functions to handle it
    }
}