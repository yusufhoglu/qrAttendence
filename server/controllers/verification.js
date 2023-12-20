const {User} = require('../models/userModel');
const verificate = async (req,res) =>{
    try {
        const token = req.params.token;
        const user = await User.findOne({ verificateToken: token, verificateTokenExpiration: { $gt: Date.now() } });
        if (user) {
            user.status = true;
            user.verificateToken = null;
            user.verificateTokenExpiration = null;
            await user.save();
            res.redirect("/login");
        } else {
            res.send("User not found");
        }
    } catch (err) {
        console.error(err);
        res.send(err);
    }
}

module.exports = {verificate}