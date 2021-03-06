const express = require("express");
const router = express.Router();
const userService = require("./UsersService");
const verifyTokenMiddleware = require("../Authorization/Authorize");
const utilsService = require("../_helpers/utils");
const responseHandler = require("../_helpers/responseHandler");


/**
 * @desc: Function is defined to login a user based on user and password
 * @param {*} req : Object (request Object)
 * @param {*} res : Object (response Object)
 * @param {*} next : Function
 */
const login = (req, res, next) => {
    userService.login(req.body)
        .then(user => user ? res.json(responseHandler(res,'success', user, '')) : (function(){throw utilsService.errorObject("InvalidCredentials")}()))
        .catch(err => next(err));
}

/**
 * @desc: Function is defined register/create new user
 * @param {*} req : Object (request Object)
 * @param {*} res : Object (response Object)
 * @param {*} next 
 */
const register = (req, res, next) => {
    userService.create(req.body)
        .then(() => res.json(responseHandler(res,'success', null, 'User Registered Successfully.')))
        .catch(err => next(err));
}

/**
 * @desc: Function is defined to fetch all users
 * @param {*} req : Object (request Object)
 * @param {*} res : Object (response Object)
 * @param {*} next 
 */
const getAll = (req, res, next) => {
    userService.getAll()
        .then(users => res.json(responseHandler(res,'success', users, '')))
        .catch(err => next(err));
}



router.post("/login", login);
router.post("/register", register);
router.get("/", verifyTokenMiddleware, getAll); //middleware added to check validate token

module.exports = router;