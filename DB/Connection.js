const mongoose = require('mongoose');

const URI = "mongodb+srv://fmj:Phemmyladey106@cluster0.9zh0n.mongodb.net/Cluster0?retryWrites=true&w=majority";

const connectDB = async() => {
	await mongoose.connect(URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true });
//	console.log("db connected...");
}

module.exports = connectDB;
