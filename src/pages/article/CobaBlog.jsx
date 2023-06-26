import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, selectBlogs, fetchBlogId } from "../../features/blogSlice";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/Card";
const Blog = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const blogs = useSelector(selectBlogs);

	const handleClick = (blogId) => {
		dispatch(fetchBlogId(blogId));
		navigate(`/blog/${blogId}`);
	};

	useEffect(() => {
		dispatch(fetchBlogs());
	}, [dispatch]);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
			{/* <div key={blog.id}>
					<p>{blog.id}</p>
					<p>{blog.title}</p>
					<p>{blog.content}</p>
					<button onClick={() => handleClick(blog.id)}>
						read more
					</button>
				</div> */}
			{blogs.map((blog) => (
				<Card key={blog.id} data={blog} onClick={() => handleClick(blog.id)} />
			))}
		</div>
	);
};

export default Blog;
