import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Verify from "./pages/verify/Verify";
import { Routes, Route } from "react-router-dom";
import ForgotPasswordForm from "./pages/resetPassword/forgotPass";
import ResetPassword from "./pages/resetPassword/resetPassword";
import CreateArticle from "./pages/article/CreateArticle";
import UserProfile from "./pages/profile/UserProfile";
import CobaBlogId from "./pages/article/CobaBlogId";
import ChangePassword from "./pages/profile/ChangePassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/profile/Profile";
import ChangePass from "./pages/profile/ChangePass";
import MyArticle from "./pages/article/MyArtile";
import DetailArticle from "./components/article/DetailArticle";
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
				<Route path="/reset-password/:token" element={<ResetPassword />} />
				<Route path="/createArticle" element={<CreateArticle />} />
				<Route path="/blog/:id" element={<DetailArticle />} />
				{/* <Route path="/profile" element={<UserProfile />} /> */}
				<Route path="/profile" element={<Profile />} />
				<Route path="/article/:id" element={<CobaBlogId />} />
				{/* <Route path="/profile/change-password" element={<ChangePassword />} /> */}
				<Route path="/verification-change-email/:token" element={<Verify />} />
				<Route path="/change-password" element={<ChangePass />} />
				<Route path="/my-article" element={<MyArticle />} />
			</Routes>
			<ToastContainer />
		</div>
	);
}

export default App;
