import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBlogId } from "../../features/blogSlice";
import LikeButton from "../../components/article/LikeButton";
import Card from "../../components/article/Card";
const DetailArticle = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const blog = useSelector((state) => state.blogs.blogId);

	useEffect(() => {
		dispatch(fetchBlogId(id));
	}, [dispatch, id]);
	console.log(blog);
	return (
		<div className="flex flex-col min-h-screen justify-center items-center mx-auto w-full max-w-xl">
			<Card data={blog} />
		</div>
	);
};

export default DetailArticle;
