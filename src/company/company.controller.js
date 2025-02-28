import Company from './company.model.js'

export const newCompany =async (request,response)=>{
    try {   
        const data = request.body
        const isDuplicatedNameCompany = await Company.findOne({name:data.name})
        if(isDuplicatedNameCompany){
            return response.status(400).send({success:false,message:"Company exists yet!!!"})
        }

        const company = new Company(data)
        company.save()
        response.status(400).send({success:true, message:'Saved new company succesfully',company})
    } catch (error) {
        response.status(500).send({success:false,message:"Internal server error"})
    }
}

export const getCompanies = async(request,response)=>{
    try {

        const companies = await Company.find()

        response.status(200).send({success:true,message:'Companies',companies})
    } catch (error) {   
        response.status(500).send({success:false,message:'Intenal server error'})
    }
}

export const getCompaniesFilterAlphabetic = async(request,response)=>{
    try {
        const query = request.query
        const orderCategory = query.filter === 'a-z' ? 1 : -1
        const azCompany = await Company.find().sort({[query.atribute]:orderCategory})
        response.status(200).send({success:true,message:'Companies by category',Companies:azCompany})
    } catch (error) {
        response.status(500).send({success:false,message:'Intenal server error'})
    }
}

