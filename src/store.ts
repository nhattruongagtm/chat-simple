import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import signUpReducer from "./features/auth/signUpSlice";
import { rootSaga } from "./saga/rootSaga";
import createSagaMiddleware  from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({thunk: false}),sagaMiddleware];
export const store = configureStore({
    reducer: {
        signUp: signUpReducer,
    },
    middleware
})
sagaMiddleware.run(rootSaga)
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
