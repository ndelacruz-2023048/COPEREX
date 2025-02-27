import { body } from "express-validator";
import { validateErrors } from "./validate.errors.js";

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