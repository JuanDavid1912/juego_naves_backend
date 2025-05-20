const {verifyToken} = require('../utils/auth');

const authentication  = async(req, res, next) =>{
    const token =req.headers['authorization'];

    if(!token){
        return res.status(403).json({message:"The token was not given", content:""});
    }
    try{
        const decoded = await verifyToken(token);
        req.user = decoded;
        next();
    }
    catch(error){
        res.status(401).json({message:"Error with the authentication",content:""});
    }
};

module.exports = authentication;