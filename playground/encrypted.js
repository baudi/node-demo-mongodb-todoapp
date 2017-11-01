const bcrypt = require('bcryptjs');

var password = '123asdf'; 
 bcrypt.genSalt(10, (err, salt) => {
 	bcrypt.hash(password, salt, (err, hash) => {
 		console.log(hash);
 	});
 });
 
 var hashedPassword = '$2a$10$f.s1kAZ1mDdytxnDtICUaeMltBLWa8wscmy18SPn9RORWTi0j5wCS';
 bcrypt.compare(password, hashedPassword, (err, res) => {
 	console.log(res);
 });