import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
const ChangePassword = () => {
	const initialValues = {
		currentPassword: "",
		password: "",
		confirmPassword: "",
	};

	const validationSchema = Yup.object({
		currentPassword: Yup.string().required("Required"),
		password: Yup.string()
			.min(8, "Password must be at least 8 characters")
			.required("Required"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), null], "Passwords must match")
			.required("Required"),
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);

	const handleSubmit = async (values) => {
		const token = localStorage.getItem("token"); // Ambil token dari URL terakhir

		try {
			const response = await axios.patch(
				"https://minpro-blog.purwadhikabootcamp.com/api/auth/changePass",
				values,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			toast.success(response.data.message, { autoClose: 2000 });
			localStorage.removeItem("token");
			window.location.href = "/";
			console.log(response.data);
		} catch (error) {
			console.error(error.response.data.err);
			toast.error(error.response.data.err, { autoClose: 2000 });
		}
	};

	return (
		<div className="max-w-sm mx-auto">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				<Form>
					<div className="mb-4">
						<label htmlFor="currentPassword" className="block mb-1 font-medium">
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
						<label htmlFor="confirmPassword" className="block mb-1 font-medium">
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
	);
};

export default ChangePassword;
