import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const genTokenAndSetCookie = (res,id) => {
    const token = jwt.sign({id},process.env.JWT_SECRET,
        {expiresIn:"30d"});

    res.cookie("token",token,{
        httpOnly:true, //cookie cannot be accessed by client side script and hence more secure
        maxAge:30*24*60*60*1000, //30 days
        sameSite: "strict", //cookie will only be sent in a first-party context and not be sent along with requests initiated by third party websites.
    });
    return token;
};

export default genTokenAndSetCookie;