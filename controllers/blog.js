const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', {
		username: 1,
		name: 1,
	});

	response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id);

	if (!blog) {
		return response.status(404).json({
			error: 'Blog does not exists',
		});
	}

	return response.json(blog);
});

blogsRouter.post('/', async (request, response) => {
	const user = await User.findById(request.user);

	const blog = new Blog({
		...request.body,
		user: user._id,
	});

	if (!blog.likes) {
		blog.likes = 0;
	}

	if (!blog.url || !blog.title) {
		return response.status(400).json({ error: 'title or url missing' });
	}

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();

	response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
	const updatedBlog = {
		...request.body,
	};

	const blogExist = await Blog.findById(request.params.id);

	if (!blogExist) {
		return response.status(404).json({
			error: 'Blog does not exists',
		});
	}

	const updated = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
		new: true,
	});

	response.status(200).json(updated);
});

blogsRouter.delete('/:id', async (request, response) => {
	const blogExist = await Blog.findById(request.params.id);

	if (!blogExist) {
		return response.status(404).json({
			error: 'Blog does not exists',
		});
	}

	if (blogExist.user.toString() === request.user.toString()) {
		await Blog.deleteOne({ _id: request.params.id });
		return response.status(204).send({ success: true });
	} else {
		return response.status(401).json({
			error: "You don't have permission to delete this blog",
		});
	}
});

module.exports = blogsRouter;