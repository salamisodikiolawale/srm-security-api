import { TrainerDTO } from "../dto/Trainer.dto";
import { Trainer } from "../models/Trainer.model";

export const trainerTransformer = (trainerDto: TrainerDTO) => {

    const trainerModel:Trainer = {

        name: trainerDto.name,
        lastName: trainerDto.name,
        address: trainerDto.address,
        experience: trainerDto.experience,
        trainee: trainerDto.trainee,
        trainer: trainerDto.trainer,
        center:  trainerDto.center,
    }

    return trainerModel;
}