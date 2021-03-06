require('./config/config');
const _ = require('lodash');
// Libraries Import
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
// Local import
const {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');
let {authenticate} = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
// POST /todos
app.post('/todos', (req, res) => {
	let todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});
// GET /todos
app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e)=>{
		res.status(400).send(e);
	});
});
// GET /todos/12343
app.get('/todos/:id', (req, res) => {
	let id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(400).send();
	}

	Todo.findById(id).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e)=>{
		res.status(400).send();
	});
});
// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
	// Get the id
	let id = req.params.id;
	// validate the id -> not valid? return 404
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}
	// remove todo by id
	Todo.findByIdAndRemove(id).then((todo) => {
		if (!todo) {
			// if no doc, send 404
			return res.status(404).send();
		}
		// if doc, send doc back with 200
		res.status(200);
		res.send({todo});
	}).catch((e) => {
		// error
		// 400 with empty body
		res.status(400).send();
	});
});
// UPDATE /todos/:id
app.patch('/todos/:id', (req, res) => {
	let id = req.params.id;
	let body = _.pick(req.body, ['text', 'completed']);

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	}else {
		body.completed = false;
		body.completedAt = null;
	}
	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
	 	if (!todo) {
	 		return res.status(404).send();
	 	}
	 	res.send({todo});
	 }).catch((e) => {
	 	res.status(400).send();
	 });
});
// POST /users
app.post('/users', (req, res) => {
	let body = _.pick(req.body, ['email', 'password']);
	let user = new User(body);

	user.save().then((user) => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e)=> {
		res.status(400).send(e);
	});
});
// GET /users/me
app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});
// DELETE /users/me/token
app.delete('/users/me/token', authenticate, (req, res) => {
	req.user.removeToken(req.token).then(() => {
		res.status(200).send();
	}, () => {
		res.status(400).send();
	});
});
// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
	let body = _.pick(req.body, ['email', 'password']);
	User.findByCredentials(body.email, body.password)
	.then((user) => {
		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user);
		});
	})
	.catch((e) => {
		res.status(400).send();
	});
});

app.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = {app};