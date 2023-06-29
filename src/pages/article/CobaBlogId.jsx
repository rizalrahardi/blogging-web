// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
// 	fetchBlogId,
// 	selectSelectedBlog,
// 	setSelectedBlog,
// } from "../../features/blogSlice";
// import { useParams } from "react-router-dom";

// const CobaBlogId = () => {
// 	const dispatch = useDispatch();
// 	const { blogId } = useParams();
// 	const selectedBlog = useSelector(selectSelectedBlog);
// 	const [loading, setLoading] = useState(true);

// 	useEffect(() => {
// 		const storedSelectedBlog = localStorage.getItem("selectedBlog");

// 		if (storedSelectedBlog) {
// 			dispatch(setSelectedBlog(JSON.parse(storedSelectedBlog)));
// 			setLoading(false);
// 		} else {
// 			setLoading(true);
// 			dispatch(fetchBlogId(blogId))
// 				.then((response) => {
// 					dispatch(setSelectedBlog(response.payload));
// 					setLoading(false);
// 				})
// 				.catch((error) => {
// 					console.log("Error fetching blog data:", error);
// 					setLoading(false);
// 				});
// 		}
// 	}, [dispatch, blogId]);

// 	useEffect(() => {
// 		if (selectedBlog) {
// 			console.log("Selected blog:", selectedBlog);
// 			// localStorage.setItem("selectedBlog", JSON.stringify(selectedBlog));
// 		}
// 	}, [selectedBlog]);

// 	if (loading) {
// 		return <p>Loading...</p>;
// 	}

// 	if (!selectedBlog) {
// 		return <p>No blog found.</p>;
// 	}

// 	const imageUrl = new URL(
// 		selectedBlog.image,
// 		"https://minpro-blog.purwadhikabootcamp.com"
// 	).href;

// 	return (
// 		<div className="pt-[200px]">
// 			<div>
// 				<p>ini pake id</p>
// 				<p>{selectedBlog.id}</p>
// 				<img src={imageUrl} alt="article" />
// 				<p>{selectedBlog.title}</p>
// 				<p>{selectedBlog.content}</p>
// 			</div>
// 		</div>
// 	);
// };

// export default CobaBlogId;
