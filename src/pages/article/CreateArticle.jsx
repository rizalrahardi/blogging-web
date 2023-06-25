import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const CreateArticleForm = () => {
	const [categories, setCategories] = useState([]);
	const [selectedFile, setSelectedFile] = useState(null);

	const initialValues = {
		title: "",
		content: "",
		videoURL: "",
		country: "",
		CategoryId: 0,
	};

	const validationSchema = Yup.object({
		title: Yup.string().required("Title is required"),
		content: Yup.string().required("Content is required"),
		videoURL: Yup.string().optional(),
		country: Yup.string().required("Country is required"),
		CategoryId: Yup.number().required(),
	});

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get(
					"https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory"
				);
				setCategories(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchCategories();
	}, []);

	const handleSubmit = async (values) => {
		try {
			const token = localStorage.getItem("token"); // Replace with your actual token

			const formData = new FormData();
			formData.append("title", values.title);
			formData.append("imageURL", selectedFile);
			formData.append("content", values.content);
			formData.append("videoURL", values.videoURL);
			formData.append("country", values.country);
			formData.append("CategoryId", values.CategoryId);

			const response = await axios.post(
				"https://minpro-blog.purwadhikabootcamp.com/api/blog",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`, // Include the token in the headers
					},
				}
			);
			console.log(response.data); // handle success
		} catch (error) {
			console.error(error.response); // handle error
		}
	};

	const handleFileDrop = (acceptedFiles) => {
		if (acceptedFiles.length > 0) {
			setSelectedFile(acceptedFiles[0]);
		}
	};

	const { getRootProps, getInputProps } = useDropzone({
		accept: "image/png, image/jpeg, image/jpg, image/svg+xml",
		maxSize: 2 * 1024 * 1024, // 2MB
		multiple: false,
		onDrop: handleFileDrop,
	});

	return (
		<div className="min-h-screen flex justify-center items-center">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				<Form className="relative top-28">
					<div className="mb-4">
						<label htmlFor="title" className="block text-gray-700">
							Title
						</label>
						<Field
							type="text"
							name="title"
							id="title"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
						/>
						<ErrorMessage
							name="title"
							component="div"
							className="text-red-500"
						/>
					</div>

					<div className="mb-4">
						<label htmlFor="imageURL" className="block text-gray-700">
							Image Upload (Max 2MB)
						</label>
						<div
							{...getRootProps({
								className:
									"dropzone w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500",
							})}
						>
							<input {...getInputProps()} />
							{selectedFile ? (
								<div>File Selected: {selectedFile.name}</div>
							) : (
								<div>
									Drag 'n' drop an image file here, or click to select a file
								</div>
							)}
						</div>
						<ErrorMessage
							name="imageURL"
							component="div"
							className="text-red-500"
						/>
					</div>

					<div className="mb-4">
						<label htmlFor="content" className="block text-gray-700">
							Content
						</label>
						<Field
							as="textarea"
							name="content"
							id="content"
							rows="5"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
						/>
						<ErrorMessage
							name="content"
							component="div"
							className="text-red-500"
						/>
					</div>

					<div className="mb-4">
						<label htmlFor="videoURL" className="block text-gray-700">
							Video URL
						</label>
						<Field
							type="text"
							name="videoURL"
							id="videoURL"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
						/>
						<ErrorMessage
							name="videoURL"
							component="div"
							className="text-red-500"
						/>
					</div>

					<div className="mb-4">
						<label htmlFor="CategoryId" className="block text-gray-700">
							Category ID
						</label>
						<Field
							as="select"
							name="CategoryId"
							id="CategoryId"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
						>
							<option value="">Select a category</option>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</Field>
						<ErrorMessage
							name="CategoryId"
							component="div"
							className="text-red-500"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="country" className="block text-gray-700">
							Country
						</label>
						<Field
							type="text"
							name="country"
							id="country"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
						/>
						<ErrorMessage
							name="country"
							component="div"
							className="text-red-500"
						/>
					</div>

					<div className="mt-6">
						<button
							type="submit"
							className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
						>
							Create Article
						</button>
					</div>
				</Form>
			</Formik>
		</div>
	);
};

export default CreateArticleForm;
