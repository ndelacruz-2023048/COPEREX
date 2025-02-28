import Company from "../src/company/company.model.js";

export const validateCategoryParam =async (request,response,next)=>{
    const {category}=request.query
    const categories = await Company.findOne({businessCategory:category}) 
    const validCategories = await Company.find().select('-_id businessCategory') 
    if(!categories){
    return response.status(400).send({success:false,message:'Provide a valid category',ValidCategories:validCategories})
    }
    next()
}