const auth = require("../../../controllers/Staff/Home/home");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.get('/api/v1/Staff/Banner/:id', auth.getBannerById);
    app.get("/api/v1/Staff/getAllBanner", auth.getAllBanner);
    app.get("/api/v1/Staff/getAllNewJob", authJwt.verifyToken, auth.getAllNewJob);
    app.get("/api/v1/Staff/getJobById/:id", auth.getJobById);
    app.get("/api/v1/Staff/getAllSeenJob", authJwt.verifyToken, auth.getAllSeenJob);
}