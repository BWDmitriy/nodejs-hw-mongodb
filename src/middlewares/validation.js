// src/middlewares/validation.js

export const validateBody = (schema) => {
    return (req, res, next) => {
        const {
            error
        } = schema.validate(req.body);
    }
}
