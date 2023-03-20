import { TraineeDTO } from "../dto/Trainee.dto";
import { Trainee } from "../models/Trainee.model";

export const traineeTransformer = (traineeDto: TraineeDTO) => {

    const traineeModel:Trainee = {

        name: traineeDto.name,
        lastName: traineeDto.name,
        address: traineeDto.address,
        trainee: traineeDto.trainee,
        trainer: traineeDto.trainer,
        center:  traineeDto.center,
    }

    return traineeModel;
}