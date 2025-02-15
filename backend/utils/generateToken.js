import jwt from "jsonwebtoken"

const generateToken=(res,user)=>{
    let token=jwt.sign({userId:user},"12345",{
        expiresIn:"1d"
    })
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxage:60*60*1000,
    })
}

export default generateToken;