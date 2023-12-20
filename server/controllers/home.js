const getHome = async(req,res) => {
    console.log("giriş bilgisi"+req.session.loggedIn)
    res.render("index")
}

module.exports = getHome;