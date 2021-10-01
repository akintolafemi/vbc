const SHA256 = require('crypto-js/sha256');
const EC = require("elliptic").ec;
const ec = new EC('secp256k1');

class Block {

	//constructor method
	constructor(index, timestamp, data, previousHash = '') {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	//calculate hash of new block
	calculateHash() {
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
	}

	mineBlock(difficulty){
		while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
			this.nonce++;
			this.hash = this.calculateHash();
		}
		//console.log("Block mined: " + this.hash);
	}
}

class BlockChain {
	constructor(chain) {
		this.chain = chain;
		this.difficulty = 2;
	}

	createGenesisBlock(){
		return new Block(0, "01/01/2020", "Genesis Block", "5");
	}

	getLatestBlock1(){
		return this.chain[this.chain.length - 1];
	}

	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}

	addBlock1(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		//newBlock.hash = newBlock.calculateHash();
		newBlock.mineBlock(this.difficulty);
		this.chain.push(newBlock);
	}

	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		//newBlock.hash = newBlock.calculateHash();
		newBlock.mineBlock(this.difficulty);
		//console.log("new block", newBlock);
		return newBlock
		// this.chain.push(newBlock);
	}

	isChainValid1(){
		for(let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (currentBlock.hash !== currentBlock.calculateHash()){
				return false;
			}

			if (currentBlock.previousHash !== previousBlock.hash){
				return false;
			}

			return true;
		}
	}

	isChainValid(){
		if (this.chain.length > 1) {
			for(let i = 1; i < this.chain.length; i++) {
				const currentBlock = this.chain[i];
				const previousBlock = this.chain[i - 1];

				// if (currentBlock.hash !== currentBlock.calculateHash()){
				// return false;
				// }

				if (currentBlock.previousHash !== previousBlock.hash){
					return false;
				}

				return true;
			}
		}
		else {
			return true;
		}
	}

}

module.exports.BlockChain = BlockChain;
module.exports.Block = Block;
