import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
	const response = await axios.get(
		"https://minpro-blog.purwadhikabootcamp.com/api/blog"
	);
	return response.data.result;
});

export const fetchBlogId = createAsyncThunk(
	"blogs/fetchBlogId",
	async (blogId) => {
		try {
			const response = await axios.get(
				`https://minpro-blog.purwadhikabootcamp.com/api/blog/${blogId}`
			);
			for (let i = 0; i < response.data.length; i++) {
				if (response.data[i].id === blogId) {
					console.log(response.data[i]);
					return response.data[i];
				}
			}
		} catch (error) {
			console.log(error);
		}
	}
);

const blogSlice = createSlice({
	name: "blogs",
	initialState: {
		blogs: [],
		selectedBlog: null,
		status: "idle",
		error: null,
	},
	reducers: {
		setSelectedBlog: (state, action) => {
			state.selectedBlog = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBlogs.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchBlogs.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.blogs = action.payload;
			})
			.addCase(fetchBlogs.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(fetchBlogId.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchBlogId.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.selectedBlog = action.payload;
			})
			.addCase(fetchBlogId.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { setSelectedBlog } = blogSlice.actions;

export const selectBlogs = (state) => state.blogs.blogs;
export const selectSelectedBlog = (state) => state.blogs.selectedBlog;

export default blogSlice.reducer;
