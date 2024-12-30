const app = require('./app');
const logger = require('./utils/logger');
const config = require('./utils/config');

app.listen(config.PORT, (error, response) => {
	if (error) {
		logger.error(error);
		return;
	}

	logger.info('Server running on port ', config.PORT);
});