export interface Database {
    get(tableName: string, id: any): Promise<any>;
    getAll(tableName: string, key: any): Promise<any>;
    create(tableName: string, data: any): Promise<any>;
    update(tableName: string, id: any, data: any): Promise<any>;
    delete(tableName: string, id: any): Promise<boolean>;
}
