var mongoose = require('mongoose');

var User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		minLength: 1,
		trim: true
	},
	lastname: {
		type: String,
		required: true,
		minLength: 1,
		trim: true
	},
	age {
		type: Number,
		required: true,
		minLength: 1,
		trim: true
	}
});

module.exports = {User};