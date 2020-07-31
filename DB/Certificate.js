const mongoose = require('mongoose');

const certificate = new mongoose.Schema({
	index: {
		type: Number
	},
	timestamp: {
		type: Date
	},
	data: {
		type: Object
	},
	previousHash: {
		type: String
	},
	hash: {
		type: String
	},
	nonce: {
		type: Number
	}
});
module.exports = Certificate = mongoose.model('certificate', certificate);