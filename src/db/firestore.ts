import { firestore } from "@config/firebase";

export class FireStoreDb {
    constructor(public tableName: string) {
        this.tableName = tableName;
    }
    async getDoc(id: any) {
        const docRef = firestore.collection(this.tableName).doc(id);
        return (await docRef.get()).data();
    }

    async createDoc(data: any) {
        const docRef = await firestore.collection(this.tableName).add(data);
        return docRef;
    }

    async updateDoc(id: any, data: any) {
        const docRef = await firestore.collection(this.tableName).doc(id).update(data);
        return docRef;
    }

    async deleteDoc(id: any) {
        await firestore.collection(this.tableName).doc(id).delete();
        return true;
    }
}
