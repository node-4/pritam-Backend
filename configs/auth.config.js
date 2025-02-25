require("dotenv").config();

module.exports = {
    secret: process.env.SECRET,
    accessTokenTime: process.env.ACCESS_TOKEN_TIME,
    refreshTokenTime: process.env.REFRESH_TOKEN_TIME,
    stripe_key: process.env.STRIPE_KEY,
};
