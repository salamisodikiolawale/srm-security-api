//----Data transfert object
import { CenterDTO } from '../dto/Center.dto';
import { TraineeDTO } from '../dto/Trainee.dto';

//----Models
import { Center } from '../models/Center.model';
import { User } from '../models/User.model';
import { Trainee } from '../models/Trainee.model';

//----Database schema
import UserTable from '../schemaDB/User.schema';
import CenterTable from '../schemaDB/Center.schema';
import TraineeTable from '../schemaDB/Trainee.schema';

//----transformers
import { centerTransformer } from '../transformers/center.transormer';
import { traineeTransformer } from '../transformers/trainee.transormer';
import { TrainerDTO } from '../dto/Trainer.dto';
import { Trainer } from '../models/Trainer.model';
import { trainerTransformer } from '../transformers/trainer.transormer';
import TrainerTable from '../schemaDB/Trainer.schema';

class UserService {
   
    
    constructor(){}


    async createUser(user: User) {

        const newUser = new UserTable<User>({
            email: user.email,
            password: user.password,
        });
            
        return await newUser.save();
    }

    async createCenter(centerDto: CenterDTO) {

        const center:Center = centerTransformer(centerDto);
        const user:User = {
            email: centerDto.email,
            password: centerDto.password
        };

        
        const userCreated = await this.createUser(user);

        const newCenter = new CenterTable<Center>({

            userId: userCreated._id,
            name: center.name,
            description:center.description,
            createdDate:center.createdDate,
            website:center.website,
            address:center.address,
            trainer: center.trainer,
            trainee: center.trainee,
            center:  center.center,
        });

        await newCenter.save();
    }


    async createTrainee(traineeDto: TraineeDTO) {

        const trainee:Trainee = traineeTransformer(traineeDto);
        const user:User = {

            email: traineeDto.email,
            password: traineeDto.password
        };
              

        
        const userCreated = await this.createUser(user);

        const newtrainee = new TraineeTable<Trainee>({

            userId: userCreated._id,
            name: trainee.name,
            lastName: trainee.name,
            address: trainee.address,
            trainer: trainee.trainer,
            trainee: trainee.trainee,
            center:  trainee.center,
        });

        await newtrainee.save();
    }


    async createTrainer(trainerDto: TrainerDTO) {

        const trainer:Trainer = trainerTransformer(trainerDto);
        const user:User = {

            email: trainerDto.email,
            password: trainerDto.password
        };
              

        
        const userCreated = await this.createUser(user);

        const newtrainer = new TrainerTable<Trainer>({

            userId: userCreated._id,
            name: trainer.name,
            lastName: trainer.name,
            address: trainer.address,
            experience: trainer.experience,
            trainer: trainer.trainer,
            trainee: trainer.trainee,
            center:  trainer.center,
        });

        await newtrainer.save();
    }

    async getUser(authUser: User): Promise<User|null> {
        
        const user:User|null = await UserTable.findOne({ 'email': authUser.email}).exec();
        
        return user;
    }

    async getUserById(id: string|undefined) : Promise<User|null> {
        
        if( !id ){
            return null;
        }
        const user:User|null = await UserTable.findOne({ '_id': id}).exec();
        return user;
    }
}

export default new UserService();