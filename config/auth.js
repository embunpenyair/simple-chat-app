// const env = require('../env.json')
const jwt = require('jsonwebtoken')
const env = require('../env.json')
const { response } = require('../utils/helper')

const verifyToken = (token) => jwt.verify(token,env.private_key);
const setToken = (payload = {}) => {
    let token = ''
    try {
        token =  jwt.sign(payload,env.private_key)  
    } catch (error) {
        throw error
    }
    return token
}
const auth = (req,res,callback = Function,roles = []) => {
    let authorization = '',  token,  data = {}
    if(roles[0] !== undefined && roles[0] === '~') return callback(req,res,data)
    try {
        authorization = req.headers['authorization'];
        if(authorization === undefined) throw "Unauthorized";
        token = authorization.split(' ');
        token = token[1];
    } catch (error) { return response(res,401,'fail',error); }
    /************Verify Token*******************/
    try { data = verifyToken(token); console.log(data) } catch (error) { return response(res,401,'fail','Unauthorized'); }
    /************Verify array of roles*******************/
    if(roles[0] === '*') return callback(req,res,data);
        roles = roles.filter((i) =>  i === data.userable_type)
    if(roles.length === 0) return response(res,401,'fail','Unauthorized');
    return callback(req,res,data)
}

const authV2 = (req,res,next,roles) => {
    let authorization = '',  token,  data = {}
    if(roles[0] !== undefined && roles[0] === '~') return callback(req,res,data)
    try {
        authorization = req.headers['authorization'];
        if(authorization === undefined) throw "Unauthorized";
        token = authorization.split(' ');
        token = token[1];
    } catch (error) { return response(res,401,'fail',error); }
    /************Verify Token*******************/
    try { data = verifyToken(token); console.log(data) } catch (error) { return response(res,401,'fail','Unauthorized'); }
    /************Verify array of roles*******************/
    if(roles[0] === '*') return next();
        roles = roles.filter((i) =>  i === data.userable_type)
    if(roles.length === 0) return response(res,401,'fail','Unauthorized');
    return next()
}

module.exports = auth
module.exports.authV2 = authV2
module.exports.setToken = setToken
module.exports.verifyToken = verifyToken