import bcrypt from 'bcrypt';
import { HttpStatusCode } from '../enums/HttpStatusCode';
import APIError from '../errors/APIError';
import jsonwebtoken from 'jsonwebtoken';
import dotenv  from 'dotenv';
import { User } from '../models/User.model';
dotenv.config( {path : './.env'});

class AuthService {

    
    
    private RSA_KEY_PRIVATE:string|undefined = process.env.RSA_KEY_PRIVATE;
    
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

    getToken(user:User, credentials: any): string {

        if( !this.RSA_KEY_PRIVATE ){
            
            throw new APIError(
                'INTERNAL SERVER',
                HttpStatusCode.INTERNAL_SERVER,
                `La key private n'existe pas`,
                true
            );
        } else {
            
            return jsonwebtoken.sign(
                {
                    userId: user._id, 
                    roles: user.roles, 
                    email: user.email,
                    credentials
                }, 
                this.RSA_KEY_PRIVATE.replace('/\\n/g', '\n'), {
                subject: user._id?.toString(),
                expiresIn: '24h'
            });
        }
    }
    
}

export default new AuthService();