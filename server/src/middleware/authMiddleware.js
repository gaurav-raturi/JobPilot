const jwt = require('jsonwebtoken');

const authMidddleware = (req, res, next) => {

    console.log("=== MIDDLEWARE HIT ===");

    console.log(req.headers);

    //Read the authorization header
    const authHeader = req.headers.authorization;

    //Check if the header exists
    if(!authHeader) {
        return res.status(401).json({
            success : false,
            message : 'No token provided'
        });
    }

    //Extract the token
    const token = authHeader.split(" ")[1];

    //Verify the token
    try {

        const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );
    //means i am attaching the logged-in user's information to the request so that every controller can use it. 
    req.user = decoded;

    next();
}
catch(error) {
    return res.status(401).json({
        success : false,
        message : 'Invalid or expired token'
    });
  }
}

module.exports = authMidddleware;