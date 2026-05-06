var jwt = require('jsonwebtoken');
const JWT_SECRET = 'jwtsecret';

const fetchuser = (req, res, next)=>{
    //Get user from JWT Token and add id to object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate uing a valid token"})
    }
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error){
        res.status(401).send({error:"Please authenticate uing a valid token"})
    }
}

module.exports = fetchuser;