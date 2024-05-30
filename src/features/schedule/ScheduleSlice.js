import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { remove } from "./ScheduleAPI";

export const deleteSchedule = createAsyncThunk(
  "posts/deleteSchedule",
  async (scheduleId, { rejectWithValue }) => {
    try {
      const res = await remove(scheduleId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  schedules: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  schedule: null, // Dùng để lưu trữ dữ liệu bài viết cụ thể
  pagination: {
    page: 0,
    size: 20,
    totalItems: 0,
    totalPages: 0,
  },
};

const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.schedules = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedules.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.schedules = action.payload.content;
        state.pagination = {
          ...state.pagination,
          page: action.payload.number,
          size: action.payload.size,
          totalItems: action.payload.totalElements,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.schedules = state.schedules.filter(
          (schedule) => schedule.id !== action.payload.data
        );
      });
  },
});

export default schedulesSlice.reducer;
