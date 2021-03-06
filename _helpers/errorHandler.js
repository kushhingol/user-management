const responseHandler = require("./responseHandler");

/**
 * @desc: Function is defined to handle thrown errors
 * @param {*} err : Object
 * @param {*} req : Object
 * @param {*} res : Object
 * @param {*} next : Function
 * @returns res: Configured response object
 */
const errorHandler = (err, req, res, next) => {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json(responseHandler(res,'error', null,err));
    }

	switch(err.name) {
		case 'ValidationError':
			return res.status(400).json(responseHandler(res,'error', null, err.message));
		case 'UnauthorizedError':
			return res.status(401).json(responseHandler(res,'error', null, 'Unauthorized. Invalid Token'));
		case 'InvalidCredentials':
			return res.status(401).json(responseHandler(res,'error', null, 'Bad Credentials. Username or password is incorrect'))
		case 'UserNameAlreadyTaken':
			return res.status(200).json(responseHandler(res,'error', null, 'User Name Already Taken'))
		default:
			return res.status(500).json(responseHandler(res, 'error', null, err.message));
			
	}


}

module.exports = errorHandler;