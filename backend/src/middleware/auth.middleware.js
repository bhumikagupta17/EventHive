import jwt from "jsonwebtoken";
export function requireAuth(req,res,next){
    const header=req.headers.authorization
    if(!header || !header.startsWith("Bearer ")){
        return res.status(401).json({message:"No token provided"})
    }
    const token=header.split(" ")[1]
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    }catch(err){
        return res.status(401).json({message:"invalid token"})
    }
}

export function requireRole(...roles){
    return(req,res,next)=>{
        if(!req.user || !roles.includes(req.user.role)){
            return res.status(403).json({message:"Not authorized"})
        }
        next()
    }
}

export function attachUserIfPresent(req, res, next) {
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) {
    try {
      req.user = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET);
    } catch {
      // invalid/expired token — just treat as anonymous, don't block the request
    }
  }
  next();
}