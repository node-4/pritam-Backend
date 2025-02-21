const auth = require("../../../controllers/Client/Profile/vouchersAndOffers");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.get("/api/v1/user/getAllVouchers", authJwt.verifyToken, auth.getAllVouchers);
    app.get("/api/v1/user/getVoucherById/:id", auth.getVoucherById);
}