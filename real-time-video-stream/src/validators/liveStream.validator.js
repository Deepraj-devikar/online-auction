import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const liveStreamValidator = (req, res, next) => {
    try {
        const schema = Joi.object({
            startDuration: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/),
            liveStreamDuration: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/),
            appName: Joi.string().required().min(4)
        });

        const validation = schema.validate(req.body);
        if (validation.error) {
            throw {
                code: HttpStatus.UNPROCESSABLE_ENTITY,
                message: validation.error.message
            }
        }

        req.validatedBody = validation.value;
        next();
    } catch (error) {
        next(error);
    }
}