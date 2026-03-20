/**
 * @openapi
 * components:
 *   schemas:
 *     Resource:
 *       type: object
 *       required:
 *         - title
 *         - type
 *         - url
 *         - description
 *         - createdAt
 *       properties:
 *         id:
 *           type: number
 *           description: Unique identifier for the resource
 *           example: "52"
 *         title:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Full name of the resource
 *           example: "Jest Testing Tutorial"
 *         type:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: The type of resource
 *           example: "tutorial"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the resource was created
 *           example: "2024-01-15T10:30:00Z"
 */

export interface ResourceCreateRequest {
    title: string;
    type: string;
    url: string;
    description: string;
} 