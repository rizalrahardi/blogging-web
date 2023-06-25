import axios from "axios";
import { useEffect, useState } from "react";

const Category = () => {
	const [category, setCategory] = useState([]);

	const fetchCategory = async () => {
		try {
			const { data } = await axios.get(
				"https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory"
			);
			setCategory(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchCategory();
	}, []);
	return (
		<div className="flex justify-center items-center flex-wrap">
			<div className="mx-5 mb-3">
				<button className="py-1 px-6 text-white bg-purple-400 rounded-full hover:bg-purple-600 active:bg-purple-600">
					all
				</button>
			</div>
			{category.map((item) => (
				<div className="mx-5 mb-3" key={item.id}>
					<button className="py-1 px-6 text-white bg-purple-400 rounded-full hover:bg-purple-600 active:bg-purple-600">
						{item.name}
					</button>
				</div>
			))}
		</div>
	);
};

export default Category;
