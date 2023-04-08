import { UserDTO } from "../dto/User.dto";
import { User } from "../models/User.model";

export const userTransformer = (userDto: UserDTO) => {

    const userModel:User = {
        
        email: userDto.email,
        password: userDto.password,
        roles: userDto.roles
    }

    
    return userModel;
}