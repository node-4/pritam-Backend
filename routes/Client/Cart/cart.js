const auth = require("../../../controllers/Client/cart/cart");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
        app.get("/api/v1/user/getCart", [authJwt.verifyToken], auth.getCart);
}