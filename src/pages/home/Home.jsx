/* eslint-disable react/prop-types */
import Carousel from "../../components/Carousel";
import Popular from "../../components/Popular";
import BlogList from "../../components/article/BlogList";
const Home = () => {
	return (
		<div className="pt-[100px] max-w-7xl container mx-auto">
			<Carousel />
			<div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
				<div className="col-span-3">
					<BlogList />
				</div>
				<div>
					<Popular />
				</div>
			</div>
		</div>
	);
};

export default Home;
