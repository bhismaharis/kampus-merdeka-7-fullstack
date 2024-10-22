const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateRegister = (req, res, next) => {
    // Validate request body
    const validateBody = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
    });

    // The file is not required.
    const validateFileBody = z
        .object({
            profile_picture: z
                .object({
                    name: z.string(),
                    data: z.any(),
                })
                .optional()
                .nullable(),
        })
        .optional()
        .nullable();

    // Validate
    const result = validateBody.safeParse(req.body);
    if (!result.success) {
        // If validation fails, return error messages
        throw new BadRequestError(result.error.errors);
    }

    // Validate
    const resultValidateFiles = validateFileBody.safeParse(req.files);
    if (!resultValidateFiles.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateFiles.error.errors);
    }

    next();
};

exports.validateLogin = (req, res, next) => {
    // Validate request body
    const validateBody = z.object({
        email: z.string().email(),
        password: z.string(),
    });

    // Validate
    const result = validateBody.safeParse(req.body);
    if (!result.success) {
        // If validation fails, return error messages
        throw new BadRequestError(result.error.errors);
    }

    next();
};
