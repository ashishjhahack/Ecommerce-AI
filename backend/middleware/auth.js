import jwt from 'jsonwebtoken';

// whenever user add , update or get cart data they have to be login

const authUser = async (req, res, next) => {
    const {token} = req.headers;    // get the token from header
    if(!token) {
        return res.json({success: true, message: "Not Authorized Login Again"})
    }
    try {     // here we decode the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;         // get this {id} from a userController where we creted this token
        next();
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}
export default authUser