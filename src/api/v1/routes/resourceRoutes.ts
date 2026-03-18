import express, { Router } from "express";
import { healthData, 
        createResource, 
        getResourceById, 
        getAllResource, 
        updateResourceByIdAsync, 
        deleteResourceByIdAsync } from "../controllers/resourceController";
import { validateRequest } from "../middleware/validateRequest";
import { postSchemas } from "../validation/resourceValidation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const resourceRouter: Router = express.Router();

resourceRouter.get("/health", healthData);
resourceRouter.get("/resources", authenticate, isAuthorized({ hasRole: ["admin"], allowSameUser: true}), getAllResource);
resourceRouter.get("/resources/:id", authenticate, isAuthorized({ hasRole: ["admin"], allowSameUser: true}), validateRequest(postSchemas.getById), getResourceById);
resourceRouter.post("/resources", authenticate, isAuthorized({ hasRole: ["admin"], allowSameUser: true}), validateRequest(postSchemas.create), createResource);
resourceRouter.put("/resources/:id", authenticate, isAuthorized({ hasRole: ["admin"], allowSameUser: true}),validateRequest(postSchemas.update), updateResourceByIdAsync);
resourceRouter.delete("/resources/:id", authenticate, isAuthorized({ hasRole: ["admin"], allowSameUser: true}),validateRequest(postSchemas.delete), deleteResourceByIdAsync);

export default resourceRouter;