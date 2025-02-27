import { Router } from "express";
import { login } from "./auth.controller.js";
import { registerAdmin, validLogin } from "../../middelwares/validators.js";

const apiAuth = Router()

apiAuth.post('/login',validLogin,login)

export default apiAuth