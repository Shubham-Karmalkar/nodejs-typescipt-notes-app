import { FireStoreDb } from "./firestore";

export class Database {
  db: FireStoreDb;
  constructor(tableName: string) {
    this.db = new FireStoreDb(tableName);
  }

  async get(id: any) {
    return await this.db.getDoc(id);
  }

  async update(id: any, data: any) {
    return await this.db.updateDoc(id, data);
  }

  async create(data: any) {
    return await this.db.createDoc(data);
  }

  async delete(id: any) {
    return await this.db.deleteDoc(id);
  }
}
