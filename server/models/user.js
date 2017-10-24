const mongoose = require('mongoose');
const validator = require('validator');

let UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		minLength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: (value) => {
				return validator.isEmail(value);
			},
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		require: true,
		minLength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});
UserSchema.methods.generateAuthToken = function () {
	let user = this;
	let access = 'auth';
	let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

	user.tokens.push({access, token});

	return user.save().then(()=>{
		return token;
	});
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};