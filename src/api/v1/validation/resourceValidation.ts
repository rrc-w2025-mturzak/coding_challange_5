import Joi from "joi";

// Post operation schemas organized by request part
export const postSchemas = {
    // POST /Resource - Create new post
    create: {
        body: Joi.object({
            title: Joi.string().required().messages({
                "any.required": "Resource title is required",
                "string.empty": "Resource title cannot be empty",
            }),
            type: Joi.string().required().messages({
                "any.required": "Resource type is required",
                "string.empty": "Resource type cannot be empty",
            }),
            url: Joi.string().required().messages({
                "any.required": "url is required",
                "string.empty": "url cannot be empty",
            }),
            description: Joi.string().required().messages({
                "any.required": "description is required",
                "string.empty": "description cannot be empty",
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
            title: Joi.string().required().messages({
                "any.required": "Resource title is required",
                "string.empty": "Resource title cannot be empty",
            }),
            type: Joi.string().required().messages({
                "any.required": "Resource type is required",
                "string.empty": "Resource type cannot be empty",
            }),
            url: Joi.string().required().messages({
                "any.required": "url is required",
                "string.empty": "url cannot be empty",
            }),
            description: Joi.string().required().messages({
                "any.required": "description is required",
                "string.empty": "description cannot be empty",
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