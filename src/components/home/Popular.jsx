import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "../article/LikeButton";
const Popular = () => {
	const [popular, setPopular] = useState([]);
	const navigate = useNavigate();
	const fetchPopular = async () => {
		try {
			const { data } = await axios.get(
				"https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?page=1&orderBy=total_fav&sort=DESC"
			);
			setPopular(data.result);
			console.log(data.result);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchPopular();
	}, []);

	const handleClick = (id) => {
		navigate(`blog/${id}`);
		window.location.reload();
	};

	return (
		<div className="shadow-md rounded-xl p-3 sticky top-20">
			<h2 className="text-lg font-bold mb-2 text-center">Popular Blog</h2>
			{popular.map((blog) => (
				<div key={blog.id} className="flex max-w-md my-3 shadow-md rounded-md">
					<div>
						<img
							className="w-20 h-20 object-cover m-2 rounded-md"
							src={`https://minpro-blog.purwadhikabootcamp.com/${blog.imageURL}`}
							alt="article"
						/>
					</div>
					<div className="truncate px-4 py-2 w-full">
						<h2 className="truncate font-semibold">{blog.title}</h2>
						<p className="truncate">{blog.content}</p>
						<button
							className="text-blue-500 hover:underline"
							onClick={() => handleClick(blog.id)}
						>
							Read More
						</button>
					</div>
					<LikeButton data={blog} />
				</div>
			))}
		</div>
	);
};

export default Popular;
