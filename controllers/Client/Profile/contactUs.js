const ContactDetail = require("../../../models/ContactDetail");
exports.viewContactDetails = async (req, res) => {
    try {
        let findContactDetails = await ContactDetail.findOne({ contactType: "Main" });
        if (!findContactDetails) {
            return res.status(404).send({ status: 404, message: "Contact Detail not found.", data: {} });
        } else {
            return res.status(200).send({ status: 200, message: "Contact Detail fetch successfully", data: findContactDetails });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 500, msg: "internal server error", error: err.message, });
    }
};
exports.getByIdContactDetails = async (req, res) => {
    try {
        let findContactDetails = await ContactDetail.findOne({ _id: req.params.id });
        if (!findContactDetails) {
            return res.status(404).send({ status: 404, message: "Contact Detail not found.", data: {} });
        } else {
            return res.status(200).send({ status: 200, message: "Contact Detail fetch successfully", data: findContactDetails });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: 500, msg: "internal server error", error: err.message, });
    }
};