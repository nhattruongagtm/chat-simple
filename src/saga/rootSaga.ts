import {all, delay, takeEvery, takeLatest} from 'redux-saga/effects'
function* print(){
    yield delay(500)
    console.log("welcome to T-Messenger")
}
function* helloSaga(){
    yield takeLatest("*",print)
}
export function* rootSaga(){
    yield all([helloSaga()]) 
}