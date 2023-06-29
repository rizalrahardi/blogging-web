import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DeleteButton = ({ blogId }) => {
	// const { blogId } = useParams();
	const removeBlog = async () => {
		try {
			const token = localStorage.getItem("token");

			const headers = {
				Authorization: `Bearer ${token}`,
			};

			await axios.patch(
				`https://minpro-blog.purwadhikabootcamp.com/api/blog/remove/${blogId}`,
				{},
				{ headers }
			);

			setTimeout(() => {
				window.location.href = "/my-article";
			}, 2000);

			console.log(`Blog with id ${blogId} removed successfully`);
		} catch (error) {
			console.error("Error removing blog", error);
		}
	};

	return (
		<div>
			<button
				className="bg-red-500 text-white font-bold py-2 px-4 rounded"
				onClick={() => removeBlog()}
			>
				Remove
			</button>
		</div>
	);
};

export default DeleteButton;
