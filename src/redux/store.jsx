import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import blogSlice from "../features/blogSlice";
import userSlice from "../features/userSlice";
export const store = configureStore({
	reducer: {
		auth: authSlice,
		blogs: blogSlice,
		user: userSlice,
	},
});
