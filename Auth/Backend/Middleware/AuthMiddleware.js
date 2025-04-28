const Joi = require('joi');

// Middleware for signup validation
const signupValidation = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: 'Bad request',
            error: error.details.map((detail) => detail.message), // Extract error details
        });
    }

    next();
};

// Middleware for login validation
const loginValidation = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: 'Bad request',
            error: error.details.map((detail) => detail.message), // Extract error details
        });
    }

    next();
};

module.exports = {
    loginValidation,
    signupValidation,
};
