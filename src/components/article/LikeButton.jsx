import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const LikeButton = ({ data }) => {
	const [liked, setLiked] = useState(false);
	const [disliked, setDisliked] = useState(false);
	const isLoggedIn = localStorage.getItem("token") !== null;

	useEffect(() => {
		const fetchLikeStatus = async () => {
			try {
				const token = localStorage.getItem("token");

				const headers = {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				};

				const response = await axios.get(
					"https://minpro-blog.purwadhikabootcamp.com/api/blog/pagLike",
					{ headers }
				);

				const likedArticles = response.data.result;

				const isLiked = likedArticles.some(
					(likedArticle) => likedArticle.BlogId === data.id
				);

				setLiked(isLiked);
			} catch (error) {
				console.error("Error fetching liked articles", error);
			}
		};

		fetchLikeStatus();
		// console.log(fetchLikeStatus());
	}, [data.id]);

	const handleLike = async () => {
		try {
			const token = localStorage.getItem("token");

			const headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			};

			if (liked) {
				await axios.delete(
					`https://minpro-blog.purwadhikabootcamp.com/api/blog/unlike/$`,
					{ BlogId: data.id },
					{ headers }
				);
				setLiked(false);
				setDisliked(false);
			} else {
				await axios.post(
					"https://minpro-blog.purwadhikabootcamp.com/api/blog/like",
					{ BlogId: data.id },
					{ headers }
				);
				setLiked(true);
				setDisliked(false);
			}
		} catch (error) {
			console.error("Error toggling like/dislike", error.response.data);
		}
	};

	return (
		<div className="mt-auto px-4 py-4">
			{isLoggedIn && (
				<button
					className={`flex items-center gap-1 text-gray-500 hover:text-gray-700 focus:outline-none ${
						liked ? "text-red-500" : ""
					}`}
					onClick={handleLike}
				>
					<FontAwesomeIcon icon={faThumbsUp} size="2x" />
					<span>{liked ? "Liked" : "Like"}</span>
					<p>{data.total_fav}</p>
				</button>
			)}
		</div>
	);
};

export default LikeButton;
