import { configureStore, createSelector } from "@reduxjs/toolkit";
import issueReducer from './issuesSlice';
import issueDetailsReducer from './issueDetailsSlice';
import statisticsReducer from './statisticsSlice';

const store = configureStore({
    reducer: {
        issues: issueReducer,
        issueDetails: issueDetailsReducer,
        statistics: statisticsReducer
    },
});

export const errorSelector = createSelector(
        (state: RootState) => {
            return state.issues.error;
        },
        (state: RootState) => {
            return state.issueDetails.error;
        },
        (state: RootState) => {
            return state.statistics.error;
        },
        (issuesError, detailsError, statisticsError) => {
            return issuesError || detailsError || statisticsError;
        }
    );

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;