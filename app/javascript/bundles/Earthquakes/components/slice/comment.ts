import { createSlice } from "@reduxjs/toolkit";

interface State {
  isLoading: boolean
  isSuccess: boolean | null;
  error: string | null;
}

const initialState: State = {
  isLoading: false,
  isSuccess: null,
  error: null
}

const commentSlice = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {
    reset(state) {
      state.isSuccess = null
      state.error = null
    },
    loading(state, action) {
      state.isLoading = action.payload
    },
    success(state) {
      state.isLoading = false
      state.isSuccess = true
    },
    failure(state, action) {
      state.isLoading = false
      state.error = action.payload
    }
  }
});

export const { reset, loading, success, failure } = commentSlice.actions
export default commentSlice.reducer