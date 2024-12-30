const express = require('express');
require('express-async-errors');
const config = require('./utils/config');

const app = express();

const cors = require('cors');
const logger = require('./utils/logger');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');

const mongoose = require('mongoose');

logger.info('connecting to', config.MONGODB_URI);

// create mongoose connection here
mongoose.set('strictQuery', false);
mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB');
	})
	.catch((error) => {
		logger.error('Failed to connect', error);
	});

// middlewares
app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/blogs', middleware.userExtractor, blogsRouter);
if (process.env.NODE_ENV === 'tests') {
	const testingRouter = require('./controllers/testing');
	app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;