const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { BadRequestError, Unauthorized } = require("../utils/request");
const usersRepository = require("../repositories/users");

exports.authorizations =
    (...roles) =>
    async (req, res, next) => {
        // get token from request header
        const authorizationsHeader = req.header("authorization");
        if (!authorizationsHeader) {
            throw new Unauthorized("You need to login in advance!");
        }

        const splittedAuthHeader = authorizationsHeader.split(" ");
        if (splittedAuthHeader.length <= 1) {
            throw new Unauthorized("Token is not valid");
        }

        const token = splittedAuthHeader[1];

        // extract user from token
        const extractedToken = jwt.verify(token, process.env.JWT_SECRET);

        // get information of the user that has that token
        const user = await usersRepository.getUserById(extractedToken.user_id);

        // validate the role that can be access to the next middleware
        const accessValidation = roles.includes(user.role_id);
        if (!accessValidation) {
            throw new Unauthorized("You can't access this resource");
        }

        // pass the user to request, then every middleware can access the user profile without needing to get again in repository level
        req.user = user;

        next();
    };

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
