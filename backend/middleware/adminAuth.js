import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        const {token} = req.headers;    // token is sent in headers
        if(!token){
            return res.json({success: false, message: "No token provided"});
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: 'Not authorized login again'})
        }
        next();
    } catch (error) {
        console.log(error)
        return res.json({success: true, message: error.message})
    }
}

export default adminAuth;