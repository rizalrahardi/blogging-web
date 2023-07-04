/* eslint-disable react/prop-types */
import Slider from "react-slick";
import { useEffect } from "react";
import Card from "./article/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "../features/blogSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function SampleNextArrow(props) {
	const { onClick } = props;
	return (
		<button
			className="absolute right-0 top-1/2 w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white focus:outline-none"
			onClick={onClick}
		>
			<FontAwesomeIcon icon={faChevronRight} />
		</button>
	);
}

function SamplePrevArrow(props) {
	const { onClick } = props;
	return (
		<button
			className="absolute left-0 top-1/2 w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white focus:outline-none z-10"
			onClick={onClick}
		>
			<FontAwesomeIcon icon={faChevronLeft} />
		</button>
	);
}

const Carousel = ({ data }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const blogs = useSelector((state) => state.blogs.blogs);

	useEffect(() => {
		dispatch(fetchBlogs());
	});

	const settings = {
		dots: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnHover: true,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		adaptiveHeight: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	const handleClick = (blogId) => {
		navigate(`/blog/${blogId}`);
	};

	return (
		<div className="mb-16">
			<Slider {...settings}>
				{blogs.map((blog) => {
					return (
						<Card
							key={blog.id}
							data={blog}
							onClick={() => handleClick(blog.id)}
						/>
					);
				})}
			</Slider>
		</div>
	);
};

export default Carousel;
