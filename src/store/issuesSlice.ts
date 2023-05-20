import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IssueDTO } from "../models/";
import { searchIssues } from "../api/api";

interface IssueState {
    issueDTO: IssueDTO;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null
}

const initialState: IssueState = {
    issueDTO: {
        issues: [],
        metadata: {
            total: 0,
            totalPages: 0,
            page: 0
        }
    },
    status: 'idle',
    error: null
};

export const fetchIssues = createAsyncThunk('issues/fetchIssues', async (params: { username: string, repository: string, page: number, size: number }) => {
    const { username, repository, page, size} = params;
    const result = await searchIssues(username, repository, size, page);
    console.log(result);
    return result;
});


export const issueSlice = createSlice({
    name: "issues",
    initialState,
    reducers: {
        getIssues: (state, action: PayloadAction<IssueDTO>) => {
            state.issueDTO = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchIssues.fulfilled, (state, action) => {
            state.issueDTO = action.payload;
        });
    }
});

export const selectIssueByID = (state: IssueDTO, issueId: string) => state.issues.find(issue => issue.id === issueId);

export const { getIssues } = issueSlice.actions;

export default issueSlice.reducer;