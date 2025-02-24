const auth = require("../../../controllers/Staff/Mission/mission");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.get("/api/v1/Staff/getAllOnGoingMission",authJwt.verifyToken, auth.getAllOnGoingMission);
    app.get("/api/v1/Staff/getAllPreviousMission",authJwt.verifyToken, auth.getAllPreviousMission);
}