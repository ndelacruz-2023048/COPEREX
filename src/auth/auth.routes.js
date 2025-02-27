import { Router } from "express";
import { register } from "./auth.controller.js";
import { registerAdmin } from "../../middelwares/validators.js";

const apiAuth = Router()

apiAuth.post('/register',registerAdmin,register)

export default apiAuth