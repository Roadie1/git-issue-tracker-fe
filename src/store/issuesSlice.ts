import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Issue } from "../models/issue-model";

interface IssueState {
    issues: Issue[];
}

const initialState: IssueState = { issues: [] };

export const issueSlice = createSlice({
    name: "issues",
    initialState,
    reducers: {
        setIssues: (_state, action: PayloadAction<Issue[]>) => {
            return { issues: action.payload };
        }
    }
});

export const { setIssues } = issueSlice.actions;

export default issueSlice.reducer;