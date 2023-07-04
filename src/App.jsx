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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/profile/Profile";
import ChangePass from "./pages/profile/ChangePass";
import MyArticle from "./pages/article/MyArticle";
import DetailArticle from "./pages/article/DetailArticle";
import LikedArticle from "./pages/article/LikedArticle";
import Footer from "./components/Footer";
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
				<Route path="/create-article" element={<CreateArticle />} />
				<Route path="/blog/:id" element={<DetailArticle />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/verification-change-email/:token" element={<Verify />} />
				<Route path="/change-password" element={<ChangePass />} />
				<Route path="/my-article" element={<MyArticle />} />
				<Route path="/liked-article" element={<LikedArticle />} />
			</Routes>
			<ToastContainer />
			<Footer />
		</div>
	);
}

export default App;
