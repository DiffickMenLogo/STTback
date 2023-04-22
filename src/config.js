const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
	path: path.join(__dirname, '.env')
});

module.exports = {
	PORT: process.env.PORT,
	MONGO_CONNECTION_URL: process.env.MONGO_CONNECTION_URL,
	JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
