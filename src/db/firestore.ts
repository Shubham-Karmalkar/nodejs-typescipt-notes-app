import { firestore } from "@config/firebase";
import { Database } from "@interfaces/db.interface";

export class FireStoreDb implements Database {
    constructor() {}
    async get(tableName: string, id: any) {
        const docRef = firestore.collection(tableName).doc(id);
        return (await docRef.get()).data();
    }

    async create(tableName: string, data: any) {
        const docRef = await firestore.collection(tableName).add(data);
        return docRef;
    }

    async update(tableName: string, id: any, data: any) {
        const docRef = await firestore.collection(tableName).doc(id).update(data);
        return docRef;
    }

    async delete(tableName: string, id: any) {
        await firestore.collection(tableName).doc(id).delete();
        return true;
    }
}
