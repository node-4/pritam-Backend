const auth = require("../../../controllers/Client/Home/home");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.get('/api/v1/client/Banner/:id', auth.getBannerById);
    app.get("/api/v1/client/getAllBanner", auth.getAllBanner);
    app.post("/api/v1/user/addAddressToCart/:id", [authJwt.verifyToken], auth.addAddressToCart);
    app.post("/api/v1/user/addShiftDateAndTimeToCart", [authJwt.verifyToken], auth.addShiftDateAndTimeToCart);
    app.post("/api/v1/user/addJobDetailsToCart", [authJwt.verifyToken], auth.addJobDetailsToCart);
    app.post("/api/v1/user/addAddOnToCart", [authJwt.verifyToken], auth.addAddOnToCart);
    app.post("/api/v1/user/addInvoiceDetailsToCart", [authJwt.verifyToken], auth.addInvoiceDetailsToCart);
    app.get("/api/v1/home/getDashboard", authJwt.verifyToken, auth.getDashboard);
}