import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { registerUser } from "../../features/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RegistrationPage = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.auth.loading);
	const success = useSelector((state) => state.auth.registrationSuccess);
	const failure = useSelector((state) => state.auth.error);
	const isLogin = useSelector((state) => state.auth.login);

	const validationSchema = Yup.object().shape({
		username: Yup.string().required("Username is required"),
		email: Yup.string().email("Invalid email").required("Email is required"),
		phone: Yup.number().required("Phone number is required"),
		password: Yup.string()
			.required("Password is required")
			.matches(
				/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}$/,
				"Password must contain at least 6 characters, one uppercase letter, one number, and one special symbol"
			),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), null], "Passwords must match")
			.required("Confirm Password is required"),
	});

	const initialValues = {
		username: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		FE_URL: "http://localhost:3000",
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const toggleShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	const handleFormSubmit = async (values) => {
		dispatch(registerUser(values));
		console.log(values);
	};

	useEffect(() => {
		if (isLogin) {
			navigate("/");
		}
	}, [success, navigate, isLogin]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="max-w-md w-full px-10 py-8 bg-white rounded-3xl shadow-md">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleFormSubmit}
				>
					<Form className="">
						<h1 className="text-2xl font-bold mb-4 text-center">
							Registration
						</h1>
						{success && (
							<div
								className="bg-green-100 my-2 border text-center border-green-400 text-green-700 px-4 py-3 rounded relative"
								role="alert"
							>
								<p>
									registration success, please check your email to verify
									account
								</p>
							</div>
						)}
						{failure && (
							<div
								className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
								role="alert"
							>
								<p>{failure}</p>
							</div>
						)}

						<div className="mb-4">
							<label
								htmlFor="username"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Username:
							</label>
							<Field
								type="text"
								id="username"
								name="username"
								className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
							/>
							<ErrorMessage
								name="username"
								component="div"
								className="text-red-500 text-xs"
							/>
						</div>

						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Email:
							</label>
							<Field
								type="email"
								id="email"
								name="email"
								className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
							/>
							<ErrorMessage
								name="email"
								component="div"
								className="text-red-500 text-xs"
							/>
						</div>

						<div className="mb-4">
							<label
								htmlFor="phone"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Phone:
							</label>
							<Field
								type="number"
								id="phone"
								name="phone"
								className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
							/>
							<ErrorMessage
								name="phone"
								component="div"
								className="text-red-500 text-xs"
							/>
						</div>

						<div className="mb-4 relative">
							<label
								htmlFor="password"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Password:
							</label>
							<Field
								type={showPassword ? "text" : "password"}
								id="password"
								name="password"
								className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
							/>
							<span
								onClick={toggleShowPassword}
								className="absolute top-1/2 right-4 -mt-1/2 cursor-pointer"
							>
								<FontAwesomeIcon
									icon={showPassword ? faEyeSlash : faEye}
									className="text-gray-500 hover:text-gray-700"
								/>
							</span>
							<ErrorMessage
								name="password"
								component="div"
								className="text-red-500 text-xs"
							/>
						</div>

						<div className="mb-4 relative">
							<label
								htmlFor="confirmPassword"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Confirm Password:
							</label>
							<Field
								type={showConfirmPassword ? "text" : "password"}
								id="confirmPassword"
								name="confirmPassword"
								className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
							/>
							<span
								onClick={toggleShowConfirmPassword}
								className="absolute top-1/2 right-4 -mt-1/2 cursor-pointer"
							>
								<FontAwesomeIcon
									icon={showConfirmPassword ? faEyeSlash : faEye}
									className="text-gray-500 hover:text-gray-700"
								/>
							</span>
							<ErrorMessage
								name="confirmPassword"
								component="div"
								className="text-red-500 text-xs"
							/>
						</div>
						<div className="text-center">
							<button
								type="submit"
								className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								disabled={loading}
							>
								{loading ? "Registering..." : "Register"}
							</button>
							<br />
							{success ? (
								<button
									className="text-blue-500"
									onClick={() => navigate("/login")}
								>
									registration succes?
								</button>
							) : (
								<button
									className="text-blue-500"
									onClick={() => navigate("/login")}
								>
									have an account?
								</button>
							)}
						</div>
					</Form>
				</Formik>
			</div>
		</div>
	);
};

export default RegistrationPage;
