const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
    const bearer = req.headers.authorization
    console.log("bearer", bearer)

    if(!bearer){
        res.status(401).send({message:"Not authorized"})
        return;
    }
}

module.exports = {verify}