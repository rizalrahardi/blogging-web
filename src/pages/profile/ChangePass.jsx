import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function ChangePass() {
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const initialValues = {
		currentPassword: "",
		password: "",
		confirmPassword: "",
	};

	const validationSchema = Yup.object().shape({
		currentPassword: Yup.string().required("Old password is required"),
		password: Yup.string()
			.min(6, "Password must be at least 6 characters")
			.matches(
				/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).*$/,
				"Password must contain at least one uppercase letter, one lowercase letter, and one symbol"
			)
			.required("Password is required"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), null], "Passwords must match")
			.required("Confirm Password is required"),
	});

	const handleSubmit = async (values, { resetForm }) => {
		try {
			const token = localStorage.getItem("token");

			const response = await axios.patch(
				"https://minpro-blog.purwadhikabootcamp.com/api/auth/changePass",
				{
					currentPassword: values.currentPassword,
					password: values.password,
					confirmPassword: values.confirmPassword,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			toast.success(response.data.message);

			setTimeout(() => {
				localStorage.removeItem("token");
				window.location.href = "/";
			}, 1500);
		} catch (error) {
			toast.error(error.response.data.err);
			console.log(error);
		}
	};

	return (
		<div className="max-w-md flex flex-col justify-center items-center min-h-screen mx-auto">
			<div className="w-full shadow-md rounded-2xl p-20">
				<h1 className="text-2xl font-bold mb-4 text-center">Change Password</h1>

				<ToastContainer />

				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					<Form>
						<div className="mb-4">
							<label
								htmlFor="currentPassword"
								className="block mb-1 font-medium"
							>
								Current Password
							</label>
							<div className="relative">
								<Field
									type={showCurrentPassword ? "text" : "password"}
									id="currentPassword"
									name="currentPassword"
									className="border border-gray-300 rounded-md p-2 w-full"
								/>
								<FontAwesomeIcon
									icon={showCurrentPassword ? faEye : faEyeSlash}
									className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
									onClick={() => setShowCurrentPassword(!showCurrentPassword)}
								/>
							</div>
							<ErrorMessage
								name="currentPassword"
								component="div"
								className="text-red-500 text-sm"
							/>
						</div>

						<div className="mb-4">
							<label htmlFor="password" className="block mb-1 font-medium">
								New Password
							</label>
							<div className="relative">
								<Field
									type={showPassword ? "text" : "password"}
									id="password"
									name="password"
									className="border border-gray-300 rounded-md p-2 w-full"
								/>
								<FontAwesomeIcon
									icon={showPassword ? faEye : faEyeSlash}
									className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
									onClick={() => setShowPassword(!showPassword)}
								/>
							</div>
							<ErrorMessage
								name="password"
								component="div"
								className="text-red-500 text-sm"
							/>
						</div>

						<div className="mb-4">
							<label
								htmlFor="confirmPassword"
								className="block mb-1 font-medium"
							>
								Confirm New Password
							</label>
							<div className="relative">
								<Field
									type={showConfirmPassword ? "text" : "password"}
									id="confirmPassword"
									name="confirmPassword"
									className="border border-gray-300 rounded-md p-2 w-full"
								/>
								<FontAwesomeIcon
									icon={showConfirmPassword ? faEye : faEyeSlash}
									className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								/>
							</div>
							<ErrorMessage
								name="confirmPassword"
								component="div"
								className="text-red-500 text-sm"
							/>
						</div>

						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-4 py-2"
						>
							Change Password
						</button>
					</Form>
				</Formik>
			</div>
		</div>
	);
}
