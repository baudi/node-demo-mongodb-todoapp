const {SHA256} = require('crypto-js');

let message = 'I am user number 3';
let hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

var data = {
	id: 4
};
var token = {
	data: data,
	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret');
if (resultHash === token.hash) {
	console.log('Data was not changed');
}else {
	console.log('Data was changed. Do not trust!');
}
// That is only for academic purpose