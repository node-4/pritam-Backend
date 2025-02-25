const auth = require("../../../controllers/Client/Profile/paymentMethod");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.post('/api/v1/user/saveCard', authJwt.verifyToken, auth.saveCard);
    app.get("/api/v1/user/saveCardList", authJwt.verifyToken, auth.saveCardList);
    app.delete("/api/v1/user/deleteMyAccount", authJwt.verifyToken, auth.deleteMyAccount);
}