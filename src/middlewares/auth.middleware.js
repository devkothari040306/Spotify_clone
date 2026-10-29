const jwt = require('jsonwebtoken');


async function authArtist(req, res , next) {
     const token = req.cookies.token;
     if(!token ) {
        return res.status(401).json({
            message:"Unauthorised access"
        })
     };
     try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        if(decoded.role!=="artist") {
            return res.status(403).json("dont have access")
        }
        req.user=decoded;  // created new property user in request so that  it is passed to the  next steps and used there if token is verified
        next();
    
     }
     catch(err) {
        console.log(err);
        return res.status(401).json ({
            message:'unauthorised'
        })
     }
}
async function authUser(req,res, next) {
    const token = req.cookies.token; 
     if(!token) {
        return res.status(401).json({
            message:"Unauthorised Access"
        })
     };
     try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        if(decoded.role!=="user" && decoded.role!=="artist") {
            return res.status(403).json(
                {
                    message:" dont have access "
                }
            )
        }
        req.user= decoded;
next();
     }
     catch(err) {
    console.log(err);
    return res.status(401).json({
        message:"Unauthorised"
    })
     }
}
module.exports={authArtist , authUser};