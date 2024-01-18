const Class = require("../models/classModel")
const addClass = async (req,res)=>{
    const className = req.body.class;

    const newClass = new Class({
        className:className, //UNİQUE DEĞİLSE HATA ATAR
        students:[]
    })
    await newClass.save()

    res.redirect("/menu")
}

const menu = async (req,res) => {
    let classList = [];
    await Class.find({})
    .then((classes)=>{
        classes.forEach(element=>{
            classList.push(element.className);
        })
    })
    res.render("menu",{"classList":classList});
};

module.exports = {menu,addClass}