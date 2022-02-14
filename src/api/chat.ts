import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Friend, User } from "../models/auth";
import { ChatItem, ChatList, ChatListItem } from "../models/chat";
import { getUserByID } from "./firestore";
const USER_DOC = "users";
const MESSAGES_DOC = "messages";
export const addFriend = async (uid: string, fid: string, type: number = 0) => {
  const userRef = doc(db, USER_DOC, uid);
  const friendRef = doc(db, USER_DOC, fid);

  console.log(uid, ",", fid);

  const friendAddType: Friend = {
    id: fid,
    accept: type === 0 ? false : true,
    type: 0,
  };
  const friendReceiveType: Friend = {
    id: uid,
    accept: type === 0 ? false : true,
    type: 1,
  };

  if (type === 0) {
    await updateDoc(userRef, {
      friends: arrayUnion(friendAddType),
    });
    await updateDoc(friendRef, {
      friends: arrayUnion(friendReceiveType),
    });
  } else {
    await updateDoc(userRef, {
      friends: arrayRemove({ type: 1, id: fid, accept: false }),
    });
    await updateDoc(friendRef, {
      friends: arrayRemove({ type: 0, id: uid, accept: false }),
    });

    await updateDoc(userRef, {
      friends: arrayUnion({ ...friendAddType, accept: true }),
    });
    await updateDoc(friendRef, {
      friends: arrayUnion({ ...friendReceiveType, accept: true }),
    });

    createMessageCollection(uid, fid);
  }
};
export const getWaitingList = async (
  uid: string,
  type: number = 1
): Promise<User[]> => {
  const userRef = doc(db, USER_DOC, uid);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const result: User[] = [];
    const user = userDoc.data() as User;

    const { friends } = user;

    for (let i = 0; i < friends.length; i++) {
      const item = await getUserByID(friends[i].id);
      if (item && friends[i].type === type) {
        result.push(item);
      }
    }
    return result;
  } else {
    return [];
  }
};
export const createMessageCollection = async (uid: string, fid: string) => {
  try {
    const messageRef = doc(db, MESSAGES_DOC, `${uid}-${fid}`);
    const friend = await getUserByID(fid);
    const messageItem: ChatItem = {
      ownID: friend?.uid as string,
      sendStatus: 0,
      status: 0,
      content: null,
      createdDate: Date.now(),
      emojo: [],
      id: uid,
    };
    await setDoc(messageRef, {
      messages: [messageItem],
      images: [],
    });
  } catch (error) {
    console.log(error);
  }
};

export const getListMessagesWithFriends = async (uid: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    onSnapshot(collection(db, MESSAGES_DOC), (querySnapshot) => {
      querySnapshot.forEach((snapshot) => {
        if (snapshot.exists()) {
          if (snapshot.id.toString().indexOf(uid) !== -1) {
            resolve(snapshot.data());
          }
        } else {
          reject("cannot get messages list");
        }
      });
    });
  });
};
const getFriendID = (uid: string, array: string[]) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === uid) {
      return array[i + 1];
    } else {
      return array[i];
    }
  }
  return "";
};
export const getChatList = async (uid: string): Promise<ChatList> => {
  const friendRef = await getDocs(collection(db, MESSAGES_DOC));
  return new Promise((resolve) => {
    try {
      let messagesList: ChatListItem[] = [];
      let chatList: ChatList = { images: [], messages: [] };
      friendRef.forEach(async (doc) => {
        if (doc.exists()) {
          if (doc.id.indexOf(uid) !== -1) {
            const ids = doc.id.split("-");
            const messages = doc.data().messages as ChatItem[];
            
            // get user info
            const friend = await getUserByID(getFriendID(uid, ids));
            
            if (friend) {
              const chatItem: ChatListItem = {
                friendID: friend.uid,
                name: `${friend.firstName} ${friend.lastName}`,
                avatar: friend.photoUrl,
                isActive: false,
                messages: messages,
                status: true,
              };
              messagesList = [...messagesList,chatItem]
            }
            chatList = {...chatList,messages: messagesList};
            
            if(chatList.messages.length === friendRef.size){
              resolve(chatList)
            }
          }
          



        }
        
      });
      
    } catch (e) {
      console.log(e);
    }
  });
};
