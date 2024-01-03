const jwt = require('jsonwebtoken');

const generateCookieToken = ({email, id}) => {
    const token = jwt.sign({ email, id  }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    
    return token
}

module.exports = {generateCookieToken}