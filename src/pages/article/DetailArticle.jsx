import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://minpro-blog.purwadhikabootcamp.com/api/blog";

function DetailArticle({ blogId, onClose }) {
	const [blog, setBlog] = useState(null);

	const fetchBlog = async () => {
		try {
			const response = await axios.get(`${API_URL}/${blogId}`);
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].id === blogId) {
                    setBlog(response.data[i]);
                }
			console.log(response.data);
            }
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchBlog();
	}, []);

	if (!blog) {
		return <p>Loading...</p>;
	}

	return (
		<div className="pt-[200px]">
			<h2 className="text-lg font-bold mb-2">{blog.title}</h2>
			<p>{blog.content}</p>
			<button onClick={onClose}>Back to List</button>
		</div>
	);
}

export default DetailArticle;
