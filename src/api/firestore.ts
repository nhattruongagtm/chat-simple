import firebase, { db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,signOut
} from "firebase/auth";
export interface Error {
  message: string;
  code: string;
}
export const signup = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const auth = getAuth(firebase);

  try {
    const user = (await createUserWithEmailAndPassword(auth, email, password))
      .user;
    return user;
  } catch (error: any) {
    console.log(error.code);
    console.log(error.message);
    
    return null;
}
};

export const login = async (email:string, password: string) =>{
    try {
        const auth = getAuth(firebase);
        const result = (await signInWithEmailAndPassword(auth,email, password)).user;
        return result;
    } catch (error: any) {
        console.log(error.code);

        return error;
        
    }
}

export const signOutUser = async () =>{
    const auth = getAuth(firebase);

    try {
        const result = await signOut(auth);

        return result;
    } catch (error: any) {
        console.log(error.code);
        console.log(error.message);
        return null;
    }
}