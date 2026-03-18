import Joi from "joi";

// Post operation schemas organized by request part
export const postSchemas = {
    // POST /Resource - Create new post
    create: {
        body: Joi.object({
            applicant: Joi.string().required().messages({
                "any.required": "Resource applicant is required",
                "string.empty": "Resource applicant cannot be empty",
            }),
            amount: Joi.number().required().messages({
                "any.required": "Resource amount is required",
                "string.empty": "Resource amount cannot be empty",
            }),
            status: Joi.string().required().messages({
                "any.required": "status is required",
                "string.empty": "status cannot be empty",
            }),
        }),
    },

    // GET /Resource/:id - Get single post
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Resource ID is required",
                "string.empty": "Resource ID cannot be empty",
            }),
        }),
        query: Joi.object({
            include: Joi.string().valid("comments", "author").optional(),
        }),
    },

    // PUT /Resource/:id - Update post
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Resource ID is required",
                "string.empty": "Resource ID cannot be empty",
            }),
        }),
        body: Joi.object({
            applicant: Joi.string().optional().messages({
                "any.required": "Resource applicant is required",
                "string.empty": "Resource applicant cannot be empty",
            }),
            amount: Joi.number().optional().messages({
                "any.required": "Resource amount is required",
                "string.empty": "Resource amount cannot be empty",
            }),
            status: Joi.string().optional().messages({
                "any.required": "status is required",
                "string.empty": "status cannot be empty",
            }),
        }),
    },

    // DELETE /Resource/:id - Delete post
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Resource ID is required",
                "string.empty": "Resource ID cannot be empty",
            }),
        }),
    },
};