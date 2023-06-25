/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Carousel = ({ data }) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () => {
		setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide === 0 ? data.length - 1 : prevSlide - 1
		);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
		}, 3000);

		return () => clearInterval(interval);
	}, [data.length]);

	return (
		<div className="relative">
			<div className="flex justify-center items-center">
				<button
					type="button"
					// className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-500 text-white focus:outline-none"
					onClick={prevSlide}
				>
					<FontAwesomeIcon icon={faChevronLeft} />
				</button>

				<button
					type="button"
					// className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-500 text-white focus:outline-none"
					onClick={nextSlide}
				>
					<FontAwesomeIcon icon={faChevronRight} />
				</button>
			</div>
			<div
				className="flex w-full h-full"
				onClick={nextSlide} // Added onClick event to change slides when clicking the slides area
			>
				{data.map((data, index) => (
					<div
						key={index}
						className={`w-full h-full transition-opacity duration-1000 ease-in-out ${
							index === currentSlide ? "opacity-100" : "opacity-0 absolute"
						}`}
					>
						<div className="flex justify-center items-center w-full h-full">
							<img
								src={data.url}
								alt={`Slide ${index}`}
								className="object-cover w-full h-full"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const Coba = ({ data }) => {
	return (
		<div className="flex justify-center items-center h-screen">
			<Carousel data={data} />
		</div>
	);
};

export default Coba;
