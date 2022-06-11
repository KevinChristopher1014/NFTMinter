const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

const createToken = (id, email) => {
    return jwt.sign({
            id: id,
            email: email
        },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        },
    );
};

var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/;

/**
 * Login user and create token
 *
 * @param  [string] email
 * @param  [string] password
 * @param  [boolean] remember_me
 * @return [string] access_token
 * @return [string] token_type
 * @return [string] expires_at
 */
exports.login = async(req, res, next) => {
    try {
        const { email } = req.body;

        // 1) check if email and password exist
        if (!email) {
            return next(
                new AppError(404, "fail", "Please provide email"),
                req,
                res,
                next,
            );
        }

        if(!email.match(mailformat)) {
            return next(
                new AppError(404, "fail", "Invalid Email"),
                req,
                res,
                next,
            );
        }

        const user = await User.findOne({ email });

        if (!user) {
            return next(
                new AppError(404, "fail", "Email not exist"),
                req,
                res,
                next,
            );
        }

        const token = createToken(user.id, user.email);

        res.status(200).json({
            status: "success",
            token,
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.register = async(req, res, next) => {
    try {

        const {email, wallet_address} = req.body;

        if (!email || !wallet_address) {
            return next(
                new AppError(404, "fail", "Please provide email or wallet address"),
                req,
                res,
                next,
            );
        }

        if(!email.match(mailformat)) {
            return next(
                new AppError(404, "fail", "Invalid Email"),
                req,
                res,
                next,
            );
        }

        const finduser = await User.findOne({ email });
        if(finduser) {
            return next(
                new AppError(404, "fail", "duplicate email"),
                req,
                res,
                next,
            );
        }

        const user = await User.create({
            email: email,
            wallet_address: wallet_address,
        });

        const token = createToken(user.id, user.email);

        res.status(200).json({
            status: "success",
            token,
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.logout = async(req, res, next) => {
    res.status(200).json({
        status: "success",
    });
};


exports.protect = async(req, res, next) => {
    try {
        // 1) check if the token is there
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return next(
                new AppError(
                    404,
                    "fail",
                    "You are not logged in! Please login in to continue",
                ),
                req,
                res,
                next,
            );
        }

        // 2) Verify token
        const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // 3) check if the user is exist (not deleted)
        const user = await User.findById(decode.id);
        if (!user) {
            return next(
                new AppError(404, "fail", "This user is no longer exist"),
                req,
                res,
                next,
            );
        }

        if(user.wallet_address != req.headers.wallet_address) {
            return next(
                new AppError(404, "fail", "not registered wallet"),
                req,
                res,
                next,
            );
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};
