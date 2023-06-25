/* eslint-disable react/prop-types */
import Carousel from "../../components/Carousel";
// import ArticleArea from "../../components/ArticleArea";
import BlogList from "../../components/BlogList";
import Category from "../../components/Category";
import UserComponent from "../../components/User";
import TryPagination from "../../components/TryPagination";
import App from "../../components/CobaDetailArt";

const Home = ({ data }) => {
	return (
		<div>
			<div className="max-w-7xl mx-auto px-6 mt-16 sm:mt-16 sm:py-8 sm:px-10 ">
				{/* <Carousel data={data} /> */}
				<UserComponent />
				{/* <ArticleArea data={data} /> */}
				<Category />
				{/* <BlogList /> */}
				<TryPagination />
				{/* <App /> */}
			</div>
		</div>
	);
};

export default Home;
