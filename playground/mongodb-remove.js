const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


Todo.remove({}).then((result) => {
	console.log(result);
});
// Todo.findOneAndRemove
Todo.findByIdAndRemove({_id: '1213'}).then((todo) => {
	console.log(todo);
});
// Todo.findByIdAndRemove
Todo.findByIdAndRemove('12123').then((todo) => {
	console.log(todo);
});