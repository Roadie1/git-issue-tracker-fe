import { configureStore } from "@reduxjs/toolkit";
import issueReducer, { IssueState } from './issuesSlice';
import issueDetailsReducer, { IssueDetailsState } from './issueDetailsSlice';
import modalReducer, { ModalState } from './modalSlice';

const store = configureStore({
    reducer: {
        issues: issueReducer,
        issueDetails: issueDetailsReducer,
        modal: modalReducer
    },
});

export default store;

export type RootState = { issues: IssueState, issueDetails: IssueDetailsState, modal: ModalState };
export type AppDispatch = typeof store.dispatch;