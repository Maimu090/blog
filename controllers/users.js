const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/User');

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs');
	response.json(users);
});

usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body;

	if (!username || !password) {
		return response.status(404).json({
			error: 'username or password are compulsory.',
		});
	}

	if (username.length < 3 || password.length < 3) {
		return response.status(404).json({
			error: 'username or password too short',
		});
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		name,
		username,
		passwordHash,
	});

	const savedUser = await user.save();

	response.status(201).json(savedUser);
});

module.exports = usersRouter;