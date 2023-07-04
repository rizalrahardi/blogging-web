import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialToken = localStorage.getItem("token");
const initialState = {
	loading: false,
	registrationSuccess: false,
	error: null,
	user: {
		id: null,
		username: "",
		email: "",
		phone: "",
		password: "",
	},
	login: Boolean(initialToken),
	token: initialToken,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		registrationStart: (state) => {
			state.loading = true;
			state.registrationSuccess = false;
			state.error = null;
		},
		registrationSuccess: (state) => {
			state.loading = false;
			state.registrationSuccess = true;
			state.error = null;
		},
		registrationFailure: (state, action) => {
			state.loading = false;
			state.registrationSuccess = false;
			state.error = action.payload;
		},

		loginStart: (state) => {
			state.loading = true;
			state.login = false;
			state.error = null;
		},
		loginSuccess: (state, action) => {
			state.loading = false;
			state.login = true;
			state.error = null;
			localStorage.setItem("token", action.payload);
		},
		loginFailure: (state, action) => {
			state.loading = false;
			state.login = false;
			state.error = action.payload;
		},
		logoutSuccess: (state, action) => {
			state.loading = false;
			state.login = false;
			state.error = null;
			localStorage.removeItem("token", action.payload);
		},
	},
});

export const {
	registrationStart,
	registrationSuccess,
	registrationFailure,
	loginStart,
	loginSuccess,
	loginFailure,
	logoutSuccess,
} = authSlice.actions;

export const registerUser = (userData) => async (dispatch) => {
	try {
		userData.FE_URL = window.location.origin;
		console.log(userData);
		dispatch(registrationStart());
		const res = await axios.post(
			"https://minpro-blog.purwadhikabootcamp.com/api/auth/",
			userData
		);
		dispatch(registrationSuccess());
		console.log(res);
	} catch (error) {
		dispatch(registrationFailure(error.response.data));
		console.log(error.response.data);
	}
};

export const loginUser = (userData) => async (dispatch) => {
	try {
		dispatch(loginStart());
		const res = await axios.post(
			"https://minpro-blog.purwadhikabootcamp.com/api/auth/login",
			userData
		);
		if (res.status === 200) {
			dispatch(loginSuccess(res.data.token));
			console.log(res);
		}
	} catch (error) {
		dispatch(loginFailure(error.response.data.err));
		console.log(error.response.data.err);
	}
};

export default authSlice.reducer;
