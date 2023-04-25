//----Modules natifs
import express from "express";
import { validationResult } from 'express-validator';
import { HttpStatusCode } from "../enums/HttpStatusCode";
import APIError from "../errors/APIError";
import Logger from "../loggers/Logger";

//----Models
import { User } from "../models/User.model";

//----Services
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { RequestCustom } from "../models/RequestCustom";
import { CenterDTO } from "../dto/Center.dto";
import { UserDTO } from "../dto/User.dto";
import { TraineeDTO } from "../dto/Trainee.dto";
import { TrainerDTO } from "../dto/Trainer.dto";
import { Center } from "../models/Center.model";
import { GlobalUser } from "../models/Global.model";


export const signinUser = async (request:express.Request, response:express.Response) => {
    
    //Data request validation
    const errors = validationResult(request);
    if( !errors.isEmpty() ) {

        return response.status(HttpStatusCode.NOT_FOUND).json(errors);
    } 

    const userBody:User = request.body;

    UserService.getUser(userBody).then( async (user:User|null) => {

        if( user === null ) {
            
            Logger.error(`L'utilisateur n'existe pas`);

            return response.status(HttpStatusCode.UNAUTHORISED).json({

                errors: `Votre email est incorrect`
            })
        }

        
        if( !AuthService.isSamePassword(userBody.password, user.password) ) {
            
            Logger.error(`Mot de passe incorrect`);

            return response.status(HttpStatusCode.UNAUTHORISED).json({

                errors: `Votre mot de passe est incorrect`
            })
        } 

        const credentialCurrentUser:any = await UserService.getCurrentUserCredentials(user);


        const token:string = AuthService.getToken(user, credentialCurrentUser);
        Logger.info(`L'authentification à été un success`);
        return response.status(HttpStatusCode.OK).json(token);

    }).catch( (errors:any) => {

        return response.status(HttpStatusCode.UNAUTHORISED).json({

            msg: 'Authentification échouée'
        });
    });
    
}



    


export const signupTrainee = async (request:express.Request, response:express.Response) => {
    
    //Data request validation
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        
        return response.status(HttpStatusCode.NOT_FOUND).json(errors);
    }
    
    const traineeDto:TraineeDTO = request.body;
    traineeDto.password = AuthService.gethashCode(traineeDto.password);
    try {
        
        await UserService.createTrainee(traineeDto);
        return response.status(HttpStatusCode.CREATED).json('user created successfully');

    } catch (error) {
        
        Logger.error(error);
        
        return response.status(HttpStatusCode.INTERNAL_SERVER).json(error);
    }

}

export const signupTrainer = async (request:express.Request, response:express.Response) => {
    
    //Data request validation
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        
        return response.status(HttpStatusCode.NOT_FOUND).json(errors);
    }
    
    const trainerDto:TrainerDTO = request.body;
    trainerDto.password = AuthService.gethashCode(trainerDto.password);
    try {
        
        await UserService.createTrainer(trainerDto);
        return response.status(HttpStatusCode.CREATED).json('user created successfully');

    } catch (error) {
        
        Logger.error(error);
        
        return response.status(HttpStatusCode.INTERNAL_SERVER).json(error);
    }

}

export const signupCenter = async (request:express.Request, response:express.Response) => {
    
    //Data request validation
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        
        return response.status(HttpStatusCode.NOT_FOUND).json(errors);
    }
    
    const centerDto:CenterDTO = request.body;
    centerDto.password = AuthService.gethashCode(centerDto.password);
    try {
        
        await UserService.createCenter(centerDto);
        return response.status(HttpStatusCode.CREATED).json('user created successfully');

    } catch (error) {
        
        Logger.error(error);
        
        return response.status(HttpStatusCode.INTERNAL_SERVER).json(error);
         
    }

}

export const getCurrentUser = async(request:express.Request & RequestCustom, response:express.Response) => {

    if( !request.user ) {
            
        Logger.error(`L'utilisateur n'existe pas`);

        return response.status(HttpStatusCode.UNAUTHORISED).json({

            errors: `L'utilisateur n'existe pas`
        })
    }
    let currentUser:User = request.user; 
    currentUser
    const currentUserDatas = await UserService.getCurrentUserCredentials(currentUser);
    const user = {
        email:currentUser?.email,
        currentUserDatas
    };
    
    return response.status(HttpStatusCode.OK).json(user);
}
    