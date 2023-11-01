import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './users/userSlice';
import adminReducer from './admin/adminSlice';
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer,
  });
  
const persistConfig = {
    key:'root',
    version:1,
    storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer)
export const store = configureStore({
    reducer:  persistedReducer ,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistedStore = persistStore(store)