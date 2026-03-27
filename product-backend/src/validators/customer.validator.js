import Joi from '@hapi/joi';

export const customerValidator = (req, res, next) => {
	const schema = Joi.object({
        userID: Joi.string().min(4).required(),
		name: Joi.string().min(4).required(),
        phoneNumber: Joi.string().min(10).max(20).required(),
		addressType: Joi.string().min(1).max(8).required(),
        fullAddress: Joi.string().min(8).max(60).required(),
        city: Joi.string().min(2).max(30).required(),
        landmark: Joi.string().min(4).max(30),
        state: Joi.string().min(2).max(30).required(),
        pinCode: Joi.string().min(2).max(10),
        locality: Joi.string().min(2).max(30),
        addressIndex: Joi.number().integer().min(4)
	});
	const { error, value } = schema.validate(req.body);
	if (error) {
		next(error);
	} else {
		req.validatedBody = value;
		next();
	}
};