import { Router } from "express";
import { getCompanies, getCompaniesByCategory, getCompaniesFilterAlphabetic, getCompaniesYearsTrajectory, newCompany, updateCompany } from "./company.controller.js";
import { registerCompany, validateCategoryFilter, validateOrderAlphabetic, validateUpdateCompany, validateYearsTrajectory } from "../../middelwares/validators.js";
import { validateJwt } from "../../middelwares/validate.jwt.js";
import { validateCategoryParam } from "../../utils/validators.db.js";

const apiCompany = Router()

apiCompany.get('/company_all',validateJwt,getCompanies)
apiCompany.get('/company_order_alphabetic',validateJwt,validateOrderAlphabetic, getCompaniesFilterAlphabetic)
apiCompany.get('/company_years_trajectory',validateJwt, validateYearsTrajectory,getCompaniesYearsTrajectory)
apiCompany.get('/company_category',validateJwt, validateCategoryFilter,validateCategoryParam,getCompaniesByCategory)
apiCompany.post('/company_save',validateJwt,registerCompany, newCompany)
apiCompany.put('/company_update/:idCompany',validateJwt,validateUpdateCompany, updateCompany)

export default apiCompany