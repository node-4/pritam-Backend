const auth = require("../../../controllers/Client/Profile/faq");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.get("/api/v1/user/getFaq", auth.getFaq);
    app.get("/api/v1/user/getFaqById/:id", auth.getFaqById);
}