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

