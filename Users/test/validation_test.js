const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
	it ('Requires a user name', () => {
		const user = new User({
			name: undefined
		});

		// validateSync instantly ger back a result
		const validationResult = user.validateSync();
		// const message = validationResult.errors.name.message;
		const {message} = validationResult.errors.name;
		assert( message === 'Name is required.')
	});

	it ('Name must be at least 3 characters long', () => {
		const user = new User({
			name : 'Al'
		});

		const  validationResult = user.validateSync();
		const {message} = validationResult.errors.name;
		assert( message === 'Name must be longer than 2 characters.')

	});

	it ('Should not save a record with invalid length', (done) => {
		const user = new User({
			name : 'Al'
		});

		user.save()
			.catch( (validationResult) => {
				const {message} = validationResult.errors.name;
				assert( message === 'Name must be longer than 2 characters.');
				done();
			});
		
	} );

});