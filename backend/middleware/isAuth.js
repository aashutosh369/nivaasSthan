import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies; // sabase pahle (req.cookies) se token ko nikala ja rha hai | token browser ke cookie me store hota hai jiss se user ko baar baar login nhi kr na pr ta hai 
    if (!token) { // agar token na mile to...>
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" }); 
    }
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);// agar token mill gya to us ko verify kr na ki kya ye valid token hai 

    console.log("verifyToken:", verifyToken); // Add this in isAuth

    // req.user = verifyToken.userID;

    if (!verifyToken) {// agar token valid nhi huaa to ...>
     return res.status(400).json({ massage: "User don't have a valid token" });
    }
    req.userId = verifyToken.userId; // agar token valid hai to token se userId nikal ke (req.userId) me daal do || har user ke paas unique Id hoti hai to iss ka matalb ki token me jo id ja rhi hai wo unique hai aur uss ka use ke ke ham log user ka data nikal sakte hai 
    next();
  } catch (error) { // agar (isAuth) function galat ho jata hai to ye error return krega....
    return res.status(500).json({ message: `isAuth error ${error}` })
}
}
export default isAuth ;

// overall {isAuth} middleware ka kam hota hai ki ye cookie se token le kr verify karega aur verify hone ke baad user ka id nikal ke de dega...

