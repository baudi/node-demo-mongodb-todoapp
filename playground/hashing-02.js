 const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
//Create the token
var data = {
	id: 10
};

let token = jwt.sign(data, '123abc');
console.log(`token: ${token}`);
// Validad the token
let decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);