const auth = require("../../../controllers/Client/Profile/contactUs");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.get('/api/v1/user/ContactDetails/:id', auth.getByIdContactDetails);
    app.get("/api/v1/user/getContactDetails", auth.viewContactDetails);
}