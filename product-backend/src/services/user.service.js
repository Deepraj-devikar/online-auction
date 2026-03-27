import HttpStatus from 'http-status-codes';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//register user
export const registerUser = async (body) => {
	// password hashing before saving to database
	body.password = bcrypt.hashSync(body.password, parseInt(process.env.SALT_ROUND));
	const user = await User.create(body);
	return user;
};

//login user
export const loginUser = async (body) => {
	const user = await User.findOne({email: body.email});
	if(!user){
		return {error: 1, status: HttpStatus.NOT_FOUND, message: "User Not found."};
	}
	const isMatchedPassword = await bcrypt.compare(body.password, user.password);
	if (!isMatchedPassword) {
		return {error: 1, status: HttpStatus.UNAUTHORIZED, message: "Invalid Password!"};
	}
	const token = jwt.sign({id: user.id, email: user.email}, process.env.AUTH_SECRET_KEY);
	return {error: 0, status: HttpStatus.OK, ok: 'ok', user: user, token: token, message: "Login successfull"};
};