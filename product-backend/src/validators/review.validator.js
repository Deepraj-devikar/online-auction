
import Joi from "@hapi/joi";

export const reviewValidator = async (req, res, next) => {
    console.log("I am review validator");
    const reviewSchema = Joi.object({
        userID: Joi.string().required().min(4),
        description: Joi.string().required().min(4),
        rating: Joi.number().required().min(0).max(5)
    });
    const { error, value } = reviewSchema.validate(req.body);
    if (error) {
        next(error);
    } else {
        req.validated = value;
        next();
    }
}
