import { isValidObjectId } from 'mongoose'
import Company from './company.model.js'
import { generateReport } from '../reports/generateReport.js'

export const newCompany = async (request, response) => {
    try {
        const data = request.body
        const isDuplicatedNameCompany = await Company.findOne({ name: data.name })
        if (isDuplicatedNameCompany) {
            return response.status(400).send({ success: false, message: "Company exists yet!!!" })
        }

        const company = new Company(data)
        company.save()
        response.status(400).send({ success: true, message: 'Saved new company succesfully', company })
    } catch (error) {
        response.status(500).send({ success: false, message: "Internal server error" })
    }
}

export const getCompanies = async (request, response) => {
    try {

        const companies = await Company.find()

        response.status(200).send({ success: true, message: 'Companies', companies })
    } catch (error) {
        response.status(500).send({ success: false, message: 'Intenal server error' })
    }
}

export const getCompaniesFilterAlphabetic = async (request, response) => {
    try {
        const query = request.query
        const orderCategory = query.filter === 'a-z' ? 1 : -1
        const azCompany = await Company.find().sort({ [query.atribute]: orderCategory })
        response.status(200).send({ success: true, message: 'Companies by category', Companies: azCompany })
    } catch (error) {
        response.status(500).send({ success: false, message: 'Intenal server error' })
    }
}
const queryOrder = async (query, response) => {
    const getSortOrder = query.order === 'asc' ? 1 : -1
    const orderByYearsTrajectory = await Company.find().sort({ yearsOfTrajectory: getSortOrder })
    response.status(200).send({ success: true, message: 'Companies by years trajectory', orderByYearsTrajectory })
    return true
}

const greaterThan = async (query, response) => {
    const numGreaterThan = Number(query.greaterThan)
    const resultFilterGreatherThan = await Company.find({ yearsOfTrajectory: { $gte: numGreaterThan } })
    response.status(200).send({ success: true, message: `Companies order by year trajectory and greather than ${query.greaterThan}`, filter: resultFilterGreatherThan })
    return true
}

const lessThan = async (query, response) => {
    const numLessThan = Number(query.lessThan)
    const resultFilterLessThan = await Company.find({ yearsOfTrajectory: { $lte: numLessThan } })
    response.status(200).send({ success: true, message: `Companies order by year trajectory and less than ${query.lessThan}`, filter: resultFilterLessThan })
    return true
}

const orderAndGreaterThan = async (query, response) => {
    const getSortOrder = query.order === 'asc' ? 1 : -1
    const numGreaterThan = Number(query.greaterThan)
    const resultFilterYearsTrajecAndGreather = await Company.find({ yearsOfTrajectory: { $gte: numGreaterThan } }).sort({ yearsOfTrajectory: getSortOrder })
    response.status(200).send({ success: true, message: `Companies order by year trajectory and greather than ${query.greaterThan}`, filter: resultFilterYearsTrajecAndGreather })
    return true
}

const orderAndLessThan = async (query, response) => {
    const getSortOrder = query.order === 'asc' ? 1 : -1
    const numLessThan = Number(query.lessThan)
    const resultFilterYearsTrajecAndLess = await Company.find({ yearsOfTrajectory: { $lte: numLessThan } }).sort({ yearsOfTrajectory: getSortOrder })
    response.status(200).send({ success: true, message: `Companies order by year trajectory and less than ${query.lessThan}`, filter: resultFilterYearsTrajecAndLess })
    return true
}

const orderGreaterThanAndLessThan = async(query,response)=>{
    const getSortOrder = query.order === 'asc' ? 1 : -1
    const numLessThan = Number(query.lessThan)
    const numGreaterThan = Number(query.greaterThan)
    const resultFilterYearsTrajecGreaterAndLess = await Company.find({ yearsOfTrajectory: {$gte:numGreaterThan, $lte: numLessThan } }).sort({ yearsOfTrajectory: getSortOrder })
    response.status(200).send({ success: true, message: `Companies order by year trajectory greater than ${query.greaterThan} and less than ${query.lessThan}`, filter: resultFilterYearsTrajecGreaterAndLess })
    return true
}

const greaterThanAndLessThan = async (query,response)=>{
    const numLessThan = Number(query.lessThan)
    const numGreaterThan = Number(query.greaterThan)
    const resultFilterGreaterAndLess = await Company.find({ yearsOfTrajectory: {$gte:numGreaterThan, $lte: numLessThan } })
    response.status(200).send({ success: true, message: `Companies filter by greater than ${query.greaterThan} and less than ${query.lessThan}`, filter: resultFilterGreaterAndLess })
    return true
}

export const getCompaniesYearsTrajectory = async (request, response) => {
    try {
        const query = request.query
        if (Object.keys(query).length === 0) {
            const resultWithoutFilters = await Company.find()
            response.status(200).send({ success: true, message: 'Companies by years trajectory',filter:resultWithoutFilters})
        }

        if(query.order && query.greaterThan && query.lessThan){
            if(await orderGreaterThanAndLessThan(query,response)) return 
        }

        if(query.order && query.greaterThan) {
            if (await orderAndGreaterThan(query, response)) return
        }

        if(query.order && query.lessThan){
            if(await orderAndLessThan(query,response)) return
        }

        if(query.greaterThan && query.lessThan){
            if(await greaterThanAndLessThan(query,response)) return
        }
        
        if (query.greaterThan) {
            if (await greaterThan(query, response)) return
        }
        
        if (query.lessThan) {
            if (await lessThan(query, response)) return
        }
        
        if (query.order) {
            if (await queryOrder(query, response)) return
        }
    } catch (error) {
        response.status(500).send({ success: false, message: "Internal server error" })
    }
}


export const getCompaniesByCategory =async (request,response)=>{
    try {
        const {category} = request.query
        const filterByCategory =await Company.find({businessCategory:category})
        response.status(200).send({success:false,message:"Categories",Filter:filterByCategory})
    } catch (error) {
        response.status(500).send({success:true,message:'Internal server error'})
    }
}

export const updateCompany = async (request,response)=>{
    try {
        const data = request.body
        const {idCompany} = request.params

        if(!isValidObjectId(idCompany)){
            return response.status(400).send({success:false,message:'Invalid company Id'})
        }

        if(Object.keys(data).length===0){
            return response.status(400).send({success:false,message:'Nothing to update'})
        }
        
        const isValidIdCompany = await Company.findOne({_id:idCompany})
        if(!isValidIdCompany){
            return response.status(404).send({success:false,message:'Company Id not found'})
        }

        const updatedCompany = await Company.findByIdAndUpdate(idCompany,data,{new:true})

        response.status(200).send({success:true,message:'Company updated succesfully',updatedCompany})
    } catch (error) {
        response.status(500).send({success:false,message:'Internal server error'})
    }
}

export const generateExcel =async (request,response)=>{
    try {
         const data =await Company.find()
         generateReport(data)
        response.status(200).send({success:true,message:'Excel generated succesfully',data})
    } catch (error) {
        response.status(500).send({success:false,message:'Internal server error'})
    }
}
