const jwt=require('jsonwebtoken')
require('dotenv').config();

const ensureAuth=(req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth){
        return res.status(403)
        .json({message:"Json is required"})
    }
    try{
        const decoded=jwt.verify(auth, process.env.JWT_SECRET);
        req.user=decoded;
        next();

    }catch(e){
        return res.status(403)
        .json({message:"Unauthorized, jwt"})
    }
}
module.exports=ensureAuth;