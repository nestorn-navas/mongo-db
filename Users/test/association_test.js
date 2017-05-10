const assert = require('assert');
const mongoose = require('mongoose');
const User     = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment  = require('../src/comment');

describe('Associations', () => {
	let user, post1, comment;
	beforeEach((done) => {
		user = new User({
			name : 'Karl'
		});

		post1 = new BlogPost({
			title: 'First Post',
			content:'Hi, this is my first post'
		});	

		comment = new Comment({
			content:'Nice score!!!'
		});

		comment.user = user;
		post1.comments.push(comment);
		user.blogPosts.push(post1);

		Promise.all([user.save(), post1.save(), comment.save()])
			.then(() => done());
	});

	it('Populates first level properties', (done) => {
		User.findOne({name: 'Karl'})
		.populate('blogPosts')
		.then((user) => {
			assert(user.blogPosts[0].title === 'First Post');
			done();
		});
	});

	it.only('Populates recursively', (done) => {
		User.findOne({name: 'Karl'})
		.populate({
			path: 'blogPosts',
			populate : {
				path: 'comments',
				model: 'comment'
			}
		})
		.then((user) => {
			console.log('-> : '+user.blogPosts[0]);
			//assert(user.blogPosts[0].title === 'First Post');
			done();
		});
	});

});