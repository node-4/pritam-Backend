const auth = require("../../../controllers/Client/Profile/attendance");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.post("/api/v1/user/markAttendance", authJwt.verifyToken, auth.markAttendance);
    app.get("/api/v1/user/getAttendance", authJwt.verifyToken, auth.getAttendance);
    app.get("/api/v1/user/getAttendanceById/:id", authJwt.verifyToken, auth.getAttendanceById);
}