import { Router } from "express";
import { newCompany } from "./company.controller.js";
import { registerCompany } from "../../middelwares/validators.js";

const apiCompany = Router()

apiCompany.post('/company_save',registerCompany, newCompany)

export default apiCompany