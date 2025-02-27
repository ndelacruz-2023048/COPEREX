import { Router } from "express";
import { getUsers } from "./admin.controller.js";

const apiAdmin = Router()

apiAdmin.get('/',getUsers)

export default apiAdmin