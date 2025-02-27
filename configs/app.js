import express from "express"
import cors from 'cors'
import helmet from "helmet"
import morgan from "morgan"

import routesAdmin from '../src/admin/admin.routes.js'
import routesAuth from '../src/auth/auth.routes.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use(routesAdmin)
    app.use(routesAuth)
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