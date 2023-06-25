import React, { useState, useEffect } from "react";
import axios from "axios";
const App = () => {
	const [blogData, setBlogData] = useState(null);

	useEffect(() => {
		const fetchBlogData = async () => {
			try {
				const { data } = await axios.get(
					"https://minpro-blog.purwadhikabootcamp.com/api/blog/497"
				);

				setBlogData(data[0]);
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchBlogData();
	}, []);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Blog Post</h1>
			{blogData ? (
				<div>
					<h2 className="text-xl font-bold mb-2">{blogData.title}</h2>
					<p>{blogData.content}</p>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default App;
