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
import { GlobalUser } from '../models/Global.model';

class UserService {
   
    
    constructor(){}


    async createUser(user: User) {

        const newUser = new UserTable<User>(user);
            
        return await newUser.save();
    }

    async createCenter(centerDto: CenterDTO) {

        const center:Center = centerTransformer(centerDto);
        const user:User = {
            email: centerDto.email,
            password: centerDto.password,
            roles: ['CENTER']
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
            password: traineeDto.password,
            roles: ['TRAINEE']
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
            password: trainerDto.password,
            roles: ['TRAINER']
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

    async getCenter(userId:string|undefined): Promise<Center|null> {

        if( !userId ) {
            return null;
        }

        const center:Center|null = await CenterTable.findOne({ 'userId': userId}).exec();
        
        return center;

    }

    async getCurrentUserCredentials(user:User): Promise<GlobalUser|null> {

        if(user && user.roles && user.roles.includes('CENTER')){

            return await CenterTable.findOne({ 'userId': user._id}).exec();
        }

        if(user && user.roles && user.roles.includes('TRAINER')){

            return await TrainerTable.findOne({ 'userId': user._id}).exec();
        }   

        if(user && user.roles && user.roles.includes('TRAINEE')){
            
            return await TraineeTable.findOne({ 'userId': user._id}).exec();
        }

        return null;
    }

    async getTrainer(userId:string|undefined): Promise<Trainer|null> {

        if( !userId ) {
            return null;
        }

        const trainer:Trainer|null = await TrainerTable.findOne({ 'userId': userId}).exec();
        
        return trainer;

    }

    async getTrainee(userId:string|undefined): Promise<Trainee|null> {

        if( !userId ) {
            return null;
        }

        const trainee:Trainee|null = await TraineeTable.findOne({ 'userId': userId}).exec();
        
        return trainee;

    }


}

export default new UserService();