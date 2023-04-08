import { check } from 'express-validator';

export const jobValidator = [

    check('centerId')
        .notEmpty()
        .withMessage('Veuillez saisir l\'identifiant du centre'),
    check('title')
        .notEmpty()
        .withMessage('Veuillez saisir le titre de l\'offre'),
    check('salary')
        .notEmpty()
        .withMessage('Veuillez saisir le salaire de l\'offre'),
    check('startingDate')
        .notEmpty()
        .withMessage('Veuillez saisir la date de prise de service'),
    check('contractType')
        .notEmpty()
        .withMessage('Veuillez saisir le type de contrat de l\'offre'),
    check('description')
        .notEmpty()
        .withMessage('Veuillez saisir la description de l\'offre'),
    check('benefits')
        .notEmpty()
        .withMessage('Veuillez saisir le benefits de l\'offre'),
    check('workingHours')
        .notEmpty()
        .withMessage('Veuillez saisir le nombre d\heure de travail de l\'offre'),
    check('requireProfile')
        .notEmpty()
        .withMessage('Veuillez saisir le profile requis pour l\'offre'),
    // check('image')
    //     .notEmpty()
    //     .withMessage('Veuillez saisir le profile requis pour l\'offre'),
];