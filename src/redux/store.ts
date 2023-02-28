import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
    persistStore,
    PERSIST,
    REHYDRATE,
    FLUSH,
    PAUSE,
    PURGE,
    REGISTER,
} from 'redux-persist';
import todoApiSlice from './todo/todoApiSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const middleware = [
    ...getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
    todoApiSlice.middleware,
];

export const store = configureStore({
    reducer: {
        [todoApiSlice.reducerPath]: todoApiSlice.reducer,
    },
    middleware,
    // devTools: process.env.NODE_ENV === 'development',
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);