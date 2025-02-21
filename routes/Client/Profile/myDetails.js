const auth = require("../../../controllers/Client/Profile/myDetails");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.get("/api/v1/user/getMyDetails", authJwt.verifyToken, auth.getMyDetails);
    app.put("/api/v1/user/updateMyDetails", authJwt.verifyToken,auth.updateMyDetails);
}