import { check } from 'express-validator';


export const centerCreateValidator = [

    check('name')
        .notEmpty()
        .withMessage('Veuillez saisir votre nom'),
    check('description')
        .notEmpty()
        .withMessage('Veuillez une description'),
    check('createdDate')
        .notEmpty()
        .withMessage('Veuillez saisir la date de création'),
    check('website')
        .notEmpty()
        .withMessage('Veuillez saisir lien du site'),
    check('address')
        .notEmpty()
        .withMessage('Veuillez saisir votre address'),
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
