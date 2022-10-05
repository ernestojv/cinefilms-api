require('dotenv').config();

const config = {
    env : process.env.NODE_ENV || 'development',
    port : process.env.PORT || 3000,
    jwtSecret : process.env.JWT_SECRET,
    atlasUri : process.env.ATLAS_URI,
}

module.exports = config;