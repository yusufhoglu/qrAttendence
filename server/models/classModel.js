const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className:{type:String,unique:true},
    students: []
});


const Classes = mongoose.model(`qrClasses`, classSchema);

module.exports = Classes;