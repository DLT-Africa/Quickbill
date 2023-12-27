const jwt = require('jsonwebtoken');

const generateCookieToken = ({email, id}) => {
    const token = jwt.sign({ email, id  }, process.env.JWT_SECRET, {
        expiresIn: '30m',
    });
    
    return token
}

module.exports = {generateCookieToken}