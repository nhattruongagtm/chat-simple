import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import firebase, { db } from "../config/firebase";
import { Friend, User } from "../models/auth";
import { ChatItem, ChatList, ChatListItem, ContentFile } from "../models/chat";
import { getUserByID } from "./firestore";

export const USER_DOC = "users";
export const MESSAGES_DOC = "messages";
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
      friends: arrayUnion({ ...friendAddType, type: 0, accept: true }),
    });
    await updateDoc(friendRef, {
      friends: arrayUnion({ ...friendReceiveType, type: 0, accept: true }),
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
  const initialValue: ContentFile = {
    media: [],
    text: "",
    sticker: "",
    video: "",
  };
  try {
    const messageRef = doc(db, MESSAGES_DOC, `${uid}-${fid}`);
    const friend = await getUserByID(fid);
    const messageItem: ChatItem = {
      ownID: friend?.uid as string,
      sendStatus: 0,
      status: 0,
      content: initialValue,
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
export const getFriendID = (uid: string, array: string[]) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === uid) {
      return array[i + 1];
    } else {
      return array[i];
    }
  }
  return "";
};
export const getAllMessageByUser = async (uid: string): Promise<string[]> => {
  const friendRef = await getDocs(collection(db, MESSAGES_DOC));
  const result: string[] = [];
  let count = 0;

  return new Promise((resolve) => {
    friendRef.forEach((doc) => {
      count++;
      if (doc.exists()) {
        if (doc.id.indexOf(uid) !== -1) {
          result.push(doc.id);
        }
      }
      if (count === friendRef.size) {
        resolve(result);
      }
    });
  });
};

export const getChatList = async (uid: string): Promise<ChatList> => {
  const list = await getAllMessageByUser(uid);

  return new Promise((resolve) => {
    try {
      let messagesList: ChatListItem[] = [];
      let chatList: ChatList = { images: [], messages: [] };

      for (let i = 0; i < list.length; i++) {
        const ref = doc(db, MESSAGES_DOC, list[i]);
        onSnapshot(ref, async (doc) => {
          if (doc.exists()) {
            const ids = doc.id.split("-");
            const messages = doc.data().messages as ChatItem[];
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

              messagesList = [...messagesList, chatItem];
            }
            chatList = { ...chatList, messages: messagesList };
            if (messagesList.length === list.length) {
              resolve(chatList);
            }
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
};
export const getChatList2 = async (uid: string): Promise<ChatList> => {
  const friendRef = await getDocs(collection(db, MESSAGES_DOC));

  return new Promise((resolve) => {
    try {
      let messagesList: ChatListItem[] = [];
      let chatList: ChatList = { images: [], messages: [] };
      friendRef.forEach(async (doc) => {
        if (doc.exists()) {
          if (doc.id.indexOf(uid) !== -1) {
            // onSnapshot(a,(d)=>{
            //   console.log("snapshot",d.data())
            // })
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
              messagesList = [...messagesList, chatItem];
            }
            chatList = { ...chatList, messages: messagesList };

            if (chatList.messages.length === friendRef.size) {
              resolve(chatList);
            }
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  });
};
export const sendMessage = (id: string, content: ChatItem) => {
  const ref = doc(db, MESSAGES_DOC, id);

  updateDoc(ref, {
    messages: arrayUnion(content),
  });
};
