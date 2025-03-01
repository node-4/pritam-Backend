const auth = require("../../../controllers/Staff/sideBar/stats");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
        app.get("/api/v1/staff/getVolumeOfMissionCount", [authJwt.verifyToken], auth.getVolumeOfMissionCount);
        app.get("/api/v1/staff/getSatisfactionPerJob", [authJwt.verifyToken], auth.getSatisfactionPerJob);
        app.get("/api/v1/staff/getPerTypeOfBusiness", [authJwt.verifyToken], auth.getPerTypeOfBusiness);
}