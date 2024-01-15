const classList = []; //HER SINIFA ÖZEL CLASS LİST LAZIM
const addClass = async (req,res)=>{
    const className = req.body.class;
    console.log(className)
    if(!classList.includes(className)){
        classList.push(className);
    }
    res.redirect("/menu")
}

const menu = async (req,res) => {
    console.log(classList)
    res.render("menu",{"classList":classList});
};

module.exports = {menu,addClass}