const router = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.post('/reset', async (request, response) => {
	await Blog.deleteMany({});
	await User.deleteMany({});

	response.status(204).end();
});

module.exports = router;