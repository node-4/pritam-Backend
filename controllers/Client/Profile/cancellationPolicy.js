const staticContent = require('../../../models/staticContent');
const Faq = require("../../../models/faq.Model");
exports.getCancellationPolicy = async (req, res) => {
    try {
            const data = await staticContent.find({ type: "CANCELATION" });
            if (!data || data.length === 0) {
                    return res.status(404).json({ status: 404, message: "No data found", data: {} });
            }
            return res.status(200).json({ status: 200, message: "Data found successfully.", data: data });
    } catch (error) {
            console.log(error);
            return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};
exports.getCancellationPolicyById = async (req, res) => {
    try {
            const data = await staticContent.findById(req.params.id);
            if (!data || data.length === 0) {
                    return res.status(404).json({ status: 404, message: "No data found", data: {} });
            }
            return res.status(200).json({ status: 200, message: "Data found successfully.", data: data });
    } catch (error) {
            console.log(error);
            return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};