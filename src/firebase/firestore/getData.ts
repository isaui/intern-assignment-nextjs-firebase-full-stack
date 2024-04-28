import firebase_app from "../config";
import { getFirestore, collection, getDocs, DocumentData, doc, getDoc, QueryDocumentSnapshot } from 'firebase/firestore';
const db = getFirestore(firebase_app)

export default async function getDocument(collection: string, id: string) {
    let docRef = doc(db, collection, id);

    let result = null;
    let error = null;

    try {
        result = await getDoc(docRef);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export  async function getDocuments(collectionName: string) {
    let documents: Record<string, DocumentData> = {};
    let error: any = null;

    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            documents[doc.id] = doc.data();
        });
    } catch (e) {
        error = e;
    }

    return { documents, error };
}