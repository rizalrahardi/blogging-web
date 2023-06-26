import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import DetailArticle from "../pages/article/DetailArticle";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectBlogs } from "../features/blogSlice";

const API_URL = "https://minpro-blog.purwadhikabootcamp.com/api/blog";

function TryPagination() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const blogs = useSelector(selectBlogs);
	const [blogs, setBlogs] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [selectedBlogId, setSelectedBlogId] = useState(null);
	useEffect(() => {
		fetchBlogs();
	}, [currentPage]);

	const fetchBlogs = async () => {
		try {
			const response = await axios.get(`${API_URL}?page=${currentPage}`);
			setBlogs(response.data.result);
			setTotalPages(Math.ceil(response.data.rows / response.data.listLimit));
		} catch (error) {
			console.log(error);
		}
	};

	const handleClick = (blogId) => {
		fetchBlogs(blogId);
		navigate(`/blog/${blogId}`);
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	// const handleCardClick = (blogId) => {
	// 	setSelectedBlogId(blogId);
	// };

	// const handleBackToList = () => {
	// 	setSelectedBlogId(null);
	// };

	const renderPageNumbers = () => {
		const maxPageNumbers = 3;
		const pageNumbers = [];
		let startPage = Math.max(currentPage - Math.floor(maxPageNumbers / 2), 1);
		let endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);

		if (totalPages <= maxPageNumbers) {
			startPage = 1;
			endPage = totalPages;
		} else if (currentPage <= Math.floor(maxPageNumbers / 2)) {
			startPage = 1;
			endPage = maxPageNumbers;
		} else if (currentPage >= totalPages - Math.floor(maxPageNumbers / 2)) {
			startPage = totalPages - maxPageNumbers + 1;
			endPage = totalPages;
		}

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(
				<button
					key={i}
					className={`mx-1 px-2 py-1 rounded ${
						i === currentPage
							? "bg-blue-500 text-white"
							: "bg-gray-200 text-gray-700"
					}`}
					onClick={() => handlePageChange(i)}
				>
					{i}
				</button>
			);
		}

		return pageNumbers;
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Blog Posts</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{blogs && blogs.length > 0 ? (
					blogs.map((blog) => (
						<Card
							key={blog.id}
							data={blog}
							onClick={() => handleClick(blog.id)}
						/>
					))
				) : (
					<p>No blogs found.</p>
				)}
			</div>

			<div className="flex justify-center mt-4">
				<button
					className={`mx-1 px-2 py-1 rounded ${
						currentPage === 1
							? "bg-gray-200 text-gray-700"
							: "bg-blue-500 text-white"
					}`}
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					Previous
				</button>
				{renderPageNumbers()}
				<button
					className={`mx-1 px-2 py-1 rounded ${
						currentPage === totalPages
							? "bg-gray-200 text-gray-700"
							: "bg-blue-500 text-white"
					}`}
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					Next
				</button>
			</div>
		</div>
	);
}

export default TryPagination;
