import { configureStore, createSelector } from "@reduxjs/toolkit";
import issueReducer, { IssueState } from './issuesSlice';
import issueDetailsReducer, { IssueDetailsState } from './issueDetailsSlice';
import statisticsReducer, { StatisticsState } from './statisticsSlice';

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

export type RootState = { issues: IssueState, issueDetails: IssueDetailsState, statistics: StatisticsState };
export type AppDispatch = typeof store.dispatch;