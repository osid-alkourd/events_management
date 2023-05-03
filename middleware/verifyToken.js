const jwt = require('jsonwebtoken')

module.exports = (req , res , next) => {
const token = req.header('auth-token')
if(!token) return res.status(401).send('Acess denied')

try {
    const verified = jwt.verify(token , process.env.TOKEN_SECRET)
     req.user = verified
    next()

    //return "Very Code" ;
} catch(err){
    res.status(401).send('invalid token')
}
}