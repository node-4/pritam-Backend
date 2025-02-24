const Cart = require('../../../models/New/cart/cart');
const User = require("../../../models/userModel");
const Address = require("../../../models/address");

exports.getCart = async (req, res, next) => {
    try {
        const data = await User.findOne({ _id: req.user._id, });
        if (data) {
            let findCart = await Cart.findOne({ user: req.user._id });
            if (findCart) {
                return res.status(200).json({ status: 200, message: "Get cart successfully.", data: findCart });
            } else {
                    return res.status(404).json({ status: 404, message: "Cart not found.", data: {} });
            }
        } else {
            return res.status(200).json({ status: 500, msg: "User not found", data: {} });
        }
    } catch (error) {
        console.log(error);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};