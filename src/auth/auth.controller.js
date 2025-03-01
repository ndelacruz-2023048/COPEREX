import { comparePassword, encrypt } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'
import Admin from '../admin/admin.model.js'

export const login = async (request, response) => {
    try {
        const { userLogin, password } = request.body

        const isValidUser = await Admin.findOne({$or:[{username:userLogin},{email:userLogin}]})
        if(!isValidUser){
            return response.status(400).send({success:false,message:'Invalid username or email'})
        }
        const isValidPassword = await comparePassword(isValidUser.password,password)
        if(!isValidPassword){
            return response.status(400).send({success:false,message:'Invalid password'})
        }

        let dataUser = {
            uid:isValidUser._id,
            name:isValidUser.name,
            username:isValidUser.username,
            email:isValidUser.email
        }

        let userToken = generateJwt(dataUser)

        response.status(200).send({ success: true, message: 'Welcome to Coperex',dataUser,token:userToken})
    } catch (error) {
        response.status(500).send({ success: false, message: 'General server error' })
    }
}

export const defaultAdmin = async () => {
    try {
        const user = {
            name: process.env.DEFAULT_NAME,
            lastname: process.env.DEFAULT_LASTNAME,
            username: process.env.DEFAULT_USERNAME,
            email: process.env.DEFAULT_EMAIL,
            password: process.env.DEFAULT_PASSWORD,
            department: process.env.DEFAULT_DEPARTMENT
        }

        let existDefaultAdmin = await Admin.findOne({ username: "useradmindefault", email: "admin@gmail.com" })
        if (!existDefaultAdmin) {
            const admin = new Admin(user)
            admin.password = await encrypt(user.password)
            admin.save()
        }
    } catch (error) {
        console.log('Error trying save a default admin')
    }
}