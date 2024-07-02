export interface ENotes {
    _id: string; //primary index
    _ownerId: string; //secondary index
    createdAt: string;
    updatedAt: string;
    noteType: "private" | "public" | "protected";
    password: string | null;
    likes: number;
    tags: string[];
    userLike: boolean;
    pinned: boolean;
    text: string;
}
