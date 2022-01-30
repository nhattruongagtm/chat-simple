import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import firebase from "../config/firebase";

const socialAuth = async (
  provider: FacebookAuthProvider | GoogleAuthProvider
) => {
  const auth = getAuth(firebase);

  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    const credential = FacebookAuthProvider.credentialFromResult(result)
    
    const token = await user.getIdToken();

    console.log(token);

    return true;
  } catch (e: any) {
    const credential = FacebookAuthProvider.credentialFromError(e);
    console.log(credential);
    console.log(e);

    return false;
  }
};
export default socialAuth;
