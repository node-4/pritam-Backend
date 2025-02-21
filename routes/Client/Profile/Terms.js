const auth = require("../../../controllers/Client/Profile/termsAndCondition");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.get('/api/v1/user/terms/:id', auth.getTermsById);
    app.get("/api/v1/user/getTerms", auth.getTerms);
}