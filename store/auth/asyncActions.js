import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiWrapper } from "utils/reduxUtils";
import { updateProfileApi } from "../../api/user";

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (payload, thunkAPI) => {
    try {
      const data = await apiWrapper({}, updateProfileApi, payload);
      return {
        ...data,
        ...payload,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
