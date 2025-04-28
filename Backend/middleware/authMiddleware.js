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
    console.log(req.body)
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
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log(token) // Extract token from Authorization header (Bearer <token>)

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied.' });
  }

  try {
    // Verify token and extract user information
    console.log('yes')
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('yes')
    req.user = decoded; // Attach user info to request object
    next(); // Call next middleware or route handler
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

module.exports = {
    loginValidation,
    signupValidation,
    authenticateToken
};
