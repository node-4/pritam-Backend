const auth = require("../../../controllers/Staff/Account/MyInvoice/myInvoice");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.get("/api/v1/Staff/getAllInvoice", authJwt.verifyToken, auth.getAllInvoice);
    app.get("/api/v1/Staff/getInvoiceById/:id", authJwt.verifyToken, auth.getInvoiceById);
}