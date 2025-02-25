const authConfig = require("../../../configs/auth.config");
const STRIPE_KEY = authConfig.stripe_key;
const stripe1 = require("stripe")(STRIPE_KEY);
const User = require("../../../models/userModel");
exports.saveCard = async (req, res, next) => {
    try {
        console.log(req.user);
        const customer = await stripe1.customers.list({ email: req.user.email });
        if (customer.data.length > 0) {
            const intent = await stripe1.setupIntents.create({
                customer: customer.data[0].id,
                automatic_payment_methods: { enabled: true },
            });
            return res.json({ client_secret: intent });
        } else {
            const customer = await stripe1.customers.create({ email: req.user.email, name: req.user.fullName });
            const intent = await stripe1.setupIntents.create({
                customer: customer.id,
                automatic_payment_methods: { enabled: true },
            });
            return res.json({ client_secret: intent });
        }
    } catch (error) {
        console.log('Error in save Card list:', error);
        res.status(500).json({ error: "Internal server error." });
    }
};
exports.saveCardList = async (req, res, next) => {
    try {
        const data = await User.findById({ _id: req.user._id })
        if (!data) {
            return res.status(400).send({ msg: "not found" });
        }
        const customer = await stripe1.customers.list({ email: data.email });
        if (customer.data.length > 0) {
            const customerId = customer.data[0].id;
            const paymentMethods = await stripe1.paymentMethods.list({ customer: customerId, type: 'card' });
            if (paymentMethods.data.length > 0) {
                return res.status(200).send({ msg: "Data found successfully", data: paymentMethods.data, });
            } else {
                return res.status(200).send({ msg: "Data found successfully", data: [], });
            }
        } else {
            return res.status(200).send({ msg: "Data found successfully", data: [], });
        }
    } catch (error) {
        console.log('Error in save Card list:', error);
        res.status(500).json({ error: "Internal server error." });
    }
};
exports.deleteMyAccount = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id, });
        if (user) {
            let userEmail = user.email;
            const customer = await stripe1.customers.list({ email: userEmail });
            if (customer.data.length > 0) {
                for (let i = 0; i < customer.data.length; i++) {
                    const customerId = customer.data[i].id;
                    const customerDeleted = await stripe1.customers.del(customerId);
                }
                const data2 = await User.findByIdAndDelete({ _id: user._id });
                if (data2) {
                    return res.status(200).send({ msg: "deleted", data: data2 });
                }
            } else {
                const data2 = await User.findByIdAndDelete({ _id: user._id });
                if (data2) {
                    return res.status(200).send({ msg: "deleted", data: data2 });
                }
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ msg: "Internal server error", error: err.message, });
    }
};