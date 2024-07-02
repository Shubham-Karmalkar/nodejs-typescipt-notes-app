export interface EUserFriends {
    _userId: string; //primary index
    _friendId: string; //secondary index
    userEmail: string;
    userName: string;
    friendEmail: string;
    friendName: string;
}
