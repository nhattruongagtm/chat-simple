import { PayloadAction } from "@reduxjs/toolkit"
import { User } from "firebase/auth"
import md5 from "md5"
import { call, delay, put, takeLatest } from "redux-saga/effects"
import { removeAuth, signup, signUpToFirestore } from "../api/firestore"
import { requestSignUp, requestSignUpFail, requestSignUpSuccess, SignUpUser } from "../features/auth/signUpSlice"

export function* signUp({payload}: PayloadAction<SignUpUser>){
    yield delay(500)
    const {email,password,firstName,lastName} = payload
    try {
        const user: User | null = yield call(signup,email,md5(password))

        // console.log("user",user)
        if(typeof user ==="string"){
            yield put(requestSignUpFail(user))

        }
        if(user?.uid){
            const result: boolean = yield call(signUpToFirestore, user.uid,{email,firstName,lastName,password: md5(password)})
            if(result){
                yield put(requestSignUpSuccess())
            }
            else{
                // remove email in authentication
                yield call(removeAuth,user);

                yield put(requestSignUpFail('error/add-firestore'))

            }
        }
    } catch (error: any) {
        yield put(requestSignUpFail(error.message))
    }
}
export function* signUpSaga(){
    yield takeLatest(requestSignUp,signUp)
}
export default signUpSaga