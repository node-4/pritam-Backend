const auth = require("../../../controllers/Client/Mission/onGoingMission");
const authJwt = require("../../../middlewares/authJwt");
module.exports = (app) => {
    app.get('/api/v1/user/onGoingMission/:id', auth.getOnGoingMissionById);
    app.get("/api/v1/user/getOnGoingMission", authJwt.verifyToken, auth.getAllOnGoingMission);
    app.put('/api/v1/user/modifiedOnGoingMission/:id', authJwt.verifyToken, auth.modifiedOnGoingMission);
}