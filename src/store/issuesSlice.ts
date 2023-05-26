import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiError, IssueDTO, IssueUrlParams } from "../models/";
import api from "../api";

interface IssueState {
    issueDTO: IssueDTO;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: ApiError
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
    error: { status: 0, message: '' }
};

export const fetchIssues = createAsyncThunk('issues/fetchIssues', async (params: IssueUrlParams, { rejectWithValue }) => {
    try {
        const { user, repository, page, size, forced } = params;
        const result = await api.searchIssues(user, repository, page, size, forced);
        return result;
    }
    catch (err) {
        throw rejectWithValue(err.status ? err : { message: "Something went wrong" });
    }
});


export const issueSlice = createSlice({
    name: "issues",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchIssues.pending, (state, _action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchIssues.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as ApiError;
        });
        builder.addCase(fetchIssues.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.issueDTO = action.payload;
        });
    }
});

export default issueSlice.reducer;