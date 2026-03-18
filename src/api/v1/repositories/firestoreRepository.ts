import { db } from "../config/firebaseConfig";
import { DocumentReference, QuerySnapshot } from "firebase-admin/firestore";
import { Resource } from "../models/resourceModel";
import { ResourceCreateRequest } from "../models/resourceCreateRequestModel";
import { ResourceUpdateRequest } from "../models/resourceUpdateRequestModel";
import { ResourceDTO } from "../models/resourceDTO";

export const addResource = async (item:ResourceCreateRequest): Promise<string> => {

    const docRef: DocumentReference = db.collection("resources").doc();

    const itemEntity: Resource = {
        applicant: item.applicant,
        amount: item.amount,
        status: item.status,
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
            id: doc.id,
            applicant: data!.applicant,
            amount: data!.amount,
            status: data!.status,
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
            id: doc.id,
            applicant: data!.applicant,
            amount: data!.amount,
            status: data!.status,
            createdAt: data!.createdAt?.toDate().toISOString()
        });
    });

    return Resources;
};

export const updateResources = async (id: string , item: ResourceUpdateRequest): Promise<void> => {

    const docRef: DocumentReference = db.collection("resources").doc(id);

    const updateData: Partial<Resource> = {};
    if (item.applicant !== undefined) updateData.applicant = item.applicant;
    if (item.amount !== undefined) updateData.amount = item.amount;
    if (item.status !== undefined) updateData.status = item.status;

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
