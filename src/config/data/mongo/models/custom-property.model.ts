import { MongoOIDCError } from './../../../../../node_modules/mongodb/src/error';
import mongoose from "mongoose";
import { createHash } from "../../../../shared/helpers/hashPassword.helper";


const customPropertySchema = new mongoose.Schema({
    propertyname: {type: String, required: true, unique: true},
    propertyvalue: {type: String, required: true}
})

customPropertySchema.pre('save', async function(next){
    //Todo: condición antes de guardar
    next();
})

customPropertySchema.pre('findOneAndUpdate', async function (next){
    //Todo: condición antes de guardar
    next();
})

export const CustomPropertyModel = mongoose.model("customProperty", customPropertySchema)

