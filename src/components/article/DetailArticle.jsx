import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBlogId } from "../../features/blogSlice";
import LikeButton from "./LikeButton";
const DetailArticle = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const blog = useSelector((state) => state.blogs.blogId);

	useEffect(() => {
		dispatch(fetchBlogId(id));
	}, [dispatch, id]);
	console.log(blog);
	return (
		<div className="flex flex-col min-h-screen justify-center items-center mx-auto w-full max-w-5xl">
			<div className="shadow-md p-10 rounded-2xl">
				<img
					className="rounded-3xl mb-5 w-full"
					src={`https://minpro-blog.purwadhikabootcamp.com/${blog.imageURL}`}
					alt="article"
				/>
				<h2 className="text-3xl font-semibold mb-5">{blog.title}</h2>
				<p>{blog.content}</p>
				<LikeButton data={blog} />
			</div>
		</div>
	);
};

export default DetailArticle;
