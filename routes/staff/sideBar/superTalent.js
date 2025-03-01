const auth = require("../../../controllers/Staff/sideBar/superTalent");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
        app.get("/api/v1/staff/getSuperTalentStatus", [authJwt.verifyToken], auth.getSuperTalentStatus);
}