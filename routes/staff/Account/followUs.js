const auth = require("../../../controllers/Staff/Account/followUs/followUs");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.get("/api/v1/user/ContactDetails/:id", auth.getByIdContactDetails);
    app.get("/api/v1/user/viewContactDetails", auth.viewContactDetails);
}