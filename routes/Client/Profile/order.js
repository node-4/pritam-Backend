const auth = require("../../../controllers/Client/Profile/orders");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.get('/api/v1/user/Booking/:id', auth.getBookingById);
    app.get("/api/v1/user/getBooking",authJwt.verifyToken, auth.getAllBooking);
    app.put('/api/v1/user/cancelBooking/:id', auth.cancelBooking);

}