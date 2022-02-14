type FriendType = 0 | 1;
export interface Friend{
    id: string;
    accept: boolean;
    type: FriendType;
}


export interface User{
    uid: string
    firstName: string
    lastName: string
    email: string
    password: string
    photoUrl: string
    createdDate: number
    friends: Friend[]
}

export interface TokenUser{
    auth_time: number
    email: string
    exp: number
    iat: number
    user_id: string
}

