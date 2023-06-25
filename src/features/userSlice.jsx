import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	user: null,
	loading: false,
	error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (token) => {
	try {
		const { data } = await axios.get(
			"https://minpro-blog.purwadhikabootcamp.com/api/auth/",
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
});

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default userSlice.reducer;
