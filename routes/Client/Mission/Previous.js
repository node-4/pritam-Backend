const auth = require("../../../controllers/Client/Mission/previousMission");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.get('/api/v1/user/previousMission/:id', auth.getPreviousMissionById);
    app.get("/api/v1/user/getPreviousMission",authJwt.verifyToken, auth.getAllPreviousMission);
}