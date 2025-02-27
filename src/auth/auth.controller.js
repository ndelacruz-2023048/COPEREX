export const register = (request,response)=>{
    try {
        response.status(200).send({success:true,message:'Register succesfull!!!',func})
    } catch (error) {
        response.status(500).send({success:false,message:'General server error'})
    }
}