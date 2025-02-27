import { Router } from "express";
import { getCompanies, newCompany } from "./company.controller.js";
import { registerCompany } from "../../middelwares/validators.js";
import { validateJwt } from "../../middelwares/validate.jwt.js";

const apiCompany = Router()

apiCompany.get('/company_all',validateJwt,getCompanies)
apiCompany.post('/company_save',validateJwt,registerCompany, newCompany)

export default apiCompany