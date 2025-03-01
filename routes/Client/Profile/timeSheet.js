const auth = require("../../../controllers/Client/Profile/myTimeSheets");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.post("/api/v1/user/createTimeSheet",authJwt.verifyToken, auth.createTimeSheet);
    app.get("/api/v1/user/getMyTimeSheet",authJwt.verifyToken, auth.getMyTimeSheet);
    app.get("/api/v1/user/getTimeSheetById/:id",authJwt.verifyToken, auth.getTimeSheetById);
}