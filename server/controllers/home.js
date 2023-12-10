const getHome = async(req,res) => {
    console.log(req.session.loggedIn)
    res.render("index")
}

module.exports = getHome;