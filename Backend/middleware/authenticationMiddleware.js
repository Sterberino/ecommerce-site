const jwt = require('jsonwebtoken');


const Authenticate = async(req, res, next)=> {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer '))
    {
        throw new Error('Invalid Authentication');
    }

    const token = authHeader.split(' ')[1];

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            userId: payload.userId,
            name: payload.name,
            email: payload.email
        }
        next();
    }
    catch(err)
    {
        return res.status(401).json({error: err.message});
    }
}

module.exports = Authenticate;