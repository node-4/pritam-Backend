const auth = require("../../../controllers/Client/Profile/privacyPolicy");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.get('/api/v1/user/Privacy/:id', auth.getPrivacyById);
    app.get("/api/v1/user/getPrivacy", auth.getPrivacy);
}