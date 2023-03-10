import { configureStore } from '@reduxjs/toolkit';
import todoApiSlice from './todo/todoApiSlice';

export const store = configureStore({
    reducer: {
        [todoApiSlice.reducerPath]: todoApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todoApiSlice.middleware),
});
