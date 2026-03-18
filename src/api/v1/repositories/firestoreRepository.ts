import { db } from "../config/firebaseConfig";
import { DocumentReference, QuerySnapshot } from "firebase-admin/firestore";
import { Resource } from "../models/resourceModel";
import { ResourceCreateRequest } from "../models/resourceCreateRequestModel";
import { ResourceUpdateRequest } from "../models/resourceUpdateRequestModel";
import { ResourceDTO } from "../models/resourceDTO";

export const addResource = async (item:ResourceCreateRequest): Promise<string> => {

    const docRef: DocumentReference = db.collection("resources").doc("1");

    const itemEntity: Resource = {
        title: item.title,
        type: item.type,
        url: item.url,
        description: item.description,
        createdAt: new Date()
    }
    await docRef.set(itemEntity);
    return docRef.id;
};

export const getResourceById = async (id: string): Promise<ResourceDTO | undefined> => {
    const docRef: DocumentReference = db.collection("resources").doc(id);

    const doc = await docRef.get();

    if (doc.exists) {
        let data = doc.data();

        return {
            id: Number(doc.id),
            title: data!.title,
            type: data!.type,
            url: data!.url,
            description: data!.description,
            createdAt: data!. createdAt
        }
    } else {
        console.log("No such Resource!");
    }
};

export const getResources = async (): Promise<Array<ResourceDTO> | undefined> => {

    const snapshot: QuerySnapshot = await db.collection("resources").get();

    const Resources: ResourceDTO[] = []
    snapshot.forEach((doc) => {
        let data = doc.data();
        Resources.push({
            id: Number(doc.id),
            title: data!.title,
            type: data!.type,
            url: data!.url,
            description: data!.description,
            createdAt: data!.createdAt?.toDate().toISOString()
        });
    });

    return Resources;
};

export const updateResources = async (id: string , item: ResourceUpdateRequest): Promise<void> => {

    const docRef: DocumentReference = db.collection("resources").doc(id);

    const updateData: Partial<Resource> = {};
    if (item.title !== undefined) updateData.title = item.title;
    if (item.type !== undefined) updateData.type = item.type;
    if (item.url !== undefined) updateData.url = item.url;
    if (item.description !== undefined) updateData.description = item.description;

    if (Object.keys(updateData).length === 0) {
        return;
    }

    await docRef.update(updateData);
    return;
};

export const deleteResource = async (id: string): Promise<void> => {

    const docRef: DocumentReference = db.collection("resources").doc(id);

    await docRef.delete();
};
