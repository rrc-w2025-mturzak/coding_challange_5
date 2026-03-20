import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";
import { createNewResource, getResourceByIdAsync, getAllResources, updateResourceById, deleteResourceById } from "../services/resourceService";
import { ResourceCreateRequest } from "../models/resourceCreateRequestModel";
import { ResourceUpdateRequest } from "../models/resourceUpdateRequestModel";

export const healthData = (req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
};


export const createResource = async (req: Request, res: Response) => {
    const requestResource: ResourceCreateRequest = {
        title: req.body.title,
        type: req.body.type,
        url: req.body.url,
        description: req.body.description
    }
    let result = await createNewResource(requestResource)
    res.status(HTTP_STATUS.CREATED).send(result)
}

export const getResourceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let id = req.params.id as string;
        let results = await getResourceByIdAsync(id)

        res.status(HTTP_STATUS.OK).json(successResponse(results, "Resource retrieved"))
    } catch (error) {
        next(error);
    }
}

export const getAllResource = async (req: Request, res: Response) => {
    try {
        const Resources = await getAllResources() ?? [];
        res.status(HTTP_STATUS.OK).json({ message: "Resource applications retrieved", count: Resources.length, data: Resources });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error"})
    }
}

export const updateResourceByIdAsync = async (req: Request, res: Response) => {
    let id: string = req.params.id as string; 
    const request: ResourceUpdateRequest = {
        title: req.body.title,
        type: req.body.type,
        url: req.body.url,
        description: req.body.description
    };

    await updateResourceById(id, request);
    let results = await getResourceByIdAsync(id)

    res.status(HTTP_STATUS.OK).json(successResponse(results, `Resource application updated`));
}

export const deleteResourceByIdAsync = async (req: Request, res: Response) => {
    let id = req.params.id as string;
    await deleteResourceById(id)

    res.status(HTTP_STATUS.NO_CONTENT).send(`Resource ${id} was deleted`);
}
