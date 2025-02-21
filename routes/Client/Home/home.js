const auth = require("../../../controllers/Client/Home/home");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.get('/api/v1/home/Banner/:id', auth.getBannerById);
    app.get("/api/v1/home/getAllBanner", auth.getAllBanner);
    app.get("/api/v1/home/getDashboard",authJwt.verifyToken, auth.getDashboard);
}