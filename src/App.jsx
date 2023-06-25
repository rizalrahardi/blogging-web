import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Verify from "./pages/verify/Verify";
// import Coba from "./components/coba";
// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ForgotPasswordForm from "./pages/resetPassword/forgotPass";
import ResetPassword from "./pages/resetPassword/resetPassword";
import CreateArticleForm from "./pages/article/CreateArticle";
import UserProfile from "./pages/profile/UserProfile";
import DetailArticle from "./pages/article/DetailArticle";

function App() {
	return (
		<div className="">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/verification/:token" element={<Verify />} />
				<Route path="/forgotPassword" element={<ForgotPasswordForm />} />
				<Route path="/resetPassword" element={<ResetPassword />} />
				<Route path="/createArticle" element={<CreateArticleForm />} />
				<Route path="/profile" element={<UserProfile />} />
				{/* <Route path="/blog/:id" element={<DetailArticle  />} /> */}
			</Routes>
		</div>
	);
}

export default App;
