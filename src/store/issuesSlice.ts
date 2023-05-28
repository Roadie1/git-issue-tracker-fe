import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiError, IssueDTO, IssueUrlParams } from "../models/";
import Api from "../api";

export interface IssueState {
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
    error: { status: 0, message: '', name: '' }
};

export const fetchIssues = createAsyncThunk('issues/fetchIssues', async (params: IssueUrlParams, { rejectWithValue }) => {
    try {
        const { user, repository, page, size, forced } = params;
        const result = await Api.searchIssues(user, repository, page, size, forced);
        return result;
    }
    catch (err: unknown) {
        const error = err as ApiError;
        throw rejectWithValue(error.status ? error : { message: "Something went wrong" });
    }
});


export const issueSlice = createSlice({
    name: "issues",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchIssues.pending, (state: IssueState) => {
            state.status = 'loading';
        });
        builder.addCase(fetchIssues.rejected, (state: IssueState, action: PayloadAction<unknown>) => {
            state.status = 'failed';
            state.error = action.payload as ApiError;
        });
        builder.addCase(fetchIssues.fulfilled, (state: IssueState, action: PayloadAction<IssueDTO>) => {
            state.status = 'succeeded'
            state.issueDTO = action.payload;
        });
    }
});

export default issueSlice.reducer;