const express = require('express');
const mongoose = require('mongoose');
const Certificate = require('../DB/Certificate');
const { BlockChain, Block } = require('../BlockChain');
const route = express.Router();

var bcjs = new BlockChain();

function canProcess(callback) {
	Certificate.find({}, function(err, res){
		if (err) throw err;
		else {
			const chain = res;
			bcjs = new BlockChain(chain);
			let isValid = bcjs.isChainValid();
			let response = {
				"isValid": isValid,
				"chain": chain
			}
			callback(response);
		}
	});
}

route.post('/push', (req, res) => {
	const {studentId, uploaderId, studentCertificate, institutionId, date} = req.body;
	let certificate = {};
	canProcess(async function(result){
		let canP = result;
		if (canP.isValid === true) {
			let chain = canP.chain;
			certificate = bcjs.addBlock(new Block((chain.length + 1), new Date(), req.body));
			let certificateModel = new Certificate(certificate);
			await certificateModel.save();
			res.json(certificateModel);
		}
		else {
			let response = {
				"responsecode": "01",
				"responsemessage": canP,
				"chain": canP,
				"isValid": canP.isValid
			}
			res.json(response);
		}
	});
});

route.post('/fetch', async(req, res) => {
	const chain = await Certificate.find({});
	res.json(chain);
})


route.post('/find', async(req, res) => {
	const chain = await Certificate.findOne(req.body);
	res.json(chain);
})


route.post('/remove', async(req, res) => {
	const obj = await Certificate.findOneAndDelete(req.body);
	res.json(obj);
})

module.exports = route;