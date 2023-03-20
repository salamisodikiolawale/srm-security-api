import { check } from 'express-validator';


export const traineeCreateValidator = [

    check('name')
        .notEmpty()
        .withMessage('Veuillez saisir votre nom'),
    check('lastName')
        .notEmpty()
        .withMessage('Veuillez saisir votre prénom(s)'),
    check('email')
        .notEmpty()
        .withMessage('Veuillez saisir votre email'),
    check('password')
        .notEmpty()
        .withMessage('Veuillez saisir votre password'),
    check('trainer')
        .notEmpty()
        .withMessage('Veuillez cocher ou non la case'),
    check('trainee')
        .notEmpty()
        .withMessage('Veuillez cocher ou non la case'),
    check('center')
        .notEmpty()
        .withMessage('Veuillez cocher ou non la case')
];
