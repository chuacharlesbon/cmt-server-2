import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: [true, "Full Name is required"]
	},
	mobileNumber: {
		type: String,
		//required: [true, "Mobile number is required"]
	},
	email: {
		type: String,
		//required: [true, "Email is required"]
	},
});

module.exports = mongoose.model("User", userSchema)