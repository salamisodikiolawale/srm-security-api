import jsonwebtoken from 'jsonwebtoken';
import express from "express";
import Logger from '../loggers/Logger';
import { HttpStatusCode } from '../enums/HttpStatusCode';
import dotenv  from 'dotenv';
import APIError from '../errors/APIError';
import userService from '../services/user.service';
import { User } from '../models/User.model';
import { RequestCustom } from '../models/RequestCustom';
dotenv.config( {path : './.env'});

export const isLoggedInAsCenterMiddleware = (request:express.Request & RequestCustom, response:express.Response, next:express.NextFunction) => {

    
    const token:string|undefined = request.headers.authorization;

    if( !token ){

        Logger.error(`Pas de token !`);
        return response.status(HttpStatusCode.UNAUTHORISED).json({
            
            error: ` Vous n'êtes pas autorisez à accéder à cette resource !`
        });
    }

    const RSA_KEY_PRIVATE:string|undefined = process.env.RSA_KEY_PRIVATE;

    if( !RSA_KEY_PRIVATE ){
            
        throw new APIError(
            'INTERNAL SERVER',
            HttpStatusCode.INTERNAL_SERVER,
            `La key public n'existe pas`,
            true
        );
    }

    jsonwebtoken.verify(token, RSA_KEY_PRIVATE.replace('/\\n/g', '\n'), (error, decoded) => {

        if(error) {
            
            Logger.error("Token invalid")
            return response.status(HttpStatusCode.UNAUTHORISED).json({
                
                error: 'Token invalid'
            });
        }

        const sub:any= decoded?.sub;

        try {
            
            userService.getUserById(sub).then( (user:User|null) => {
                
                if(user){

                    if( user.roles && user.roles.includes('CENTER')){

                        request.user = user;
                        
                        next();
                    } else {

                        //3-Sinon response status 401 unauthorised
                        Logger.error("Le user n existe pas");
                        return response.status(HttpStatusCode.UNAUTHORISED).json({
    
                            error: 'Vous n\'etes pas autorisé'
                        });
                    }


                } else {

                    Logger.error("Le user n existe pas");
                    response.status(HttpStatusCode.UNAUTHORISED).json({

                        error: 'Vous n\'etes pas autorisé'
                    });
                }

            })
        } catch (error) {
            
            Logger.error("Une erreur rencontré lors de la récuperation du user");
            return response.status(HttpStatusCode.UNAUTHORISED).json({
                'error':error
            });
        }
    });

}   