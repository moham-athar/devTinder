const isAdmin = (req, res, next) => {
    const token = "xadsadadyz";
    const isAdminAuthorized = token == "xyz";
    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized Acces");
    } else {
        next();
    }
}


const userAuth = (req, res, next) => {
   const token = "xyz";
   const userToken = "xyz";
   if (userToken != token) {
    res.staus(401).send("Unauthorised Acces");
   } else {
    next();
   }
   
}
module.exports = {
    isAdmin,
    userAuth
}