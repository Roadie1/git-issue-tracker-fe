import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiError, StatisticsDTO, StatisticsUrlParams } from "../models/";
import api from "../api";

interface StatisticsState {
    statistics: StatisticsDTO;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: ApiError
}

const initialState: StatisticsState = {
    statistics: {
        statistics: [],
        metadata: {
            totalCount: 0,
            page: 0,
            size: 0,
            user: '',
            repository: ''
        },
    },
    status: 'idle',
    error: { status: 0, message: '' }
};

export const fetchStatistics = createAsyncThunk('statistics/fetchStatistics', async (params: StatisticsUrlParams, { rejectWithValue }) => {
    try {
        const { page, size } = params;
        const result = await api.fetchStatistics(page, size);
        return result;
    }
    catch (err) {
        throw rejectWithValue(err.status ? err : { message: "Something went wrong" });
    }
});


export const statisticsSlice = createSlice({
    name: "statistics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStatistics.pending, (state, _action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchStatistics.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as ApiError;
        });
        builder.addCase(fetchStatistics.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.statistics = action.payload;
        });
    }
});

export default statisticsSlice.reducer;