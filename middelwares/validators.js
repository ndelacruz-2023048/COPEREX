import { body, query } from "express-validator";
import { validateErrors } from "./validate.errors.js";
import Company from "../src/company/company.model.js";

export const registerAdmin = [
    body('name','Name is required').notEmpty(),
    body('lastname','Lastname is required').notEmpty(),
    body('username','Username is required').notEmpty(),
    body('email','Email is required').notEmpty().isEmail(),
    body('password','Password is required').notEmpty().isStrongPassword(),
    body('department','Department is required').notEmpty(),
    validateErrors
]

export const validLogin = [
    body('userLogin','UserLogin is required').notEmpty(),
    body('password','Password is required').notEmpty(),
    validateErrors
]

export const registerCompany = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),

    body('direction')
        .notEmpty().withMessage('Direction is required')
        .isString().withMessage('Direction must be a string'),

    body('companySize')
        .notEmpty().withMessage('Company Size is required')
        .isString().withMessage('Company Size must be a string'),

    body('webSite')
        .optional()
        .isURL().withMessage('Website must be a valid URL'),

    body('impactLevel')
        .notEmpty().withMessage('Impact level is required')
        .isString().withMessage('Impact level must be a string'),

    body('yearsOfTrajectory')
        .trim()
        .notEmpty().withMessage('Years of trajectory is required')
        .isNumeric().withMessage('Years of trajectory must be a valid number'),

    body('businessCategory')
        .notEmpty().withMessage('Business category is required')
        .isString().withMessage('Business category must be a string'),
    validateErrors
]

export const validateOrderAlphabetic = [
    query('filter').isString().withMessage('Filter must be a string').isIn(['a-z','z-a']).withMessage('Filter must be a-z or z-a'),
    query('atribute').isString().withMessage('Must be a string').isIn(['name','webSite','impactLevel','companySize']).withMessage('Required for order alphetic by one atribute must be: name, webSite,companySize or impactLevel'),
    validateErrors,
]

export const validateYearsTrajectory = [
    query('order').optional().isString().withMessage('Filter must be a string')
        .isIn(['asc','desc']).withMessage('Filter to order must be asc or desc'),
    query('greaterThan').optional().isNumeric().withMessage('Filter must be number'),
    query('lessThan').optional().isNumeric().withMessage('Filter must be number'),
    validateErrors
]


export const validateCategoryFilter = [
    query('category').optional().isString().withMessage('Filter must be a string'),
    validateErrors
]

export const validateUpdateCompany = [
    body('name').optional().notEmpty().withMessage('Name cannot be empty').isString().withMessage('Name must be a string'),
    body('direction').optional().notEmpty().withMessage('Direction cannot be empty').isString().withMessage('Direction must be a string'),
    body('companySize').optional().notEmpty().withMessage('Company size cannot be empty').isString().withMessage('Company Size must be a string'),
    body('webSite').optional().notEmpty().withMessage('Website cannot be empty').isURL().withMessage('Website must be a valid URL'),
    body('impactLevel').optional().notEmpty().withMessage('Impact level cannot be empty').isString().withMessage('Impact level must be a string'),
    body('yearsOfTrajectory').optional().notEmpty().withMessage('Year of trajectory cannot be empty').isNumeric().withMessage('Years of trajectory must be a valid number'),
    body('businessCategory').optional().notEmpty().withMessage('Bussiness Category cannot be empty').isString().withMessage('Business category must be a string'),
    validateErrors
]