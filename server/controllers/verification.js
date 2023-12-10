const User = require('../models/userModel');
const verificate = async (req,res) =>{
    const token = req.params.token;
    console.log(token)
    User.findOne({ verificateToken: token,verificateTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
        user.status = true;
        user.verificateToken = null;
        user.verificateTokenExpiration = null;
        user.save()
        res.redirect("/login");
    })
    .catch((err) => {
        console.error(err);
        res.send(err)
    });
}

module.exports = {verificate}