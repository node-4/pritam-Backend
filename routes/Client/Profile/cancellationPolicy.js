const auth = require("../../../controllers/Client/Profile/cancellationPolicy");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.get('/api/v1/user/cancellationPolicy/:id', auth.getCancellationPolicyById);
    app.get("/api/v1/user/getCancellationPolicy", auth.getCancellationPolicy);
}