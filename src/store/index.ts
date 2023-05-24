import { configureStore } from "@reduxjs/toolkit";
import issueReducer from './issuesSlice';

const store = configureStore({
    reducer: {
        issues: issueReducer
    },
});


export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;