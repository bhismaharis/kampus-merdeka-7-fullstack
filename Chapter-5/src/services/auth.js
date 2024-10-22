const usersRepository = require("../repositories/users");
const jwt = require("jsonwebtoken");
const { imageUpload } = require("../utils/image-kit");
const bcrypt = require("bcrypt");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.register = async (data, file) => {
    // handle while email already exist
    const userExist = await usersRepository.getUserByEmail(data.email);
    if (userExist) {
        throw new InternalServerError(["Email already exist"]);
    }

    // if there are any file (profile picture)
    if (file?.profile_picture) {
        data.profile_picture = await imageUpload(file.profile_picture);
    }
    
    // create user
    const user = await usersRepository.createUser(data);

    // generate token
    const payload = {
        id: user.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3d", 
    });

    // dont forget to remove the password object, if not removed it will be desplayed in the response
    delete user.password;

    // return the user info and token
    return {
        user,
        token,
    };
};

exports.login = async (data) => {
    // get user by email
    const user = await usersRepository.getUserByEmail(data.email);

    // check if user exist
    if (!user) {
        throw new NotFoundError("User not found");
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
        throw new NotFoundError("Invalid credentials");
    }
    
    // generate token
    const payload = {
        id: user.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });

    // dont forget to remove the password object, if not removed it will be desplayed in the response
    delete user.password;

    // return the user info and token
    return {
        user,
        token,
    };
};