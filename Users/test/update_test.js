const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
	let joe;

	beforeEach((done)=>{
		joe = new User({
			name:'Joe', 
			postCount: 3
		});
		joe.save()
			.then( () => done());
	});

	function assertName(operation, done) {
		operation
			.then(() => User.find({}))
			.then((users) => {
				assert(users.length === 1);
				assert(users[0].name === 'Alex');
				done();
			});
	}

	it ('Instance set and save', (done) => {
		// memory
		joe.set('name','Alex');
		// persist to database
		assertName(joe.save(), done);
			
	});

	it ('Instance update', (done) => {
		assertName(joe.update({name: 'Alex'}), done);
	});

	it ('Class update', (done) => {
		assertName(User.update({name: 'Joe'}, {name: 'Alex'}), done);
	});

	it ('class FindOne', (done) => {
		assertName(User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}), done);
	});

	it ('class Find by Id', (done) => {
		assertName(User.findByIdAndUpdate(joe._id, {name: 'Alex'}), done);
	});

	it ('Increment post count', (done) => {
		User.update({name: 'Joe'}, {$inc: {postCount: 3}})
			.then( () => User.findOne({name: 'Joe'}))
			.then( (user) => {
				assert(user.postCount === 6);
				done();
			});
	});

});