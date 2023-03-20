import bcrypt from 'bcrypt';
import { HttpStatusCode } from '../enums/HttpStatusCode';
import APIError from '../errors/APIError';
import jsonwebtoken from 'jsonwebtoken';
import fs from 'fs';
import dotenv  from 'dotenv';
import Logger from '../loggers/Logger';
dotenv.config( {path : './.env'});

class AuthService {

    
    
    private RSA_KEY_PRIVATE:string|undefined = process.env.RSA_KEY_PRIVATE;
    private RSA_KEY_PUBLIC:string|undefined = process.env.RSA_KEY_PUBLIC;
    
    constructor(){}

    
    gethashCode(value:any):string {
        try {
            
            return bcrypt.hashSync(value, bcrypt.genSaltSync(8));
            
        } catch (error) {
            
            throw new APIError(
                'INTERNAL SERVER',
                HttpStatusCode.INTERNAL_SERVER,
                `Erreur lors du cryptage du mot de passe`,
                true
         );
        }
    }

    isSamePassword(passwordBody: string, userPassword:string): boolean {
    
        try {
            
            return bcrypt.compareSync(passwordBody, userPassword);
        } catch (error) {
            
            throw new APIError(
                'INTERNAL SERVER',
                HttpStatusCode.INTERNAL_SERVER,
                `Erreur de la comparaison des mots de passe`,
                true
            );
        }
    }

    getToken(userId:string|undefined): string {

        if( !this.RSA_KEY_PRIVATE ){
            
            throw new APIError(
                'INTERNAL SERVER',
                HttpStatusCode.INTERNAL_SERVER,
                `La key private n'existe pas`,
                true
            );
        } else {
            
            return jsonwebtoken.sign({userId: userId}, this.RSA_KEY_PRIVATE.replace('/\\n/g', '\n'), {
                subject: userId?.toString(),
                expiresIn: '24h'
            });
        }
    }

    // getDecodedToken(token: string) {
        
    //     if( !this.RSA_KEY_PUBLIC ){
            
    //         throw new APIError(
    //             'INTERNAL SERVER',
    //             HttpStatusCode.INTERNAL_SERVER,
    //             `La key public n'existe pas`,
    //             true
    //         );
    //     }

    //     return jsonwebtoken.verify(token, this.RSA_KEY_PUBLIC.replace('/\\n/g', '\n'), (error, decoded) => {

    //         return decoded;
    //     });
    // }

    // isValidToken(token:  string): boolean {
        
    //     if( !this.RSA_KEY_PUBLIC ){
            
    //         throw new APIError(
    //             'INTERNAL SERVER',
    //             HttpStatusCode.INTERNAL_SERVER,
    //             `La key public n'existe pas`,
    //             true
    //         );
    //     } else {

    //     jsonwebtoken.verify(token, this.RSA_KEY_PUBLIC.replace('/\\n/g', '\n'), (error, decoded) => {

    //         if(error) {
    //             return false;
    //         }
    //         Logger.info("Valid token")
    //         return true;
    //        });
    //     }

    //     return false;
    // }
    
}

export default new AuthService();