import { Router } from "express";
import { getCompanies, getCompaniesFilterAlphabetic, newCompany } from "./company.controller.js";
import { registerCompany, validateCategoryFilter } from "../../middelwares/validators.js";
import { validateJwt } from "../../middelwares/validate.jwt.js";

const apiCompany = Router()

apiCompany.get('/company_all',validateJwt,getCompanies)
apiCompany.get('/company_categories',validateJwt,validateCategoryFilter, getCompaniesFilterAlphabetic)
apiCompany.post('/company_save',validateJwt,registerCompany, newCompany)

export default apiCompany