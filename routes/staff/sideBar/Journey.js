const auth = require("../../../controllers/Staff/sideBar/journey");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
        app.get("/api/v1/staff/getJourney", [authJwt.verifyToken], auth.getJourney);
}