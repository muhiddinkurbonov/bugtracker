import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchBugs = createAsyncThunk("bugs/fetchBugs", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addBug = createAsyncThunk("bugs/addBug", async (bug) => {
  const response = await axios.post(API_URL, bug);
  return response.data;
});

export const updateBug = createAsyncThunk(
  "bugs/updateBug",
  async ({ id, bug }) => {
    const response = await axios.patch(`${API_URL}/${id}`, bug);
    return response.data;
  }
);

export const deleteBug = createAsyncThunk("bugs/deleteBug", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});


const bugsSlice = createSlice({
  name: "bugs",
  initialState: {
    bugs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBugs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBugs.fulfilled, (state, action) => {
        state.loading = false;
        state.bugs = action.payload;
      })
      .addCase(fetchBugs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBug.fulfilled, (state, action) => {
        state.bugs.push(action.payload);
      })
      .addCase(addBug.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateBug.fulfilled, (state, action) => {
        const index = state.bugs.findIndex(
          (bug) => bug._id === action.payload._id
        );
        if (index !== -1) {
          state.bugs[index] = action.payload;
        }
      })
      .addCase(updateBug.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteBug.fulfilled, (state, action) => {
        state.bugs = state.bugs.filter((bug) => bug._id !== action.payload);
      })
      .addCase(deleteBug.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default bugsSlice.reducer;


