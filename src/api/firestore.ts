import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import firebase, { db } from "../config/firebase";
import { SignUpUser } from "../features/auth/signUpSlice";
import { User as user } from "../models/auth";
export interface Error {
  message: string;
  code: string;
}
export const LoginException = (message: string) => {
  return {
    message,
    name: "LoginException",
  };
};
export const signup = async (email: string, password: string) => {
  const auth = getAuth(firebase);

  try {
    const user = (await createUserWithEmailAndPassword(auth, email, password))
      .user;
    return user;
  } catch (error: any) {
    return error.code;
  }
};

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const auth = getAuth(firebase);
    const result = (await signInWithEmailAndPassword(auth, email, password))
      .user;
    return result;
  } catch (error: any) {
    throw LoginException("Tài khoản không tồn tại!");
  }
};

export const signOutUser = async () => {
  const auth = getAuth(firebase);

  try {
    const result = await signOut(auth);

    return result;
  } catch (error: any) {
    return error.code;
  }
};
export const getAllUsers = async (): Promise<user[]> => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const result: user[] = [];
  return new Promise((resolve, reject) => {
    try {
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        const {
          email,
          password,
          firstName,
          lastName,
          photoUrl,
          createdDate,
          friends,
        } = data;
        const u: user = {
          email,
          password,
          firstName,
          lastName,
          photoUrl,
          createdDate,
          uid: doc.id,
          friends,
        };
        result.push(u);
      });
      resolve(result);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
export const signUpToFirestore = async (id: string, user: SignUpUser) => {
  const userRef = doc(db, "users", id);
  try {
    await setDoc(userRef, {
      ...user,
      photoUrl: "",
      createdDate: Date.now(),
      friends: [],
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const removeAuth = (user: User) => {
  user &&
    deleteUser(user)
      .then(() => {
        console.log("delete success!");
      })
      .catch((e: any) => {
        console.log("error delete!", e.message);
      });
};
export const getUserByID = async (uid: string): Promise<user | null> => {
  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const data = userDoc.data();

    const {
      email,
      password,
      firstName,
      lastName,
      photoUrl,
      createdDate,
      friends,
    } = data;

    const user: user = {
      uid: userDoc.id,
      email,
      password,
      firstName,
      lastName,
      photoUrl,
      createdDate,
      friends,
    };

    return user;
  } else {
    return null;
  }
};
