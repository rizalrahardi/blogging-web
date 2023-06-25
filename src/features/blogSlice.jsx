import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
	try {
		const { data } = await axios.get(
			"https://minpro-blog.purwadhikabootcamp.com/api/blog?sort=ASC"
		);
		return data.result;
	} catch (error) {
		throw new Error("Error fetching data:", error);
	}
});

const blogSlice = createSlice({
	name: "blogs",
	initialState: [],
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchBlogs.fulfilled, (state, action) => {
			return action.payload;
		});
	},
});

export default blogSlice.reducer;
