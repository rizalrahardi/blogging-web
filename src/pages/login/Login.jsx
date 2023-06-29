import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../features/authSlice";
import { toast } from "react-toastify";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.auth.loading);
	const success = useSelector((state) => state.auth.login);
	const failure = useSelector((state) => state.auth.error);

	const initialValues = {
		// username: "",
		email: "",
		// phone: "",
		password: "",
	};

	const validationSchema = Yup.object({
		username: Yup.string()
			.min(6, "Username must be at least 6 characters")
			.notRequired(),
		email: Yup.string().email("Invalid email address").notRequired(),
		phone: Yup.number()
			.min(10, "Phone number must be at least 10 characters")
			.notRequired(),
		password: Yup.string()
			.min(6, "Password must be at least 8 characters")
			.matches(
				/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
				"Password must include at least one uppercase letter, one number, and one symbol"
			)
			.required("Required"),
	});

	const handleLoginSubmit = (values) => {
		dispatch(loginUser(values));
		console.log(values);
	};

	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	useEffect(() => {
		if (success) {
			navigate("/");
		}
	}, [success, navigate]);

	return (
		<>
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<div className="max-w-md w-full px-10 py-8 bg-white shadow-md rounded-3xl">
					<h2 className="text-2xl font-semibold mb-6">Login</h2>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleLoginSubmit}
					>
						<Form>
							<div className="mb-4 text-center">
								{success && navigate("/")}

								{failure && (
									<div className="mb-4 text-red-600 text-center">
										<p>{failure}</p>
									</div>
								)}
							</div>
							{/* <div className="mb-4">
								<label htmlFor="username">Username</label>
								<Field
									type="text"
									id="username email phone"
									name="username email phone"
									className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
								/>
								<ErrorMessage
									name="username"
									component="p"
									className="text-red-500"
								/>
							</div> */}
							<div className="mb-4">
								<label htmlFor="email">Email</label>
								<Field
									type="email"
									id="email"
									name="email"
									className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
								/>
								<ErrorMessage
									name="email"
									component="p"
									className="text-red-500"
								/>
							</div>
							{/* <div className="mb-4">
								<label htmlFor="phone">Phone</label>
								<Field
									type="number"
									id="phone"
									name="phone"
									className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
								/>
								<ErrorMessage
									name="phone"
									component="p"
									className="text-red-500"
								/>
							</div> */}
							<div className="mb-4">
								<label htmlFor="password">Password</label>
								<div className="flex">
									<Field
										type={showPassword ? "text" : "password"}
										id="password"
										name="password"
										className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
									/>
									<button
										type="button"
										className="ml-2 p-2 bg-gray-200 rounded-md focus:outline-none"
										onClick={togglePasswordVisibility}
									>
										<FontAwesomeIcon
											icon={showPassword ? faEyeSlash : faEye}
											className="text-gray-500"
										/>
									</button>
								</div>
								<ErrorMessage name="password">
									{(errorMsg) => <p className="text-red-500">{errorMsg}</p>}
								</ErrorMessage>
							</div>
							<div className="text-center">
								<button
									type="submit"
									disabled={loading}
									className="w-full mb-5 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
								>
									{loading ? "Logging in..." : "Login"}
								</button>
								<br />
								<button
									className="text-blue-500"
									onClick={() => navigate("/register")}
								>
									Don't have an account? Click here
								</button>
								<br />
								<button
									className="text-blue-500"
									onClick={() => navigate("/forgotPassword")}
								>
									Forgot password?
								</button>
							</div>
						</Form>
					</Formik>
				</div>
			</div>
		</>
	);
};

export default Login;
