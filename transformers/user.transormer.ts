import { UserDTO } from "../dto/User.dto";
import { User } from "../models/User.model";

export const userTransformer = (userDto: UserDTO) => {

    const userModel = new User();
          userModel.email=userDto.email;
          userModel.password=userDto.password;

    
    return userModel;
}