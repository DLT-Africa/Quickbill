const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config()
const SECRET = process.env.JWT_SECRET;

const protectedRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        // console.log(authHeader)
        if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

        // const token = req.cookies.jwt;
        // console.log(token)
        const token = authHeader.split(' ')[1];
        // console.log(token)
		if (!token) return res.status(401).json({ error: "Unauthorized" });

        let decodeData;

        //If token is custom token do this
        
            decodeData = jwt.verify(token, SECRET)

            req.userId = decodeData?.id
            req.userEmail = decodeData?.email

        next()

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message }); //internal server

    }
}

module.exports = { protectedRoute}