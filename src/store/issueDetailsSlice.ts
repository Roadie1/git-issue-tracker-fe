import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiError, DetailsUrlParams, IssueDetailsDTO } from "../models/";
import api from "../api";

export interface IssueDetailsState {
    details: IssueDetailsDTO;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: ApiError
}

const initialState: IssueDetailsState = {
    details: {
        htmlUrl: '',
        id: '',
        number: 0,
        title: '',
        user: {
            login: '',
            avatarUrl: '',
            htmlUrl: ''
        },
        labels: [],
        locked: false,
        createdAt: '',
        body: '',
        state: '',
        assignees: []
    },
    status: 'idle',
    error: { status: 0, message: '' }
};

export const fetchDetails = createAsyncThunk('issueDetails/fetchDetails', async (params: DetailsUrlParams, { rejectWithValue }) => {
    try {
        const { user, repository, issueNumber } = params;
        const result = await api.fetchIssueDetails(user, repository, issueNumber);
        return result;
    }
    catch (err) {
        throw rejectWithValue(err.status ? err : { message: "Something went wrong" });
    }
});


export const issueDetailsSlice = createSlice({
    name: "issueDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDetails.pending, (state: IssueDetailsState, _action: PayloadAction) => {
            state.status = 'loading';
        });
        builder.addCase(fetchDetails.rejected, (state: IssueDetailsState, action: PayloadAction<unknown>) => {
            state.status = 'failed';
            state.error = action.payload as ApiError; 
        });
        builder.addCase(fetchDetails.fulfilled, (state: IssueDetailsState, action: PayloadAction<IssueDetailsDTO>) => {
            state.status = 'succeeded'
            state.details = action.payload;
        });
    }
});

export default issueDetailsSlice.reducer;