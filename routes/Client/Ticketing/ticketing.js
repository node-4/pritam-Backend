const auth = require("../../../controllers/Client/Ticketing/ticketing");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.get('/api/v1/user/Ticketing/:id', auth.getTicketingById);
    app.get("/api/v1/user/getTicketing",authJwt.verifyToken, auth.getAllTicketing);
}