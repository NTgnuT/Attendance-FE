import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "/src/common/api/axiosConfig";
import { findAll, edit, add, remove, getPostById } from "./PostAPI";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (
    { page = 0, size = 1, sort = "id", order = "asc", keyword = "" },
    { rejectWithValue }
  ) => {
    try {
      const response = await findAll(page, size, sort, order, keyword);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await add(postData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await remove(postId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await edit(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getPostById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  posts: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  post: null, // Dùng để lưu trữ dữ liệu bài viết cụ thể
  pagination: {
    page: 0,
    size: 2,
    totalItems: 0,
    totalPages: 0,
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload.content;
        state.pagination = {
          page: action.payload.number,
          size: action.payload.size,
          totalItems: action.payload.totalElements,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.post = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectPost = (state) => state.posts.post;
export const selectPagination = (state) => state.posts.pagination;

export default postsSlice.reducer;
