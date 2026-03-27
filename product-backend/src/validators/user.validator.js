
import Joi from '@hapi/joi';

export const registerUserValidator = (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().min(4).required(),
		email: Joi.string().email({ tlds: { allow: false } }).required(),
		password: Joi.string().min(6).required(),
		mobile: Joi.string().min(10).max(20).required()
	});
	const { error, value } = schema.validate(req.body);
	if (error) {
		next(error);
	} else {
		req.validatedBody = value;
		next();
	}
};

export const loginUserValidator = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email({ tlds: { allow: false } }).required(),
		password: Joi.string().min(6).required()
	});
	const { error, value } = schema.validate(req.body);
	if (error) {
		next(error);
	} else {
		req.validatedBody = value;
		next();
	}
};
