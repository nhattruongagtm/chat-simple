import {
  addDoc,
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
import { type } from "os";
import firebase, { db } from "../config/firebase";
import { Friend, User } from "../models/auth";
import {
  ChatData,
  ChatItem,
  ChatList,
  ChatListData,
  ContentFile,
  Member,
} from "../models/chat";
import { getUserByID } from "./firestore";

export const USER_DOC = "users";
export const MESSAGES_DOC = "messages";
export const addFriend = async (uid: string, fid: string, type: number = 0) => {
  const userRef = doc(db, USER_DOC, uid);
  const friendRef = doc(db, USER_DOC, fid);

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
  return new Promise(async (resolve, reject) => {
    try {
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
        resolve(result);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
};

// add type attribute
export const createMessageCollection = async (uid: string, fid: string) => {
  const initialValue: ContentFile = {
    media: [],
    text: "",
    sticker: "",
    video: [],
  };
  try {
    const messageRef = collection(db, MESSAGES_DOC);
    const friend = await getUserByID(fid);
    const messageItem: ChatItem = {
      ownID: friend?.uid as string,
      sendStatus: 1,
      status: 0,
      content: initialValue,
      createdDate: Date.now(),
      emojo: [],
      id: uid,
    };
    await addDoc(messageRef, {
      messages: [messageItem],
      images: [],
      members: [
        {
          id: uid,
          nickName: "",
          status: false,
        },

        {
          id: fid,
          nickName: "",
          status: false,
        },
      ],
      type: 0,
    });
  } catch (error) {
    console.log(error);
  }
};
export const createMessageCollecction1 = async (uid: string, ids: Member[]) => {
  const initialValue: ContentFile = {
    media: [],
    text: "",
    sticker: "",
    video: [],
  };
  try {
    const messageRef = collection(db, MESSAGES_DOC);
    const messageItem: ChatItem = {
      ownID: uid,
      sendStatus: 0,
      status: 0,
      content: initialValue,
      createdDate: Date.now(),
      emojo: [],
      id: `${Date.now()}-${uid}`,
    };
    await addDoc(messageRef, {
      messages: [messageItem],
      images: [],
      members: [...ids],
      type: 1,
      name: "",
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

// export const getChatList = async (uid: string): Promise<ChatList> => {
//   const list = await getAllMessageByUser(uid);

//   return new Promise((resolve) => {
//     try {
//       let messagesList: ChatListItem[] = [];
//       let chatList: ChatList = {
//         id: "",
//         images: [],
//         messages: [],
//         members: [],
//         type: 0,
//       };

//       for (let i = 0; i < list.length; i++) {
//         const ref = doc(db, MESSAGES_DOC, list[i]);
//         onSnapshot(ref, async (doc) => {
//           if (doc.exists()) {
//             const ids = doc.id.split("-");
//             const messages = doc.data().messages as ChatItem[];
//             const friend = await getUserByID(getFriendID(uid, ids));
//             if (friend) {
//               const chatItem: ChatListItem = {
//                 friendID: friend.uid,
//                 name: `${friend.firstName} ${friend.lastName}`,
//                 avatar: friend.photoUrl,
//                 isActive: false,
//                 messages: messages,
//                 status: true,
//               };

//               messagesList = [...messagesList, chatItem];
//             }
//             chatList = { ...chatList, messages: messagesList };
//             if (messagesList.length === list.length) {
//               resolve(chatList);
//             }
//           }
//         });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   });
// };
// export const getChatList2 = async (uid: string): Promise<ChatList> => {
//   const friendRef = await getDocs(collection(db, MESSAGES_DOC));

//   return new Promise((resolve) => {
//     try {
//       let messagesList: ChatListItem[] = [];
//       let chatList: ChatList = {
//         id: "",
//         images: [],
//         messages: [],
//         members: [],
//         type: 0,
//       };
//       friendRef.forEach(async (doc) => {
//         if (doc.exists()) {
//           if (doc.id.indexOf(uid) !== -1) {
//             const ids = doc.id.split("-");
//             const messages = doc.data().messages as ChatItem[];

//             // get user info
//             const friend = await getUserByID(getFriendID(uid, ids));

//             if (friend) {
//               const chatItem: ChatListItem = {
//                 // friendID: friend.uid,
//                 name: `${friend.firstName} ${friend.lastName}`,
//                 avatar: friend.photoUrl,
//                 isActive: false,
//                 messages: messages,
//                 status: true,
//               };
//               messagesList = [...messagesList, chatItem];
//             }
//             chatList = { ...chatList, messages: messagesList };

//             if (chatList.messages.length === friendRef.size) {
//               resolve(chatList);
//             }
//           }
//         }
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   });
// };
export const sendMessage = (id: string, content: ChatItem) => {
  const ref = doc(db, MESSAGES_DOC, id);

  updateDoc(ref, {
    messages: arrayUnion({ ...content, sendStatus: 1 }),
  });
};
export const recallMessage = (id: string, content: ChatItem, type: number) => {
  const ref = doc(db, MESSAGES_DOC, id);
  const updatedContent = { ...content, status: type };
  console.log(content);
  updateDoc(ref, {
    messages: arrayRemove(content),
  });
  updateDoc(ref, {
    messages: arrayUnion(updatedContent),
  });
};
export const getFriends = (friends: User[]) => {
  let avatars: string[] = [];

  for (let i = 0; i < friends.length; i++) {
    avatars = [...avatars, friends[i].photoUrl];
  }
  return avatars;
};
export const getRoomList = async (uid: string): Promise<ChatListData[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const messagesRef = await getDocs(collection(db, MESSAGES_DOC));
      let result: ChatListData[] = [];
      let count = 0;
      messagesRef.forEach((doc) => {
        const data = doc.data() as ChatList;
        const { images, members, messages, type, isActive, status, name } =
          data;

        const partner: User[] = [];
        members.forEach(async (item, index) => {
          if (item.id === uid) {
            count++;
            let friends: User[] = [];

            if (Number(members.length) === 2) {
              const idPartner = members.filter((item) => item.id !== uid)[0];
              if (idPartner) {
                const friend = await getUserByID(idPartner.id);
                friend && partner.push(friend);
              }
            } else {
              // to do

              members
                .filter((item) => item.id !== uid)
                .forEach(async (item) => {
                  const friend = await getUserByID(item.id);
                  friend && partner.push(friend);
                });
            }

            for (let i = 0; i < members.length; i++) {
              const friend = await getUserByID(members[i].id);

              if (friend) {
                friend.password = "***************";
                friends.push(friend);
              }
            }
            let chatDatas: ChatData[] = [];

            for (let i = 0; i < messages.length; i++) {
              const item = messages[i];

              try {
                const friend = await getUserByID(item.ownID);

                if (friend) {
                  const chatData: ChatData = {
                    friend: friend,
                    data: item,
                  };
                  chatDatas.push(chatData);
                }
              } catch (error) {
                console.log(error);
              }
            }
            const newData: ChatListData = {
              avatar:
                type === 0 && partner.length === 1
                  ? [partner[0].photoUrl]
                  : [...getFriends(partner)],
              name:
                partner.length > 1 && name
                  ? name
                  : `${partner[0].firstName} ${partner[0].lastName}`,
              id: doc.id,
              images: images,
              members: members,
              isActive: isActive,
              status: status,
              type: type,
              friends: friends,
              messages: chatDatas,
            };

            const index = result.findIndex((mes) => mes.id === doc.id);
            if (index > -1) {
              result = result.filter((mes, ind) => ind !== index);
            }
            result = [...result, newData];
          }

          if (result.length === count && result.length > 0) {
            resolve(result);
          }
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};
