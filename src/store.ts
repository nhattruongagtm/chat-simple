import { combineReducers, configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import signUpReducer from "./features/auth/signUpSlice";
import modalReducer from "./features/auth/modalSlice";
import friendReducer from "./features/chat/friendsSlice";
import { rootSaga } from "./saga/rootSaga";
import createSagaMiddleware  from 'redux-saga';
import { connectRouter, routerMiddleware } from "connected-react-router";
import {history} from './utils'
import ChatMainReducer from "./features/chat/chatSlice";
import storageReducer from "./features/chat/storageSlice";
import deviceReducer from "./features/global/deviceSlice";
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({thunk: false}),sagaMiddleware,routerMiddleware(history)];

const rootReducer = combineReducers({
    router: connectRouter(history),
    signUp: signUpReducer,
    modal: modalReducer,
    friends: friendReducer,
    chat: ChatMainReducer,
    device: deviceReducer,
    storage: storageReducer,
})
export const store = configureStore({
    reducer: rootReducer,
    middleware
})
sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
