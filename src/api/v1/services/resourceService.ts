import { addResource, getResourceById, getResources, updateResources, deleteResource } from "../repositories/firestoreRepository";
import { ResourceReponse } from "../models/resourceResponse";
import { ResourceCreateRequest } from "../models/resourceCreateRequestModel";
import { ResourceUpdateRequest } from "../models/resourceUpdateRequestModel";
import { ResourceDTO } from "../models/resourceDTO";
import { ResourceNotFoundError } from "../errors/errors";

export const createNewResource =  async (item: ResourceCreateRequest): Promise<string> => {
    return await addResource(item); 
}

export const getResourceByIdAsync = async (id: string): Promise<ResourceReponse> => {
    const entity = await getResourceById(id);

    if (!entity) {
        throw new ResourceNotFoundError(`Resource application not found`);
    }

    return {
        id: entity.id,
        title: entity.title,
        description: entity.description
    };
}

export const getAllResources = async (): Promise<Array<ResourceDTO> | undefined> => {
    return await getResources();
}

export const updateResourceById = async (id: string, item: ResourceUpdateRequest): Promise<void> => {
    await updateResources(id, item);
    return;
}

export const deleteResourceById = async (id: string): Promise<void> => {
    await deleteResource(id)
}