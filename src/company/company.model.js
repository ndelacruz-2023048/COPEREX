import { model, Schema } from "mongoose";

const companySchema = Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    direction:{
        type:String,
        required:[true,'Direction is required']
    },
    companySize:{
        type:String,
        required:[true,'Company Size si required']
    },
    webSite:{
        type:String,
        required:[false],
        default:'website@example.com'
    },
    impactLevel:{
        type:String,
        required:[true,'Impact level is required']
    },
    yearsOfTrajectory:{
        type:Number,
        required:[true,'Years of trajectory is required']
    },
    businessCategory:{
        type:String,
        required:[true,'Business category is required']
    }
})

export default model('Company',companySchema)