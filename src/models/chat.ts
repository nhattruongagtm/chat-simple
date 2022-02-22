export interface Emoji{
    type: 'like' | 'angry' | 'smile'
    number: number
}
interface CallTime{
    hour: number,
    minute: number,
    second: number,
}
interface CallFile{
    id: string,
    duration: CallTime,
    status: number,
}
export interface ContentFile{
    text: string,
    media: string[],
    video: string,
    sticker: string
}
export interface ChatItem{
    ownID: string
    id: string
    content: ContentFile 
    createdDate: number
    emojo: Emoji[]
    // message status: 0 is delete, 1 is display, 2 is recall
    status: 0 | 1 | 2
    sendStatus: 0 | 1 | 2
}
export interface ChatListItem{
    friendID: string
    name: string
    avatar: string
    isActive: boolean
    messages: ChatItem[]
    // status it's mean when user search friends and click on it, message item will be added and display on it
    status: boolean
}
export interface ChatList{
    images: string[],
    messages: ChatListItem[]
}