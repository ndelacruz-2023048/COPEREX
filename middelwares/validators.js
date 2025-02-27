import { body } from "express-validator";
import { validateErrors } from "./validate.errors.js";

export const registerAdmin = [
    body('name','Name is required').isEmpty(),
    body('lastname','Lastname is required').isEmpty(),
    body('username','Username is required').isEmpty(),
    body('email','Email is required').isEmpty().isEmail(),
    body('password','Password is required').isEmpty().isStrongPassword(),
    body('department','Department is required').isEmpty(),
    validateErrors
]