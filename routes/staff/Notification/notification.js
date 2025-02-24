const auth = require("../../../controllers/Staff/Notification/notification");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
        app.get("/api/v1/staff/allNotification", [authJwt.verifyToken], auth.allNotification);
        app.get("/api/v1/staff/getNotificationById/:id",  auth.getNotificationById);
}