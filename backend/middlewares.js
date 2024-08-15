const jwt=require("jsonwebtoken");
const { JWTSECRET } = require("./config");
const userauth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWTSECRET);

        req.userId = decoded.userId;
        console.log("in middleware with req "+req.userId)
        next();
    } catch (err) {
        return res.status(403).json({msg:"error at middleware"});
    }
};
module.exports={userauth};