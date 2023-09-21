//created middleware to protect any routes from unauthorised user.
const JWT = require('jsonwebtoken') // to verift token by decrypt


module.exports = async(req,res,next)=>{
    try {
        const token = req.headers['authorization'].split(" ")[1]; // token is at 1 index 
        JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{    // to decode token which is in JWT_SECRET
            if(err){
                return res.status(401).send({
                    success:false,
                    message:'Auth Failed'
                })
            }
            else{
                req.body.userId = decode.userId    //to get decoded value-userId(in auth controller)
                next()
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success:false,
            error,
            message:'Auth Failed'
        })
    }
}
