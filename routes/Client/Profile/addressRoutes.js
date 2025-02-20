const auth = require("../../../controllers/Client/Profile/AddressController");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
        app.post("/api/v1/user/address/new", [authJwt.verifyToken], auth.createAddress);
        app.get('/api/v1/user/address/:id', [authJwt.verifyToken], auth.getAddressById);
        app.put('/api/v1/user/address/update/:id', [authJwt.verifyToken], auth.updateAddress);
        app.delete('/api/v1/user/address/:id', [authJwt.verifyToken], auth.deleteAddress);
        app.get("/api/v1/user/getAddress", [authJwt.verifyToken], auth.getallAddress);
}