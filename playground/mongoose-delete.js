require('./../server/config/config');
var mongoose = require('mongoose');
mongoose.set('debug', true);

const {User} = require('./../server/models/user');

// User.find({}).then((users) => {
// 		console.log('Users');
// 		console.log(JSON.stringify(users, undefined, 2));
// 	}, (err) => {
// 		console.log('Unable to fetch users', err);
// 	});
let tokenId = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTAzYmQ0Yzg3NzkwMzA0ODlhYzI1MTAiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTEwMTk0NTA4fQ.zTqiDaQ0JrqQmLy1jxh3yS8eAJPnO7G_UeKV_lsAMy8';
User.findByToken(tokenId).then((user) => {
	user.update({},{$pull: {tokens: {token: tokenId}}}, {});
});
