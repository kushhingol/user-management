
/**
 * @desc: Function is defined to generate error Object for the given errorType
 * @param {*} errType : String
 * @returns Object
 */
const errorObject = (errType) => {
	const err = new Error()
	err.name = errType;
	return err;
}

// currently the function is not utilized but we can utilize the function to decode base64 string 
// if we want to authenticate client_id and client_secret using basic Auth
/**
 * @desc: Function is defined to decode base64 String
 * @param {*} base64String : String
 * @returns Json
 */
const decodeBase64 = (base64String) => {
	const bufferObj = Buffer.from(base64String, 'base64');
	let decodeValue = bufferObj.toString('utf8').split(':');
	return {
		username: decodeValue[0],
		password: decodeValue[1]
	}
	
}
module.exports = {errorObject, decodeBase64};