export const getUsers = (request,response)=>{
    try {
        response.status(200).send({sucsess:true,message:'Well users'})
    } catch (error) {
        response.status(500).send({success:false,message:'General server error'})
    }
}