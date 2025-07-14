import mongoose from "mongoose";

const templates = new mongoose.Schema({
    propertyname: {type: String, required: true, unique: true},
    propertyvalue: {type: String, required: true}
})

templates.pre('save', async function(next){
    //Todo: condición antes de guardar
    next();
})

templates.pre('findOneAndUpdate', async function (next){
    //Todo: condición antes de guardar
    next();
})

export const CustomPropertyModel = mongoose.model("customProperty", templates)