const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetStudents = (req, res, next) => {
    const validateQuery = z.object({
        name: z.string(),
        nickname: z.string().optional(),
        bachelor: z.string().optional(),
    });

    const resultValidateQuery = validateQuery.safeParse(req.query);
    if (!resultValidateQuery.success) {
        throw new BadRequestError(resultValidateQuery.error.errors);
    }

    next();
};

exports.validateGetStudentById = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        throw new BadRequestError(resultValidateParams.error.errors);
    }

    next();
};

exports.validateCreateStudent = (req, res, next) => {
    // Validation body schema
    const validateBody = z.object({
        name: z.string(),
        nickname: z.string(),
        class: z.string(),
        "address.city": z.string(),
        "address.province": z.string(),
        "education.bachelor": z.string().optional().nullable(),
    });

    // The file is not required.
    const validateFileBody = z
        .object({
            profilePicture: z
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

exports.validateUpdateStudent = (req, res, next) => {
    // zod validation
    const validateParams = z.object({
        id: z.string(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateParams.error.errors);
    }

    // Validation body schema
    const validateBody = z.object({
        name: z.string(),
        nickname: z.string(),
        class: z.string(),
        address: z.object({
            province: z.string(),
            city: z.string(),
        }),
        education: z
            .object({
                bachelor: z.string().optional().nullable(),
            })
            .optional()
            .nullable(),
    });

    // Validate
    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        // If validation fails, return error messages
        throw new BadRequestError(result.error.errors);
    }

    next();
};

exports.validateDeleteStudentById = (req, res, next) => {
    // Make a validation schema
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        // If validation fails, return error messages
        throw new BadRequestError(result.error.errors);
    }

    next();
};
