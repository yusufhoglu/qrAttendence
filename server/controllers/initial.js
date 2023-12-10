const initial = async (req,res) => {
    console.log(req.session.loggedIn)
    if(!req.session.loggedIn){
        res.redirect("login")
    }else{
        res.redirect("home")
    }
}

module.exports = initial;