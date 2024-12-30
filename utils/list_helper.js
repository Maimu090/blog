const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const likes = blogs
		.map((blog) => blog.likes)
		.reduce((acc, likes) => acc + likes, 0);

	return likes;
};

const mostLiked = (blogs) => {
	let mostLiked = {};
	let maxLikes = 0;

	blogs.forEach((blog) => {
		if (blog.likes > maxLikes) {
			mostLiked = blog;
			maxLikes = blog.likes;
		}
	});

	return mostLiked;
};

const mostBlogs = (blogs) => {
	let authors = {};

	blogs.map((blog) => {
		if (authors[blog.author]) {
			authors[blog.author] += 1;
		} else {
			authors[blog.author] = 1;
		}
	});

	let maxAuthor = Object.keys(authors).reduce((a, b) =>
		authors[a] > authors[b] ? a : b
	);

	const result = {
		author: maxAuthor,
		blogs: authors[maxAuthor],
	};

	return result;
};

const mostLikes = (blogs) => {
	let authors = {};

	blogs.forEach((blog) => {
		if (authors[blog.author]) {
			authors[blog.author] += blog.likes;
		} else {
			authors[blog.author] = blog.likes;
		}
	});

	let maxLikes = Object.keys(authors).reduce((a, b) =>
		authors[a] > authors[b] ? a : b
	);

	const result = {
		author: maxLikes,
		likes: authors[maxLikes],
	};

	return result;
};

module.exports = {
	dummy,
	totalLikes,
	mostLiked,
	mostBlogs,
	mostLikes,
};