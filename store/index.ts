import { configureStore } from '@reduxjs/toolkit';
import { accountApi } from '~/services/accountApi';
import { connectorApi } from '~/services/connectorApi';
import { postApi } from '~/services/postApi';
import accountSlice from '~/slices/accountSlice';
import postSlice from '~/slices/postSlice';

export const store = configureStore({
  reducer: {
    accountSlice: accountSlice,
    postSlice: postSlice,
    [accountApi.reducerPath]: accountApi.reducer,
    [connectorApi.reducerPath]: connectorApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare()
      .concat(accountApi.middleware)
      .concat(connectorApi.middleware)
      .concat(postApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
