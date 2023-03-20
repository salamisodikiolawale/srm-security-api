import { CenterDTO } from "../dto/Center.dto";
import { Center } from "../models/Center.model";

export const centerTransformer = (centerDto: CenterDTO) => {

    const centerModel:Center = {

        name: centerDto.name,
        website: centerDto.website,
        description: centerDto.description,
        createdDate: centerDto.createdDate,
        address: centerDto.address,
        trainee: centerDto.trainee,
        trainer: centerDto.trainer,
        center: centerDto.center,
    }

    return centerModel;
}