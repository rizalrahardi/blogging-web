import { useEffect } from "react";
// import BlogCard from "./BlogCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../features/blogSlice";
import Card from "./Card";
const BlogList = ({ data }) => {
	const dispatch = useDispatch();
	const blogs = useSelector((state) => state.blogs);

	useEffect(() => {
		dispatch(fetchBlogs());
	}, [dispatch]);

	return (
		<div className="container mx-auto py-8">
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
				{blogs.map((blog) => (
					<Card key={blog.id} data={blog} />
				))}
			</div>
		</div>
	);
};

export default BlogList;
