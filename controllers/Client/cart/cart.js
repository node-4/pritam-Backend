const Cart = require('../../../models/New/cart/cart');
const User = require("../../../models/userModel");
const Address = require("../../../models/address");
const Booking = require('../../../models/New/Order/booking');
const AllBooking = require('../../../models/New/Order/AllBooking');
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
const reffralCode = async () => {
    var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let OTP = '';
    for (let i = 0; i < 9; i++) {
        OTP += digits[Math.floor(Math.random() * 36)];
    }
    return OTP;
};
exports.checkOut = async (req, res) => {
    try {
        let findCart = await Cart.findOne({ user: req.user._id })
        if (findCart) {
            let bookingIds = [], orderId = await reffralCode();
            let vat = 10, total = 0, subTotal = 0;
            total += vat;
            let cartResponse = findCart.toObject();
            console.log(cartResponse)
            if (cartResponse.dateArray.length > 0) {
                let subTotal2 = 0, total2 = 0;
                subTotal2 = cartResponse.missionPrice;
                total2 = cartResponse.missionPrice;
                for (const cartProduct of cartResponse.dateArray) {
                    let obj1 = {
                        orderId: orderId,
                        user: findCart.user._id,
                        departments: findCart.departments,
                        roles: findCart.roles,
                        subTotal: subTotal2,
                        total: total2,
                        date: cartProduct.date,
                        toTime: cartProduct.endTime,
                        fromTime: cartProduct.startTime,
                    }
                    const Data = await Booking.create(obj1);
                    if (Data) {
                        bookingIds.push(Data._id)
                    }
                    console.log(obj1)
                }
            }
            let obj1 = {
                user: findCart.user,
                orderId: orderId,
                bookingIds: bookingIds,
                vat: vat,
                subTotal: subTotal,
                total: total,
                outfits: findCart.outfits,
                equipment: findCart.equipment,
                contactName: findCart.contactName,
                phone: findCart.phone,
                mobility: findCart.mobility,
                description: findCart.description,
                pinCode: findCart.pinCode,
                parkingAccess: findCart.parkingAccess,
                name: findCart.name,
                address: findCart.address,
                country: findCart.country,
                state: findCart.state,
                city: findCart.city,
                invoiceDetails: findCart.invoiceDetails,
                companyRegistrationNumber: findCart.companyRegistrationNumber,
                invoiceCountry: findCart.invoiceCountry,
                invoicePinCode: findCart.invoicePinCode,
                invoiceCity: findCart.invoiceCity,
                invoiceAddress: findCart.invoiceAddress,
                invoiceName: findCart.invoiceName,
                location: findCart.location,
            };
            let savedData = await AllBooking.create(obj1);
            if (savedData) {
                for (let i = 0; i < bookingIds.length; i++) {
                    let update = await Booking.findByIdAndUpdate({ _id: bookingIds[i] }, { $set: { allBookingId: savedData._id } }, { new: true });
                }
                await Cart.findByIdAndDelete({ _id: findCart._id });
                return res.status(200).json({ success: true, msg: "Booking is done", booking: savedData });
            }
        } else {
            return res.status(200).json({ success: false, msg: "Cart is empty", cart: {} });
        }
    } catch (error) {
        console.log(error)
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};