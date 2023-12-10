const logOut = async (req,res)=>{
    req.session.loggedIn = false;
    res.redirect("/login")
}
module.exports = {logOut}