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
/**
 * @openapi
 * /resources/{resourceId}:
 *   get:
 *     summary: Retrieve a list of resource with optional filtering
 *     tags: [Resources]
 *     parameters:
 *       - name: resourceId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Id of the resource to retrieve
 *     responses:
 *       '200':
 *         description: Successfully retrieved resource
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               id: number
 *               title: string
 *               description: string
 */
resourceRouter.get("/resources/:id", validateRequest(postSchemas.getById), validateRequest(postSchemas.getById), getResourceById);
/**
 * @openapi
 * /resources:
 *   post:
 *     summary: Create a new user account
 *     tags: [Resources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - type
 *               - url
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: "Jest Testing Tutorial"
 *               type:
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: "tutorial"
 *               url:
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: "https://example.com/jest-tutorial"
 *               description:
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: "Complete guide to testing with Jest"
 *     responses:
 *       '201':
 *         description: Resource created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Error'
 *       '409':
 *         description: Resource with this email already exists
 */
resourceRouter.post("/resources", authenticate, isAuthorized({ hasRole: ["admin"], allowSameUser: true}),validateRequest(postSchemas.create), createResource);
resourceRouter.put("/resources/:id", authenticate, isAuthorized({ hasRole: ["admin"], allowSameUser: true}),validateRequest(postSchemas.update), updateResourceByIdAsync);
resourceRouter.delete("/resources/:id", authenticate, isAuthorized({ hasRole: ["admin"], allowSameUser: true}),validateRequest(postSchemas.delete), deleteResourceByIdAsync);

export default resourceRouter;

