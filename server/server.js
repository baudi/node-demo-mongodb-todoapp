

// Libraries Import
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
// Local import
const {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

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

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		console.log(todos);
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

app.listen(port, () => {
	console.log(`Started on port ${port}`);
});

module.exports = {app};