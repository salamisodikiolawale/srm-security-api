import { check } from 'express-validator';


export const authValidator = [

    check('email')
        .notEmpty()
        .withMessage('Veuillez saisir votre nom'),
    check('password')
        .notEmpty()
        .withMessage('Veuillez saisir votre password')
];
