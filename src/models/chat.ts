import { Friend, User } from "./auth";

export interface Emoji {
  type: "like" | "angry" | "smile";
  number: number;
}
interface CallTime {
  hour: number;
  minute: number;
  second: number;
}
interface CallFile {
  id: string;
  duration: CallTime;
  status: number;
}
export interface ContentFile {
  text: string;
  media: string[];
  video: string[];
  sticker: string;
}
export interface ChatItem {
  ownID: string;
  id: string;
  content: ContentFile;
  createdDate: number;
  emojo: Emoji[];
  // message status: 0 is delete, 1 is display, 2 is recall
  status: 0 | 1 | 2;
  sendStatus: 0 | 1 | 2;
}
export interface ChatList {
  id: string;
  images: string[];
  messages: ChatItem[];
  members: Member[];
  type: number;
  isActive: boolean;
  status: boolean;
  name? : string;
}

export interface ChatData {
  friend: User;
  data: ChatItem;
}
export interface Member{
  id: string,
  nickName: string,
  status: boolean,
  isAdmin?: boolean,
}
export interface ChatListData {
  avatar: string[],
  name: string,
  id: string;
  images: string[];
  members: Member[];
  type: number;
  isActive: boolean;
  status: boolean;
  friends: User[];
  messages: ChatData[];
  admin?: string;
}