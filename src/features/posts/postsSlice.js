import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const wrappedThunk = (fn) => {
  return async (body, option) => {
    const res = await fn(body, option).catch((err) => {
      if (!err.response) {
        throw err;
      }
      return option.rejectWithValue('Can not find post');
    });

    return res;
  };
};

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  wrappedThunk(async (body, option) => {
    // try {
    //   const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    //   return res.data;
    // } catch (err) {
    //   if (!err.response) {
    //     throw err;
    //   }
    //   return rejectWithValue('Can not find post');
    // }
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return res.data;
  })
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.list = payload;
    },
    [getPosts.rejected]: (state, action) => {
      if (action.payload) {
        state.status = 'failed';
        state.error = action.payload;
        return;
      }
      state.status = 'error';
      state.error = action.error.message;
    },
  },
});

export default postsSlice.reducer;
