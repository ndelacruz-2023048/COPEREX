import { model, Schema } from "mongoose";

const adminSchema = Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    lastname:{
        type:String,
        required:[true,'Lastname is required']
    },
    username:{
        type:String,
        required:[true,'Username is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    department:{
        type:String,
        required:[true,'Departament is required']
    }
})

export default model('Admin',adminSchema)