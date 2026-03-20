import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";

const {
        FIREBASE_PROJECT_ID,
        FIREBASE_CLIENT_EMAIL,
        FIREBASE_PRIVATE_KEY,
    } = process.env;

    const serviceAccount: ServiceAccount = {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    // Replace escaped newlines in the private key string with actual newlines
    privateKey: FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
};

initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

const auth: Auth = getAuth();

const db: Firestore = getFirestore();

export { auth, db };
