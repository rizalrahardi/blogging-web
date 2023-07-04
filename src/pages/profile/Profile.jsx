import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
	const [profileData, setProfileData] = useState({});

	const navigate = useNavigate();

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				const token = localStorage.getItem("token");

				const headers = {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				};

				const response = await axios.get(
					"https://minpro-blog.purwadhikabootcamp.com/api/auth/",
					{ headers }
				);

				setProfileData(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchProfileData();
	}, []);

	const initialValues = {
		username: profileData.username || "",
		email: profileData.email || "",
		phoneNumber: profileData.phone || "",
		file: null,
	};

	const validationSchema = Yup.object().shape({
		username: Yup.string(),
		email: Yup.string().email("Invalid email"),
		phone: Yup.string().matches(/^\d{10,12}$/, "Invalid phone number"),
		file: Yup.mixed()
			.test("fileType", "Only image files are allowed", (value) => {
				if (!value) return true;
				return (
					value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
				);
			})
			.nullable(),
	});

	const handleSubmit = async (values) => {
		try {
			const token = localStorage.getItem("token");

			const headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			};

			if (values.file) {
				const formData = new FormData();
				formData.append("file", values.file);

				const headers = {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				};

				await axios.post(
					"https://minpro-blog.purwadhikabootcamp.com/api/profile/single-uploaded",
					formData,
					{ headers }
				);

				toast.success("Foto berhasil diubah", {
					autoClose: 1500,
				});
				setTimeout(() => {
					window.location.reload();
				}, 1500);
			}

			if (values.username && values.username !== "") {
				const response = await axios.patch(
					"https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername",
					{
						currentUsername: profileData.username,
						newUsername: values.username,
					},
					{ headers }
				);

				toast.success(response.data.message);

				setTimeout(() => {
					localStorage.removeItem("token");
					localStorage.removeItem("id");
					navigate("/login");
				}, 1500);
			}

			if (values.email && values.email !== "") {
				const response = await axios.patch(
					"https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail",
					{
						currentEmail: profileData.email,
						newEmail: values.email,
					},
					{ headers }
				);

				toast.success(response.data.message);

				setTimeout(() => {
					localStorage.removeItem("token");
					localStorage.removeItem("id");
					navigate("/login");
				}, 1500);
			}

			if (values.phone && values.phone !== "") {
				const response = await axios.patch(
					"https://minpro-blog.purwadhikabootcamp.com/api/auth/changePhone",
					{
						currentPhone: profileData.phone,
						newPhone: values.phone,
					},
					{ headers }
				);

				console.log(response.data.message);
				toast.success(response.data.message);

				setTimeout(() => {
					localStorage.removeItem("token");
					localStorage.removeItem("id");
					window.location.href = "/";
				}, 2000);
			}
		} catch (error) {
			if (error.response) {
				const { data } = error.response;
				toast.error(data);
			}
		}
	};

	return (
		<div className="max-w-lg flex flex-col justify-center items-center min-h-screen mx-auto">
			<div className="shadow-md rounded-lg p-20">
				<h1 className="text-2xl font-bold mb-4 text-center">Your Profile</h1>

				<ToastContainer />

				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ values, setFieldValue }) => (
						<Form>
							<div className="mb-4 text-center">
								{profileData?.imgProfile ? (
									<img
										className="mx-auto object-cover rounded-full"
										src={`https://minpro-blog.purwadhikabootcamp.com/${profileData?.imgProfile}`}
										alt="profile"
									/>
								) : (
									<FontAwesomeIcon
										icon={faUser}
										className="text-blue-400 hover:text-blue-500 hover:cursor-pointer mt-4 border-4 border-blue-500 border-double rounded-full p-10"
									/>
								)}

								<input
									type="file"
									id="file"
									name="file"
									accept="image/jpeg, image/png, image/gif"
									onChange={(event) => {
										setFieldValue("file", event.currentTarget.files[0]);
									}}
									className="mt-5 relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
								/>
								<ErrorMessage
									name="file"
									component="p"
									className="text-red-500 text-xs italic"
								/>
							</div>

							<div className="mb-4">
								<label htmlFor="username" className="block font-semibold mb-2">
									Username
								</label>
								<Field
									type="text"
									id="username"
									name="username"
									className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
									placeholder={profileData.username}
								/>
								<ErrorMessage
									name="username"
									component="div"
									className="text-red-500 mt-2"
								/>
							</div>

							<div className="mb-4">
								<label htmlFor="email" className="block font-semibold mb-2">
									Email
								</label>
								<Field
									type="email"
									id="email"
									name="email"
									className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
									placeholder={profileData.email}
								/>
								<ErrorMessage
									name="email"
									component="div"
									className="text-red-500 mt-2"
								/>
							</div>

							<div className="mb-4">
								<label htmlFor="phone" className="block font-semibold mb-2">
									Phone Number
								</label>
								<Field
									type="text"
									id="phone"
									name="phone"
									className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
									placeholder={profileData.phone}
								/>
								<ErrorMessage
									name="phone"
									component="div"
									className="text-red-500 mt-2"
								/>
							</div>

							<button
								type="submit"
								className={`bg-blue-500 text-white w-full py-2 mt-4 rounded-md mb-5 hover:bg-blue-600 ${
									!values.username &&
									!values.email &&
									!values.phone &&
									!values.file
										? "opacity-50 cursor-not-allowed"
										: ""
								}`}
								disabled={
									!values.username &&
									!values.email &&
									!values.phone &&
									!values.file
								}
							>
								Change Profile
							</button>
							<button
								onClick={() => navigate("/change-password")}
								className=" text-blue-500 py-2 w-full border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white"
							>
								Change Password
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Profile;
