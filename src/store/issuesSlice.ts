import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IssueDTO, IssueUrlParams } from "../models/";
import api from "../api";

interface IssueState {
    issueDTO: IssueDTO;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null
}

const initialState: IssueState = {
    issueDTO: {
        issues: [],
        metadata: {
            totalCount: 0,
            size: 10,
            page: 1,
            user: '',
            repository: ''
        }
    },
    status: 'idle',
    error: null
};

export const fetchIssues = createAsyncThunk('issues/fetchIssues', async (params: IssueUrlParams) => {
    const { user, repository, page, size, forced } = params;
    const result = await api.searchIssues(user, repository, page, size, forced);
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
        builder.addCase(fetchIssues.pending, (state, _action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchIssues.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        });
        builder.addCase(fetchIssues.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.issueDTO = action.payload;
        });
    }
});

export const { getIssues } = issueSlice.actions;

export default issueSlice.reducer;