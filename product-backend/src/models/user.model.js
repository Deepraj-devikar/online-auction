import { Schema, model } from 'mongoose';

const userSchema = new Schema(
	{
		name: {
			type: String
		},
		email: {
			type: String,
			index: true,
			required: true,
			unique : true 
		},
		password: {
			type: String,
			required: true
		},
		mobile: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

export default model('User', userSchema);