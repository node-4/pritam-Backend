const auth = require("../../../controllers/Client/Profile/contactPreference");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
        app.post("/api/v1/user/ContactPreference/create", [authJwt.verifyToken], auth.createContactPreference);
        app.delete("/api/v1/user/ContactPreference/delete/:id", [authJwt.verifyToken], auth.deleteContactPreference);
        app.put("/api/v1/user/ContactPreference/update/:id", [authJwt.verifyToken], auth.updateContactPreference);
}