import express from "express"
import cors from 'cors'
import helmet from "helmet"
import morgan from "morgan"

import routesAdmin from '../src/admin/admin.routes.js'
import routesAuth from '../src/auth/auth.routes.js'
import routesCompany from '../src/company/company.routes.js'
import { defaultAdmin } from "../src/auth/auth.controller.js"
import { limiter } from "../middelwares/rate.limit.js"

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)
}

const routes = (app)=>{
    app.use('/v1/admin',routesAdmin)
    app.use('/v1/admin',routesAuth)
    app.use('/v1/admin',routesCompany)
}

export const initServer = ()=>{
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    } catch (error) {
        console.log('Server init failed',error);
    }
}