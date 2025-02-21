const auth = require("../../../controllers/Client/Profile/invoices");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.get("/api/v1/user/getAllInvoice", authJwt.verifyToken, auth.getAllInvoice);
    app.get("/api/v1/user/getInvoiceById/:id", authJwt.verifyToken, auth.getInvoiceById);
}